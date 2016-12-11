import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { findDOMNode } from 'react-dom';
import Dimensions from 'react-dimensions';
import { Layer, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import _ from 'underscore';
import { sketchpadAddItem, windowDragItem, windowTransformItem } from '../../../Tools/ToolsActions';
import Rectangle from './Shape/Rectangle';

class Sketchpad extends Component {

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseDown() {
    const { mode, color, containerWidth, containerHeight, dispatch } = this.props;
    switch (mode) {
      case 'add':
        const stage = this.refs.stage.getStage();
        const { x, y } = stage.getPointerPosition();
        const itemId = v4();
        const newItemProps = {
          itemId,
          x: x / containerWidth,
          y: y / containerHeight,
          width: 1 / containerWidth,
          height: 1 / containerHeight,
          stroke: color,
          strokeWidth: 2
        };
        dispatch(sketchpadAddItem(newItemProps));
        break;
      default:
    }
  }

  onMouseUp() {
    const { mode, draggedItemId, dispatch, containerWidth, containerHeight } = this.props;
    switch (mode) {
      case 'transform':
        if (draggedItemId) {
          const itemId = draggedItemId;
          const stage = this.refs.stage.getStage();
          const { x, y } = stage.getPointerPosition();
          const xScaled = x / containerWidth;
          const yScaled = y / containerHeight;
          const transform = { itemId, xScaled, yScaled };
          dispatch(windowTransformItem(transform));
          dispatch(windowDragItem(null));
        }
        break;
      case 'add':
        dispatch(sketchpadAddItem(null));
        break;
      default:
    }
  }

  onMouseMove() {
    const { dispatch, mode, addedItemId, items, containerWidth, containerHeight } = this.props;
    switch (mode) {
      case 'add':
        if (addedItemId) {
          const itemId = addedItemId;
          const stage = this.refs.stage.getStage();
          const { x, y } = stage.getPointerPosition();
          const addedItem = _.find(items, (item) => item.itemId === itemId);
          const width = x / containerWidth - addedItem.x;
          const height = y / containerHeight - addedItem.y;
          const transform = { itemId, width, height };
          dispatch(windowTransformItem(transform));
          // TODO: very ugly! Do better in WindowReducer
          dispatch(windowTransformItem(null));
        }
        break;
      default:
    }
  }

  render() {
    const { containerWidth, containerHeight, dispatch, mode, items } = this.props;
    //  TODO: take of 'wrapper' warning
    return (
      <Stage
        ref='stage'
        width={containerWidth}
        height={containerHeight}
        onContentMouseDown={this.onMouseDown}
        onContentMouseUp={this.onMouseUp}
        onContentMouseMove={this.onMouseMove}
      >
        <Layer>
          {
            items.map((item) => {
              const {
                itemId,
                x,
                y,
                stroke,
                strokeWidth
              } = item;
              return (
                <Rectangle
                  key={itemId}
                  itemId={itemId}
                  x={x}
                  y={y}
                  width={item.width}
                  height={item.height}
                  containerWidth={containerWidth}
                  containerHeight={containerHeight}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  dispatch={dispatch}
                  mode={mode}
                />
              );
            })
          }
        </Layer>
      </Stage>
    );
  }
}


Sketchpad.propTypes = {
  items: PropTypes.array,
  dispatch: PropTypes.func,
  addedItemId: PropTypes.string,
  draggedItemId: PropTypes.string,
  mode: PropTypes.string,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  color: PropTypes.string
};

const mapStateToProps = (state) => ({
  draggedItemId: state.scene.detail.tools.sketchpadDraggedItemId,
  addedItemId: state.scene.detail.tools.sketchpadAddedItemId,
  items: state.scene.detail.tools.sketchpadItems,
  tool: state.scene.detail.tools.windowTool,
  size: state.scene.detail.tools.windowSize,
  color: state.scene.detail.tools.windowColor,
  fill: state.scene.detail.tools.windowFill,
  fillColor: state.scene.detail.tools.windowFillColor,
  mode: state.scene.detail.tools.windowMode
});

export default Dimensions({ elementResize: true })(connect(mapStateToProps)(Sketchpad));
