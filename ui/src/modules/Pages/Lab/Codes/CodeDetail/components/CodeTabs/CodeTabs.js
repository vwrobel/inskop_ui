import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { StyleSheet, css } from 'aphrodite';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CodeTabContent from './CodeTabContent';
import CodeMirror from './components/CodeMirror';
import CodeReadMe from './components/CodeReadMe';
import { codeBarHeight } from '../CodeBar';
import { codeDetailReset, codeDetailReadMeInput, codeDetailCodeInput } from '../../CodeDetailActions';

const tabBarHeight = 48;

class CodeTabs extends Component {
  componentDidMount() {
    const { code, dispatch } = this.props;
    dispatch(codeDetailReadMeInput(code.readMe));
    dispatch(codeDetailCodeInput(code.code));
  }
  render() {
    const { code, containerHeight, editCode, dispatch } = this.props;
    const tabContentHeight = containerHeight - (codeBarHeight + tabBarHeight);
    return (
      <Tabs
        onChange={() => {
          dispatch(codeDetailReset());
          dispatch(codeDetailReadMeInput(code.readMe));
          dispatch(codeDetailCodeInput(code.code));
        }}
      >
        <Tab label='Read Me' >
          <CodeTabContent tabContentHeight={tabContentHeight}>
            <CodeReadMe
              code={code}
              editCode={editCode}
            />
          </CodeTabContent>
        </Tab>
        <Tab label='Code' >
          <CodeTabContent tabContentHeight={tabContentHeight}>
            <CodeMirror
              code={code}
              tabContentHeight={tabContentHeight}
              editCode={editCode}
            />
          </CodeTabContent>
        </Tab>
      </Tabs>
    );
  }
}

CodeTabs.propTypes = {
  code: PropTypes.object,
  containerHeight: PropTypes.number,
  editCode: PropTypes.func,
  dispatch: PropTypes.func
};

const EditCodeMutation = gql `
mutation EditCode($codeId: String!, $codeChunk: String, $readMe: String) {
  editCode(codeId: $codeId, codeChunk: $codeChunk, readMe: $readMe) {
    ok
    code {
      id
      code
      readMe
    }
  }
}`;

const CodeTabsWithData = compose(
  graphql(EditCodeMutation, {
    props: ({ mutate }) => ({
      editCode: (codeId, codeChunk, readMe) =>
        mutate({ variables: { codeId, codeChunk, readMe } })
    })
  })
)(CodeTabs);

export default CodeTabsWithData;
