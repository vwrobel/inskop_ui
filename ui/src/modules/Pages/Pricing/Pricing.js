import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Column, Cell } from 'fixed-data-table-2';
import CentralPaper from '../../Common/All/CentralPaper/CentralPaper';
import free_icon from './plan_icons/free.svg';
import more_icon from './plan_icons/more.svg';
import { inskopPink, inskopDark, inskopLighter } from '../../../styles/MuiTheme'
import '../../../styles/fixed-data-table-2.css';

const styles = StyleSheet.create({
  content: {
    padding: 20,
    fontSize: '14pt',
    lineHeight: 2,
    width: '100%',
    boxSizing: 'border-box'
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  table: {
    border: 'none'
  },
  column: {
    border: 'none'
  },
  cell: {
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: inskopLighter,
    color: inskopDark,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  icon: {
    fill: inskopDark
  },
  name: {
    fontSize: '14pt',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '12pt'
  }
});


class Pricing extends Component {

  render() {
    const columnWidths = {
      icon: 100,
      name: 200,
      description: 510
    };

    const plans = [
      {icon: free_icon, name: 'Free', description: 'Up to 10 video uploads. Up to 20 Mo each.'},
      {
        icon: more_icon,
        name: 'More',
        description:
          <span>
            <a href='mailto:contact@inskop.io'>contact@inskop.io</a>
          </span>
      }
    ];
    return (
      <CentralPaper>
        <div className={css(styles.centered)}>
          <Table
            className={css(styles.table)}
            rowHeight={100}
            rowsCount={plans.length}
            width={810}
            height={202}
            headerHeight={0}
          >
            <Column
              className={css(styles.column)}
              cell={({ rowIndex }) => (
                <Cell className={css(styles.cell, styles.icon)}>
                  <img src={plans[rowIndex].icon} />
                </Cell>
              )}
              width={columnWidths.icon}
            />
            <Column
              cell={({ rowIndex }) => (
                <Cell className={css(styles.cell, styles.name)}>
                  {plans[rowIndex].name}
                </Cell>
              )}
              width={columnWidths.name}
            />
            <Column
              cell={({ rowIndex }) => (
                <Cell className={css(styles.cell, styles.description)}>
                  {plans[rowIndex].description}
                </Cell>
              )}
              width={columnWidths.description}
            />
          </Table>
        </div>
      </CentralPaper>
    );
  }
}

Pricing.propTypes = {

};

export default Pricing;
