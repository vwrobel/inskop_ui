import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { StyleSheet } from 'aphrodite';
import 'reset-css/reset.css';
import clientAppRenderer from './clientAppRenderer';
import '../styles/main.css';

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES);

const reactRoot = document.getElementById('mount');

ReactDOM.render(clientAppRenderer(), reactRoot);

if (process.env.NODE_ENV === 'development') {
  module.hot.accept();
}

