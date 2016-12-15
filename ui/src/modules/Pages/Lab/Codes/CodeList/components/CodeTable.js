import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import CodeCategoryIcon from '../../../../../Common/Code/CodeCategoryIcon';
import CodeInvalidIcon from '../../../../../Common/Code/CodeInvalidIcon';
import Stamp from '../../../../../Common/All/Dates/Stamp';
import Buttons from './CodeButtons';
import '../../../../../../styles/fixed-data-table.css';


const CodeName = (props) => {
  const { name, createdAt } = props;
  return (
    <div>
      <Link to={`/lab/codes/${name}`}>
        <span style={{ fontSize: '14pt' }}>{name}</span>
      </Link>
      <Stamp date={createdAt} />
    </div>
  );
};

CodeName.propTypes = {
  name: PropTypes.string,
  createdAt: PropTypes.string
};

class CodeTable extends Component {
  render() {
    const {
      codes,
      containerWidth,
      containerHeight,
      dispatch,
      unlock,
      star
    } = this.props;

    const columnWidths = {
      category: 40,
      name: 200,
      description: 200,
      valid: 40,
      owner: 300
    };
    columnWidths.description = containerWidth -
      (columnWidths.category + columnWidths.name + columnWidths.valid + columnWidths.owner);

    return (
      <Table
        rowHeight={60}
        rowsCount={codes.length}
        width={containerWidth}
        height={containerHeight}
        headerHeight={50}
      >
        <Column
          header={<Cell />}
          cell={({ rowIndex }) => (
            <Cell>
              <CodeCategoryIcon category={codes[rowIndex].category.name} tip />
            </Cell>
          )}
          width={columnWidths.category}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={({ rowIndex }) => (
            <Cell>
              <CodeName name={codes[rowIndex].name} createdAt={codes[rowIndex].createdAt} />
            </Cell>
          )}
          width={columnWidths.name}
        />
        <Column
          header={<Cell>Description</Cell>}
          cell={({ rowIndex }) => (
            <Cell>
              <p style={{ marginLeft: 20, opacity: 0.8 }}>{codes[rowIndex].description}</p>
            </Cell>
          )}
          width={columnWidths.description}
        />
        <Column
          header={<Cell />}
          cell={({ rowIndex }) => (
            <Cell>
              <CodeInvalidIcon valid={codes[rowIndex].valid} tip />
            </Cell>
          )}
          width={columnWidths.valid}
        />
        <Column
          header={<Cell />}
          cell={({ rowIndex }) => (
            <Cell>
              <Buttons
                code={codes[rowIndex]}
                dispatch={dispatch}
                unlock={unlock}
                star={star}
                containerWidth={'280px'}
              />
            </Cell>
          )}
          width={columnWidths.owner}
        />
      </Table>
    );
  }
}

CodeTable.propTypes = {
  codes: PropTypes.array,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  dispatch: PropTypes.func,
  unlock: PropTypes.func,
  star: PropTypes.func
};

export default Dimensions({ elementResize: true })(CodeTable);
