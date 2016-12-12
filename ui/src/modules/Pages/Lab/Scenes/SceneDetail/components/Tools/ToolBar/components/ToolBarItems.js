import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import { inskopLight, inskopLighter } from '../../../../../../../../../styles/MuiTheme';
import { toolBarActionSelect } from '../../ToolsActions';


const listItemStyle = {
  fontSize: '14pt'
};

const disabledListItemStyle = {
  fontSize: '14pt',
  fill: inskopLight
};

const styles = StyleSheet.create({
  tooltip: {
    marginTop: 15,
    opacity: '0.2'
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: '5px'
  }
});


const renderItem = (item, dispatch, toolBarSelection, scene, analysis) => {
  const { path, icon, name, authSceneOwner, authAnalysisOwner, authAnalysisExists } = item;
  const onClickItem = () => {
    toolBarActionSelect(path, dispatch, scene, analysis);
  };
  const boxedIcon = (
    <div key={`icon_${name}`} className={css(styles.icon)}>
      {icon}
    </div>
  );

  let innerDivStyle = {};
  if (path === toolBarSelection) {
    innerDivStyle = { backgroundColor: inskopLight };
  }
  const isDisabledForScene = authSceneOwner && !scene.isUserOwner;
  const isDisabledForAnalysis = (analysis === null) ? authAnalysisOwner :
    (authAnalysisOwner && !analysis.isUserOwner);
  const isDisabledForAnalysisExists = (analysis === null) && authAnalysisExists;
  const isDisabled = (isDisabledForScene || isDisabledForAnalysis || isDisabledForAnalysisExists);
  const itemStyle = isDisabled ? disabledListItemStyle : listItemStyle;
  return (
    <a key={`a_${name}`} data-tip={name}>
      <ListItem
        key={`li_${name}`}
        style={itemStyle}
        leftIcon={boxedIcon}
        value={name}
        onTouchTap={onClickItem}
        innerDivStyle={innerDivStyle}
        disabled={isDisabled}
      />
    </a>
  );
};

const renderItems = (items, dispatch, toolBarSelection, scene, analysis) =>
  (items.map((item) => renderItem(item, dispatch, toolBarSelection, scene, analysis)));

const ToolBarItems = (props) => {
  const { items, dispatch, toolBarSelection, scene, analysis } = props;
  const thisItems = renderItems(items, dispatch, toolBarSelection, scene, analysis);
  return (
    <List>
      <ReactTooltip place='left' type='dark' effect='solid' class={css(styles.tooltip)} delayHide={0} delayShow={500} />
      {thisItems}
    </List>
  );
};

ToolBarItems.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.array,
  toolBarSelection: PropTypes.string,
  scene: PropTypes.object,
  analysis: PropTypes.object
};

export default ToolBarItems;
