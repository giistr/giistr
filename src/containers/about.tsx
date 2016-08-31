import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { User } from '../reducers/user';

import { AboutSidebar } from '../components/about-sidebar';
import NavigationBar from '../components/navigation-bar';
import { RawButton } from '../components/raw-button';

interface MainProps {
  user: User;
  location: any;
};

const styles = {
  main: {
    display: 'flex',
    margin: '0px auto',
    maxWidth: 1270,
    marginTop: 60,
    justifyContent: 'space-between'
  },
  column: {
    flex: 8.5,
    marginRight: 100,
    maxWidth: 640
  },
  title: {
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: '0.3px',
    color: Colors.grey,
    fontFamily: 'Droid Sans Mono'
  },
  secondTitle: {
    color: Colors.grey,
    fontWeight: 400,
    margin: '20px 0px',
    fontFamily: 'Droid Sans Mono'
  },
  subtitle: {
    color: Colors.grey,
    fontWeight: 400,
    marginTop: 20,
    marginBottom: 30
  },
  text: {
    fontSize: 14,
    lineHeight: '22px',
    color: Colors.middleGrey,
    paddingBottom: 50,
    borderBottom: `1px solid ${Colors.borderGrey}`
  },
  listContainer: {
    lineHeight: '24px',
    fontSize: 14,
    color: Colors.middleGrey
  },
  bold: {
    color: Colors.grey,
    fontWeight: 500
  },
  thirdTitle: {
    marginTop: 40,
    lineHeight: '50px'
  },
  link: {
    display: 'inline-block',
    marginLeft: 5,
    fontSize: 16
  },
  strap: {
    fontSize: 13,
    lineHeight: '20px',
    color: Colors.middleGrey
  },
  slash: {
    color: Colors.blue
  }
};

class About extends React.Component<MainProps, any> {

  private onClickProjectLink() {
    window.open('https://github.com/alex3165/github-issues', '_blank').focus();
  }

  public render() {
    const { user, location } = this.props;

    return (
      <div>
        <NavigationBar location={location} user={user}/>
        <div style={styles.main}>
          <div style={styles.column}>
            <h1 style={styles.title}><span style={styles.slash}>/</span>About</h1>
            <h1 style={styles.subtitle}>An easy way to pick a task from a repository you like and contribute to it</h1>
            <div style={styles.text}>
              Giistr is a tool that help developers to quickly find a task which fit with their profile.
              The app display all the repositories you starred on github and their issues in one view so you can
              apply filters and find an issue you are happy with.
              Our purpose is to help open-source projects growth faster and get more stability.
              Open-source libraries are a big part of our every day life as a developer, let's make it better.
            </div>
            <div>
              <h1 style={styles.secondTitle}><span style={styles.slash}>/</span>How it works</h1>
              <ul style={styles.listContainer}>
                <li><span style={styles.bold}>Filter</span> the issues easily per date, labels or language</li>
                <li><span style={styles.bold}>Find</span> an issue that fit your skills</li>
                <li><span style={styles.bold}>Contribute</span> to the issue you picked</li>
              </ul>
              <div style={styles.thirdTitle}>
                Built for the developer community with passion, this app is open-source on
                <RawButton onClick={this.onClickProjectLink} style={styles.link}>Github</RawButton>
              </div>
              <div style={styles.strap}>
                Feel free to reach and follow us, we will keep you updated about the project.<br/>
                If you find any issue or have any suggestion to do, you can open an issue on our github
              </div>
            </div>
          </div>
          <AboutSidebar/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user')
}), null)(About);
