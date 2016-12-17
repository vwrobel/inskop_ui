import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import TagForm from './components/TagForm';
import SelectionForm from './components/SelectionForm';
import WindowForm from './components/WindowForm';
import ClearAnalysis from './components/ClearAnalysis';
import { sketchpadDisplay, windowSetMode, selectionNameInputSet, tagNameInputSet } from '../../../../../ToolsActions';


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

class Select extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(windowSetMode('add'));
    dispatch(sketchpadDisplay(true));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(sketchpadDisplay(false));
  }

  submitForm() {
    const {
      dispatch,
      scene,
      analysis,
      tags,
      selectedTag,
      tagInput,
      addTag,
      selections,
      selectedSelection,
      selectionInput,
      addSelection,
      addWindow,
      sketchpadItems,
      currentTime
    } = this.props;

    const currentTagName = (tags && selectedTag !== null) ? tags[selectedTag].name : '';
    const tagName = tagInput || currentTagName;
    const currentSelectionName = (selections && selectedSelection !== null) ?
      selections[selectedSelection].name : '';
    const selectionName = selectionInput || currentSelectionName;
    const t = Math.round(currentTime * scene.frameCount);
    const sketchpadItem = sketchpadItems[sketchpadItems.length - 1];
    sketchpadItem.strokeWidth = 3;
    sketchpadItem.dash = null;
    sketchpadItem.added = true;
    const jsonItem = JSON.stringify(sketchpadItem);
    addTag(tagName).then(() =>
      addSelection(analysis.id, selectionName, tagName).then((res) => {
        addWindow(res.data.addSelection.selection.id, 1, t, jsonItem).then(() => {
          dispatch(tagNameInputSet(''));
          dispatch(selectionNameInputSet(''));
        });
      }));
  }
  render() {
    const {
      dispatch,
      tags,
      analysis,
      clearAnalysis,
      scene,
      selections,
      tagInput,
      selectedTag,
      selectedSelection,
      selectionInput,
      mode,
      windowColor
    } = this.props;
    return (
      <div className={css(styles.container)}>
        <Formsy.Form
          onValid={() => {}}
          onInvalid={() => {}}
          onValidSubmit={() => {}}
          onInvalidSubmit={() => {}}
        >
          <WindowForm
            windowColor={windowColor}
            dispatch={dispatch}
            mode={mode}
          />
          <TagForm
            dispatch={dispatch}
            tags={tags}
            tagInput={tagInput}
            selectedTag={selectedTag}
          />
          <SelectionForm
            dispatch={dispatch}
            analysis={analysis}
            scene={scene}
            selections={selections}
            selectionInput={selectionInput}
            selectedSelection={selectedSelection}
          />
          <RaisedButton
            type='submit'
            label='add'
            disabled={false}  //  {!this.state.canSubmit}
            onClick={() => this.submitForm()}
          />
        </Formsy.Form>
        <div style={{ marginTop: 20}} >
          <ClearAnalysis onClear={() => clearAnalysis(analysis.id)} />
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  scene: PropTypes.object,
  tags: PropTypes.array,
  analysis: PropTypes.object,
  selections: PropTypes.array,
  addTag: PropTypes.func,
  addSelection: PropTypes.func,
  addWindow: PropTypes.func,
  clearAnalysis: PropTypes.func,
  dispatch: PropTypes.func,
  tagInput: PropTypes.string,
  selectedTag: PropTypes.number,
  selectionInput: PropTypes.string,
  selectedSelection: PropTypes.number,
  windowColor: PropTypes.string,
  sketchpadItems: PropTypes.array,
  mode: PropTypes.string,
  currentTime: PropTypes.number
};


const AddTagMutation = gql`
mutation AddTag($tagName: String!){
  addTag(tagName: $tagName, tagCategory: "main", tagTarget: "selection") {
    tag {
      id
      name
    }
    ok
    exists
  }
}`;

const AddSelectionMutation = gql`
mutation AddSelection($analysisId: ID!, $name: String!, $mainTag: String!){
  addSelection(analysisId: $analysisId, name: $name, mainTag: $mainTag) {
    selection {
      id
      name
      tags {
        edges {
          node {
            name
            category {
              name
            }
          }
        }
      }
    }
    ok
  }
}`;

const AddWindowMutation = gql`
mutation AddWindow($selectionId: ID!, $cameraNumber: Int!, $t: Float!, $jsonItem: String!){
  addWindow(selectionId: $selectionId, cameraNumber: $cameraNumber, t: $t, jsonItem: $jsonItem) {
    window {
        id
        selection {
          name
          tags {
            edges {
              node {
                name
                category {
                  name
                }
              }
            }
          }
        }
        t
        type {
          name
        }
        jsonItem
    }
    ok
  }
}`;


const ClearAnalysisMutation = gql`
mutation ClearAnalysis($analysisId: ID!){
  clearAnalysis(analysisId: $analysisId) {
    analysis {
      id
      name
      description
    }
    ok
  }
}`;


const mapStateToProps = (state) => ({
  tagInput: state.scene.detail.tools.tagInput,
  selectedTag: state.scene.detail.tools.tagSelected,
  selectionInput: state.scene.detail.tools.selectionInput,
  selectedSelection: state.scene.detail.tools.selectionSelected,
  windowColor: state.scene.detail.tools.windowColor,
  sketchpadItems: state.scene.detail.tools.sketchpadItems,
  mode: state.scene.detail.tools.windowMode,
  currentTime: state.scene.detail.analysis.videoCurrentTime
});

const SelectWithState = connect(mapStateToProps)(Select);

const SelectWithStateAndData = compose(
  graphql(AddTagMutation, {
    props: ({ mutate }) => ({
      addTag: (tagName) => mutate({
        variables: { tagName },
        updateQueries: {
          SelectionQuery: (prev, { mutationResult }) => {
            const isNewTag = !mutationResult.data.addTag.exists;
            const newTag = mutationResult.data.addTag.tag;
            return isNewTag ? update(prev, {
              allTags: {
                edges: {
                  $unshift: [{
                    __typename: "TagNodeEdge",
                    node: newTag
                  }]
                }
              }
            }) : prev;
          }
        }
      })
    })
  }),
  graphql(AddSelectionMutation, {
    props: ({ mutate }) => ({
      addSelection: (analysisId, name, mainTag) =>
        mutate({
          variables: { analysisId, name, mainTag },
          updateQueries: {
            SelectionQuery: (prev, { mutationResult }) => {
              const newSelection = mutationResult.data.addSelection.selection;
              return update(prev, {
                allSelections: {
                  edges: {
                    $unshift: [{
                      __typename: "SelectionNodeEdge",
                      node: newSelection
                    }]
                  }
                }
              });
            }
          }
        })
    })
  }),
  graphql(AddWindowMutation, {
    props: ({ mutate }) => ({
      addWindow: (selectionId, cameraNumber, t, jsonItem) =>
        mutate({
          variables: { selectionId, cameraNumber, t, jsonItem },
          updateQueries: {
            SelectionQuery: (prev, { mutationResult }) => {
              const newWindow = mutationResult.data.addWindow.window;
              return update(prev, {
                allWindows: {
                  edges: {
                    $unshift: [{
                      __typename: "WindowNodeEdge",
                      node: newWindow
                    }]
                  }
                }
              });
            }
          }
        })
    })
  }),
  graphql(ClearAnalysisMutation, {
    props: ({ mutate }) => ({
      clearAnalysis: (analysisId) =>
        mutate({
          variables: { analysisId },
          updateQueries: {
            SelectionQuery: (prev, { mutationResult }) => update(prev, {
              allSelections: {
                edges: {
                  $set: []
                }
              },
              allWindows: {
                edges: {
                  $set: []
                }
              }
            })
          }
        })
    })
  })
)(SelectWithState);


export default SelectWithStateAndData;
