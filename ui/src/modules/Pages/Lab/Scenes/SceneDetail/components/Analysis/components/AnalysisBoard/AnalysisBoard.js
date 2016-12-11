import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import Selector from './components/Selector';
import Buttons from './components/Buttons';
import FloatingSmallAddButton from '../../../../../../../../Common/All/Buttons/FloatingSmallAddButton';
import { analysisEditOpenDialogCreate, analysisEditOpenAlert } from '../../AnalysisActions';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    width: '100%',
    position: 'relative'
  }
});

class AnalysisBoard extends Component {
  render() {
    const {
      analyses,
      dispatch,
      analysisSelected,
      analysis,
      scene,
      star,
      unlock,
      userData
    } = this.props;
    const buttons = analysis ? <Buttons
      analysis={analysis}
      dispatch={dispatch}
      unlock={unlock}
      star={star}
      containerWidth={''}
    /> : null;
    return (
      <div className={css(styles.container)}>
        <Selector
          dispatch={dispatch}
          analyses={analyses}
          analysisSelected={analysisSelected}
          analysis={analysis}
          scene={scene}
        />
        {buttons}
        <FloatingSmallAddButton
          addFunction={() => {
            if (userData.authorization.level < 4){
              dispatch(analysisEditOpenDialogCreate(true));
            } else {
              dispatch(analysisEditOpenAlert(true));
            }
          }}
          addLabel='Add analysis'
          highlight={analysis ? !analysis.isUserOwner : true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  analysisSelected: state.scene.detail.analysis.analysisSelected,
  userData: state.auth.userData
});

AnalysisBoard.propTypes = {
  analyses: PropTypes.array,
  dispatch: PropTypes.func,
  analysisSelected: PropTypes.string,
  analysis: PropTypes.object,
  scene: PropTypes.object,
  star: PropTypes.func,
  unlock: PropTypes.func,
  userData: PropTypes.object
};

const AnalysisBoardWithState = connect(mapStateToProps)(AnalysisBoard);

export default AnalysisBoardWithState;
