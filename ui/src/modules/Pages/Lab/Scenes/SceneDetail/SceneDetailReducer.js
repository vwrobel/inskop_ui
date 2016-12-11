import { combineReducers } from 'redux';
import analysisReducer from './components/Analysis/AnalysisReducer';
import toolsReducer from './components/Tools/ToolsReducer';

export default combineReducers({
  analysis: analysisReducer,
  tools: toolsReducer
});
