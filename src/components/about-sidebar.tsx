import * as React from 'react';
import { RawButton } from './raw-button';
import { Colors } from '../style';

const styles = {
  container: {
    flex: 3.5
  },
  mainTitle: {
    fontWeight: 400,
    color: Colors.grey,
    fontSize: 17
  },
  user: {
    marginTop: 30
  },
  userTitle: {
    fontWeight: 400,
    color: Colors.grey,
    fontSize: 16
  },
  slash: {
    color: Colors.blue
  },
  description: {
    fontSize: 13,
    lineHeight: '18px',
    color: Colors.lightGrey,
    marginTop: 14
  },
  links: {
    display: 'flex',
    marginTop: 5
  },
  link: {
    padding: '0px 5px'
  }
};

function redirectTo(url) {
  window.open(url, '_blank').focus();
}

export function AboutSidebar() {

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}><span style={styles.slash}>/</span>About us</h1>
      <div>

        <div style={styles.user}>
          <h1 style={styles.userTitle}>alexandre_rieux<span style={styles.slash}>/</span>developer</h1>
          <div style={styles.description}>
            Front-end developer, FRP, Immutability, also iOS developer during my free time.
          </div>
          <div style={styles.links}>
            <RawButton
              style={styles.link}
              onClick={redirectTo.bind(null, 'https://github.com/alex3165')}>
              Github
            </RawButton>
            <RawButton
              style={styles.link}
              onClick={redirectTo.bind(null, 'https://twitter.com/alex_picprod')}>
              Twitter
            </RawButton>
            <RawButton
              style={styles.link}
              onClick={redirectTo.bind(null, 'http://alexrieux.fr')}>
              Website
            </RawButton>
          </div>
        </div>

        <div style={styles.user}>
          <h1 style={styles.userTitle}>jason_boyer<span style={styles.slash}>/</span>designer</h1>
          <div style={styles.description}>
            blabla
          </div>
          <div style={styles.links}>
            <RawButton
              style={styles.link}
              onClick={redirectTo.bind(null, 'https://dribbble.com/jason_boyer')}>
              Dribbble
            </RawButton>
            <RawButton
              style={styles.link}
              onClick={redirectTo.bind(null, 'https://twitter.com/jason_boyer')}>
              Twitter
            </RawButton>
            <RawButton
              style={styles.link}
              onClick={redirectTo.bind(null, 'http://jasonboyer.fr')}>
              Website
            </RawButton>
          </div>
        </div>

      </div>
    </div>
  );
}
