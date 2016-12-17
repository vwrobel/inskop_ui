import React, { PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import { inskopLighter } from '../../../../../../../../../../styles/MuiTheme';
import Select from './components/Select/Select';
import Table from './components/Table';
import Comment from './components/Comment';
import ViewAnalysis from './components/ViewAnalysis/ViewAnalysis';

const subToolBarStyles = {
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    width: 350,
    top: 0,
    bottom: 0,
    backgroundColor: inskopLighter
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

const SubToolBar = (props) => {
  const {
    children,
    toolBarDocked,
    toolBarSelection,
    scene,
    tags,
    analysis,
    selections,
    windows,
    video,
    availableFilters,
    availableTrackers
  } = props;
  let subToolBarContent = <div />;
  let subToolBarLargeStyle = {};
  switch (toolBarSelection) {
    case 'view-analysis':
      subToolBarLargeStyle = { sidebar: { width : 450 } };
      subToolBarContent = (
        <ViewAnalysis
          analysis={analysis}
          scene={scene}
          video={video}
        />);
      break;
    case 'comment':
      subToolBarLargeStyle = { sidebar: { width : 550 } };
      subToolBarContent = analysis ? (
        <Comment scene={scene} analysis={analysis} />) : <div />;
    break;
    case 'select':
      subToolBarContent = analysis ? (
        <Select
          scene={scene}
          tags={tags}
          analysis={analysis}
          selections={selections}
          windows={windows}
        />) : <div />;
      break;
    case 'table':
      subToolBarContent = analysis ? (
        <Table scene={scene} analysis={analysis} />) : <div />;
      break;
    default:
      subToolBarContent = (
        <div style={{ padding: 20 }}>
          Select an analysis or create one.
        </div>);
  }
  return (
    <Sidebar
      sidebar={subToolBarContent}
      docked={toolBarDocked}
      styles={{...subToolBarStyles, ...subToolBarLargeStyle}}
      pullRight
    >
      {children}
    </Sidebar>
  );
};

SubToolBar.propTypes = {
  toolBarSelection: PropTypes.string,
  toolBarDocked: PropTypes.bool,
  children: PropTypes.object,
  scene: PropTypes.object,
  tags: PropTypes.array,
  analysis: PropTypes.object,
  selections: PropTypes.array,
  windows: PropTypes.array,
  video: PropTypes.object,
  availableFilters: PropTypes.array,
  availableTrackers: PropTypes.array
};

export default SubToolBar;
