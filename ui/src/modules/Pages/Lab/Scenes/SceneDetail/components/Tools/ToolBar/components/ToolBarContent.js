import React, { PropTypes, Component } from 'react';
import Divider from 'material-ui/Divider';
import MovieIcon from 'mdi-react/MovieIcon';
import SelectIcon from 'mdi-react/SelectIcon';
import MicroscopeIcon from 'mdi-react/MicroscopeIcon';
import FilmstripIcon from 'mdi-react/FilmstripIcon';
import ChartHistogramIcon from 'mdi-react/ChartHistogramIcon';
import TableLargeIcon from 'mdi-react/TableLargeIcon';
import BinocularsIcon from 'mdi-react/BinocularsIcon';
import CodeGreaterThanIcon from 'mdi-react/CodeGreaterThanIcon';
import ToolBarItems from './ToolBarItems';

const navItems = [
  { path: 'scenes',
    icon: <MovieIcon />,
    name: 'Scenes',
    authSceneOwner: false,
    authAnalysisOwner: false,
    authAnalysisExists: false },
  { path: 'codes',
    icon: <CodeGreaterThanIcon />,
    name: 'Codes',
    authSceneOwner: false,
    authAnalysisOwner: false,
    authAnalysisExists: false }
];

const sceneItems = [
  { path: 'view-analysis',
    icon: <MicroscopeIcon />,
    name: 'View analysis',
    authSceneOwner: false,
    authAnalysisOwner: false,
    authAnalysisExists: true }
];

const toolItems = [
  { path: 'select',
    icon: <SelectIcon />,
    name: 'Select',
    authSceneOwner: false,
    authAnalysisOwner: true,
    authAnalysisExists: true }
];

const dataItems = [
  { path: 'table',
    icon: <TableLargeIcon />,
    name: 'Table',
    authSceneOwner: false,
    authAnalysisOwner: false,
    authAnalysisExists: true }
];

const itemsArray = [navItems, sceneItems, toolItems, dataItems];

class ToolBarContent extends Component {

  render() {
    const { toolBarSelection, dispatch, scene, analysis } = this.props;
    const toolBarItems = itemsArray.map((items, itemsIndex) => {
      const divider = (itemsIndex === itemsArray.length - 1) ? null : <Divider key={`divider_${itemsIndex}`} />;
      return (
        <div key={`cont_${itemsIndex}`}>
          <ToolBarItems
            key={`toolBarItems_${itemsIndex}`}
            items={items}
            dispatch={dispatch}
            toolBarSelection={toolBarSelection}
            scene={scene}
            analysis={analysis}
          />
          {divider}
        </div>);
    });
    return (
      <div>
        {toolBarItems}
      </div>
    );
  }
}

ToolBarContent.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object,
  dispatch: PropTypes.func,
  toolBarSelection: PropTypes.string
};

export default ToolBarContent;
