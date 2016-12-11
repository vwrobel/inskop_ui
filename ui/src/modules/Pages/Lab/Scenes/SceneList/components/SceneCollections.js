import React, { PropTypes, Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import SceneCollection from './SceneCollection';
import SceneAdder from './SceneAdder';
import SceneModifier from './SceneModifier';

const SceneCollections = (props) => {
  const { loading, myScenes, favoriteScenes, featuredScenes } = props;
  const titles = ['My', 'Favorite', 'Featured'];
  const collectionIndex = [0, 1, 2];
  let sceneCollections = [null, null, null];
  if (!loading) {
    sceneCollections = [myScenes, favoriteScenes, featuredScenes];
  }
  return (
    <div>
      <SceneAdder>
        <SceneModifier>
          {titles.map((title, i) => (
            <SceneCollection
              key={title}
              title={title}
              loading={loading}
              sceneCollection={sceneCollections[i]}
              collectionIndex={collectionIndex[i]}
            />
            ))}
        </SceneModifier>
      </SceneAdder>
    </div>
  );
};

SceneCollections.propTypes = {
  loading: PropTypes.bool,
  myScenes: PropTypes.object,
  favoriteScenes: PropTypes.object,
  featuredScenes: PropTypes.object
};

SceneCollections.fragments = {
  scene: new Fragment(gql`
    fragment SceneCollectionScene on SceneNode {
      id
      name
      slug
      description
      createdAt
      locked
      thumbnail
      favoriteCount
      isUserFavorite
      isUserOwner
      status {
        name
      }
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

const SceneCollectionsQuery = gql `
  query SceneCollections {
    myScenes: selectedScenes (excludeOwner: false, first: 24) {
      edges {
        node {
          ...SceneCollectionScene
        }
      }
    }
    favoriteScenes: selectedScenes (excludeOwner: true, excludeFavorite: false, first: 12) {
      edges {
        node {
          ...SceneCollectionScene
        }
      }
    }
    featuredScenes: selectedScenes (excludeOwner: true, excludeFavorite: true, first: 12) {
      edges {
        node {
          ...SceneCollectionScene
        }
      }
    }
  }
`;


const SceneCollectionsWithData = compose(
  graphql(SceneCollectionsQuery, {
    options: ({ params }) => ({
      fragments: SceneCollections.fragments.scene.fragments()
    }),
    props: ({ data: { loading, myScenes, favoriteScenes, featuredScenes } }) => ({
      loading, myScenes, favoriteScenes, featuredScenes
    })
  })
)(SceneCollections);

const SceneCollectionsWithStateAndData = connect()(SceneCollectionsWithData);

export default SceneCollectionsWithStateAndData;
