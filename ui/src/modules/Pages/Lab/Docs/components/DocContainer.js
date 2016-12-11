import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../../../Common/All/Loading/Loading';
import DocGrid from './DocGrid';


const DocContainer = (props) => {
  const { data } = props;
  if (data.loading) {
    return <Loading />;
  }
  const docs = data.allDocs.edges.map((docEdge) => docEdge.node);
  return (
    <DocGrid docs={docs} />
  );
};

DocContainer.propTypes = {
  data: PropTypes.object
};

const Query = gql `
query {
  allDocs {
    edges {
      node {
        slug
        title
        file
      }
    }
  }
}`;

const DocContainerWithData = graphql(Query)(DocContainer);

export default DocContainerWithData;
