import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import ToolBarContent from './components/ToolBarContent';
import { scopethisLighter } from '../../../../../../../../styles/MuiTheme';
import SubToolBar from './components/SubToolBar/SubToolBar';

const toolBarStyles = {
  sidebar: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    bottom: 0,
    willChange: 'transform',
    overflowY: 'visible',
    overflowX: 'visible',
    paddingTop: 20,
    width: 55,
    minWidth: 55,
    backgroundColor: scopethisLighter
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

const ToolBar = (props) => {
  const {
    toolBarDocked,
    toolBarSelection,
    children,
    scene,
    dispatch,
    tags,
    analysis,
    selections,
    windows,
    availableFilters,
    availableTrackers
  } = props;
  const toolBarContent = (<ToolBarContent
    scene={scene}
    analysis={analysis}
    toolBarSelection={toolBarSelection}
    dispatch={dispatch}
  />);
  return (
    <Sidebar
      sidebar={toolBarContent}
      docked={toolBarDocked}
      sidebarClassName={''}
      styles={toolBarStyles}
      pullRight
    >
      <SubToolBar
        toolBarDocked={toolBarDocked}
        toolBarSelection={toolBarSelection}
        scene={scene}
        tags={tags}
        analysis={analysis}
        selections={selections}
        windows={windows}
        availableFilters={availableFilters}
        availableTrackers={availableTrackers}
      >
        {children}
      </SubToolBar>
    </Sidebar>
  );
};

ToolBar.propTypes = {
  toolBarSelection: PropTypes.string,
  toolBarDocked: PropTypes.bool,
  children: PropTypes.object,
  scene: PropTypes.object,
  dispatch: PropTypes.func,
  tags: PropTypes.array,
  analysis: PropTypes.object,
  selections: PropTypes.array,
  windows: PropTypes.array,
  availableFilters: PropTypes.array,
  availableTrackers: PropTypes.array
};

const mapStateToProps = (state) => ({
  toolBarDocked: state.scene.detail.tools.toolBarDocked,
  toolBarSelection: state.scene.detail.tools.toolBarSelection
});


export default connect(mapStateToProps)(ToolBar);
