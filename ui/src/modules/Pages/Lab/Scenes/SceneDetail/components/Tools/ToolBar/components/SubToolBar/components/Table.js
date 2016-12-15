import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Formsy from 'formsy-react';
import { FormsySelect } from 'formsy-material-ui/lib';
import { windowsDownload } from '../../../../ToolsActions';

const styles = StyleSheet.create({
  container: {
    padding: 30
  }
});

class Table extends Component {
  render() {
    const { dispatch, authenticated, token, scene, analysis } = this.props;
    const dataFormatList = ['csv'];
    const dataFormatItems = dataFormatList.map((dataFormat, dataFormatIndex) => (
      <MenuItem key={dataFormatIndex} value={dataFormatIndex} primaryText={dataFormat} />
    ));
    return (
      <div className={css(styles.container)}>
        <h5>Get data</h5>
        <Formsy.Form
          onValid={() => {}}
          onInvalid={() => {}}
          onValidSubmit={() => {}}
          onInvalidSubmit={() => {}}
        >
          <FormsySelect
            name='Data format'
            value={0}
            floatingLabelText='Format'
            onChange={(e, value) => {}}
          >
            {dataFormatItems}
          </FormsySelect>
          <RaisedButton
            type='track'
            label='Download'
            disabled={false}
            onClick={() => {
              dispatch(windowsDownload(authenticated, token)).then(
                (res) => {
                  const exportFilename = `${scene.slug}-${analysis.slug}.csv`;
                  const csvData = new Blob([res.payload.text], { type: 'text/csv;charset=utf-8;' });
                  if (navigator.msSaveBlob) {
                    navigator.msSaveBlob(csvData, exportFilename);
                  } else {
                    // In FF link must be added to DOM to be clicked
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(csvData);
                    link.setAttribute('download', exportFilename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }
              );
            }}
          />
        </Formsy.Form>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  authenticated: PropTypes.bool,
  scene: PropTypes.object,
  analysis: PropTypes.object
};

const mapStateToProps = (state) => ({
  token: state.auth.idToken,
  authenticated: state.auth.isAuthenticated
});

const TableWithState = connect(mapStateToProps)(Table);

export default TableWithState;

