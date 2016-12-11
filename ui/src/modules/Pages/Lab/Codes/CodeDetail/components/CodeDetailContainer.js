import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import CodeDetailWrapper from './CodeDetailWrapper';
import CodeModifier from '../../CodeList/components/CodeModifier';
import Loading from '../../../../../Common/All/Loading/Loading';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

const CodeDetailContainer = (props) => {
  const { data, dispatch } = props;
  if (data.loading) {
    return <Loading />;
  }
  const code = data.codeBySlug;
  return (
    <div className={css(styles.container)}>
      <CodeModifier>
        <CodeDetailWrapper code={code} dispatch={dispatch} />
      </CodeModifier>
    </div>
  );
};

CodeDetailContainer.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

const CodeQuery = gql`
  query ($codeSlug: String) {
    codeBySlug(slug: $codeSlug) {
      id
      name
      description
      code
      readMe
      category {
        name
      }
      createdAt
      locked
      favoriteCount
      isUserFavorite
      isUserOwner
      owner {
        id
        name
        picture
        slug
        bio
        sceneStars
        codeStars
        analysisStars
      }
    }
  }`;

const CodeDetailContainerWithData = graphql(CodeQuery)(CodeDetailContainer);

export default connect()(CodeDetailContainerWithData);
