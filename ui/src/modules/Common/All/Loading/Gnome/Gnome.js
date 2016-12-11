import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import SpriteAnimator from 'react-sprite-animator';
import gardeningGnome from './gardening_gnome.svg';
import miningGnome from './mining_gnome.svg';
import sawingGnome from './sawing_gnome.svg';

const styles = StyleSheet.create({
  container: {
    boxSizing: 'border-box'
  }
});

const Gnome = (props) => {
  const { activity } = props;
  const gnomes = [miningGnome, gardeningGnome, sawingGnome];
  let activitySprite = gnomes[Math.floor(Math.random() * gnomes.length)];
  switch (activity) {
    case 'mining':
      activitySprite = miningGnome;
      break;
    case 'gardening':
      activitySprite = gardeningGnome;
      break;
    case 'sawing':
      activitySprite = sawingGnome;
      break;
    default:
  }
  return (
    <div className={css(styles.container)}>
      <SpriteAnimator
        scale={1.33}
        width={40}
        height={40}
        sprite={activitySprite}
        shouldAnimate
        fps={20}
        startFrame={0}
      />
    </div>
  );
};

Gnome.propTypes = {
  activity: PropTypes.string
};

export default Gnome;

