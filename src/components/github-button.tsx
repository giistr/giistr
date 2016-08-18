import * as React from 'react';
import { convertHex } from '../helpers/color';
import { Colors } from '../style';

const signup = {
  color: Colors.blue,
  backgroundColor: Colors.blueBackground,
  border: `1px solid ${Colors.blueBorder}`,
  boxShadow: '0 1px 2px 0 rgba(20, 22, 36, 0.08)',
  borderRadius: 5,
  padding: '14px 60px',
  margin: '16px auto',
  marginLeft: 0,
  fontWeight: 300,
  fontSize: 15
};

const githubIcon = {
  display: 'inline-block',
  marginRight: 10,
  verticalAlign: 'middle',
  marginBottom: 4
};

const oauthLabel = {
  verticalAlign: 'middle'
};

export function GithubButton({
  href
}: {
  href: string
}) {

  return (
    <a href={href} style={signup}>
      <img src="assets/github.svg" style={githubIcon}/>
      <span style={oauthLabel}>Sign Up with Github</span>
    </a>
  );
}
