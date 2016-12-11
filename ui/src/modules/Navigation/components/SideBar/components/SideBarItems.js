import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { List, ListItem } from 'material-ui/List';
import { StyleSheet, css } from 'aphrodite';


const ListItemStyle = {
  fontSize: '14pt'
};

const renderSubItem = (subitem, dispatch) => {
  const { path, icon, name } = subitem;
  const onClickItem = () => {
    dispatch(push(path));
  };

  return (
    <ListItem key={`mi${name}`} style={ListItemStyle} leftIcon={icon} primaryText={name} value={name} onTouchTap={onClickItem} />
  );
};

const renderSubItems = (subitems, dispatch) => (subitems.map((subitem) => renderSubItem(subitem, dispatch)));

const renderItem = (item, dispatch) => {
  const { path, icon, name, subitems } = item;
  const onClickItem = () => {
    dispatch(push(path));
  };
  const SubItems = subitems ? renderSubItems(subitems, dispatch) : [];

  return (
    <ListItem
      key={`mi${name}`}
      style={ListItemStyle}
      leftIcon={icon}
      primaryText={name}
      value={name}
      onTouchTap={onClickItem}
      nestedItems={SubItems}
      initiallyOpen
    />
  );
};

const renderItems = (items, dispatch) => (items.map((item) => renderItem(item, dispatch)));

const SideBarItems = (props) => {
  const items = renderItems(props.items, props.dispatch);
  return (
    <List>
      {items}
    </List>
  );
};

SideBarItems.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.array
};

export default (SideBarItems);
