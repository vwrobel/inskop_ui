import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sideBarDock } from '../../../../Navigation/components/SideBar/SideBarActions';
import { analysisFullReset, analysisSelect } from './components/Analysis/AnalysisActions';
import { toolBarDock, toolBarSelect, toolsResetState } from './components/Tools/ToolsActions';
import SceneDetailContainer from './components/SceneDetailContainer';


class SceneDetail extends Component {

  componentWillMount() {
    this.props.sideBarDock(false);
    this.props.toolBarDock(true);
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.toolBarSelect(params.toolSlug || null);
    this.props.analysisSelect(params.analysisSlug || null);
  }

  componentDidUpdate() {
    const { params } = this.props;
    this.props.toolBarSelect(params.toolSlug || null);
    this.props.analysisSelect(params.analysisSlug || null);
  }

  componentWillUnmount() {
    this.props.sideBarDock(true);
    this.props.toolBarDock(false);
    this.props.toolsResetState();
    this.props.analysisFullReset();
  }

  render() {
    const { params } = this.props;
    return (
      <SceneDetailContainer
        sceneSlug={params.sceneSlug}
        analysisSlug={params.analysisSlug}
        toolSlug={params.toolSlug}
      />
    );
  }
}

SceneDetail.propTypes = {
  sideBarDock: PropTypes.func,
  toolBarDock: PropTypes.func,
  toolsResetState: PropTypes.func,
  analysisFullReset: PropTypes.func,
  params: PropTypes.object,
  toolBarSelect: PropTypes.func,
  analysisSelect: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sideBarDock,
  toolBarDock,
  toolsResetState,
  analysisFullReset,
  toolBarSelect,
  analysisSelect
}, dispatch);

const SceneDetailWithState = connect(mapStateToProps, mapDispatchToProps)(SceneDetail);

export default SceneDetailWithState;
