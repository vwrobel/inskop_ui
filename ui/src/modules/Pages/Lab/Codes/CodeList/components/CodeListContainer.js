import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import CodeAdder from './CodeAdder';
import CodeModifier from './CodeModifier';
import CodeListWrapper from './CodeListWrapper';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});


const CodeCollections = (props) => {
  const { data, dispatch } = props;
  let codes = null;
  if (!data.loading) {
    codes = data.allCodes.edges.map((code) => code.node);
  }
  return (
    <div className={css(styles.container)}>
      <CodeAdder>
        <CodeModifier>
          <CodeListWrapper
            codes={codes}
            loading={data.loading}
            dispatch={dispatch}
          />
        </CodeModifier>
      </CodeAdder>
    </div>
  );
};

CodeCollections.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

CodeCollections.fragments = {
  code: new Fragment(gql`
    fragment CodeCollectionCode on CodeNode {
      id
      name
      description
      category {
        name
      }
      createdAt
      locked
      valid
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
  `)
};

const CodeCollectionsQuery = gql `
  query CodeCollections {
    allCodes {
      edges {
        node {
          ...CodeCollectionCode
        }
      }
    }
  }
`;


const CodeCollectionsWithData = compose(
  graphql(CodeCollectionsQuery, {
    options: ({ params }) => ({
      fragments: CodeCollections.fragments.code.fragments()
    })
  })
)(CodeCollections);

const CodeCollectionsWithStateAndData = connect()(CodeCollectionsWithData);

export default CodeCollectionsWithStateAndData;
