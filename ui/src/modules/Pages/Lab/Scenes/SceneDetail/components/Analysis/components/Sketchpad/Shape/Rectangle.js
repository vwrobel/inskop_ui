import React, { Component, PropTypes } from 'react';
import { Rect } from 'react-konva';
import { windowDragItem } from '../../../../Tools/ToolsActions';

class Rectangle extends Component {

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart() {
    const { dispatch, itemId } = this.props;
    dispatch(windowDragItem(itemId));
  }

  onDragEnd() {

  }

  render() {
    const {
      x,
      y,
      width,
      height,
      stroke,
      strokeWidth,
      dash,
      mode,
      containerWidth,
      containerHeight
    } = this.props;

    return (
      <Rect
        x={x * containerWidth}
        y={y * containerHeight}
        width={width * containerWidth}
        height={height * containerHeight}
        stroke={stroke}
        strokeWidth={strokeWidth}
        dash={dash}
        shadowBlur={10}
        draggable={mode === 'transform'}
        onDragStart={() => this.onDragStart()}
        onDragEnd={() => this.onDragEnd()}
      />
    );
  }
}

Rectangle.propTypes = {
  dispatch: PropTypes.func,
  itemId: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  dash: PropTypes.array,
  mode: PropTypes.string
};

export default Rectangle;
