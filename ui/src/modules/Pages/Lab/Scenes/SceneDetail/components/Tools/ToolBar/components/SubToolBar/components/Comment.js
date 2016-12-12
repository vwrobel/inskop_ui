import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { FormsySelect } from 'formsy-material-ui/lib';
import ReactDisqusThread from 'react-disqus-thread';

const styles = StyleSheet.create({
  container: {
    padding: 30
  }
});


class Comment extends Component {
  render() {
    const { scene, analysis, currentPath } = this.props;
    return (
      <div className={css(styles.container)}>
        <ReactDisqusThread
          shortname='inskop-io'
          identifier={`${scene.slug}-${analysis.slug}`}
          title={`${scene.slug}-${analysis.slug}`}
          category_id='analysis_thread'
        />
      </div>
    );
  }
}

Comment.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  authenticated: PropTypes.bool,
  analysis: PropTypes.object,
  scene: PropTypes.object,
  currentPath: PropTypes.string
};

const mapStateToProps = (state) => ({
  token: state.auth.idToken,
  authenticated: state.auth.isAuthenticated,
  currentPath: state.routing.locationBeforeTransitions.pathname
});

const CommentWithState = connect(mapStateToProps)(Comment);

export default CommentWithState;

/*
s.slug}`}
            category_id='analysis_thread'
          shortname="inskop-io"
          identifier="something-unique-12345"
          title="Example Thread"
          url="http://www.example.com/example-thread"
          category_id="123456"
 */
