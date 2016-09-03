import * as React from 'react';
import { RawButton } from './raw-button';
import { Colors } from '../style';

const styles = {
  container: {
    flex: 3.5,
    maxWidth: 340,
    marginTop: 40
  },
  mainTitle: {
    fontWeight: 400,
    color: Colors.grey,
    fontSize: 14,
    fontFamily: 'Droid Sans Mono'
  },
  user: {
    marginTop: 30
  },
  userNext: {
    marginTop: 40
  },
  userTitle: {
    fontWeight: 400,
    color: Colors.grey,
    fontSize: 14,
    fontFamily: 'Droid Sans Mono'
  },
  second: {
    color: Colors.blue,
    backgroundColor: Colors.blueBackground,
    padding: '2px 4px',
    borderRadius: 4
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
  },
  firstLink: {
    paddingRight: 5
  }
};

function redirectTo(url: string) {
  window.open(url, '_blank').focus();
}

export function AboutSidebar() {

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}><span style={styles.slash}>/</span>We built the platform</h1>
      <div>

        <div style={styles.user}>
          <h1 style={styles.userTitle}>Alexandre_Rieux<span style={styles.second}>/developer</span></h1>
          <div style={styles.description}>
            Front-end developer, creativity and tech addict into Functional Reactive Programming.
          </div>
          <div style={styles.links}>
            <RawButton
              style={styles.firstLink}
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

        <div style={styles.userNext}>
          <h1 style={styles.userTitle}>Jason_Boyer<span style={styles.second}>/designer</span></h1>
          <div style={styles.description}>
            Jason is interested in everything about creativity,
            design and learning. He also recently started to be addict at tea.
          </div>
          <div style={styles.links}>
            <RawButton
              style={styles.firstLink}
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

        <div style={styles.userNext}>
          <h1 style={styles.userTitle}>Guillaume_de_Jabrun<span style={styles.second}>/developer</span></h1>
          <div style={styles.description}>
            Versatile developer (mainly front-end), and open source enthusiast.
          </div>
          <div style={styles.links}>
            <RawButton
              style={styles.firstLink}
              onClick={redirectTo.bind(null, 'https://github.com/Wykks')}>
              Github
            </RawButton>
          </div>
        </div>

      </div>
    </div>
  );
}
