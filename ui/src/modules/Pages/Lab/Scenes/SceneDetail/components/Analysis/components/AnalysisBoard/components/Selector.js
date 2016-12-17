import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { push } from 'react-router-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'underscore';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    height: 58,
    minWidth: 200,
    float: 'left',
    boxSizing: 'border-box'
  }
});

class SelectAnalysis extends Component {
  render() {
    const { analysisSelected, dispatch, analyses, analysis, scene } = this.props;
    const analysisSelectedIndex = analysisSelected ? _.findIndex(analyses,
      (item) => (item.slug === analysisSelected)) : null;
    return (
      <div className={css(styles.container)}>
        <div style={{ display: 'inline-block', float: 'left' }}>
          <SelectField
            style={{
              width: 200,
              marginTop: '-20px'
            }}
            floatingLabelText='Analysis'
            value={analysisSelectedIndex}
            onChange={(e, i, value) => {
              const newAnalysis = analyses[value];
              dispatch(push(`/lab/scenes/${scene.slug}/analyses/${newAnalysis.slug}/videos/orig/tools/view-analysis`));
            }}
          >
            {analyses.map((analysisEl, analysisIndex) => (
              <MenuItem
                key={analysisEl.slug}
                value={analysisIndex}
                primaryText={analysisEl.name}
              />
              ))}
          </SelectField>
        </div>
      </div>
    );
  }
}

SelectAnalysis.propTypes = {
  dispatch: PropTypes.func,
  analysisSelected: PropTypes.string,
  analyses: PropTypes.array,
  analysis: PropTypes.object,
  scene: PropTypes.object
};


export default SelectAnalysis;
