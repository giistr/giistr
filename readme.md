<img title="giistr" src="assets/logo@3x.png"/>

<br/>

[![Build Status](https://travis-ci.org/giistr/giistr.svg?branch=release)](https://travis-ci.org/giistr/giistr)

Fetch a list of repositories you starred then display the issues immediately in one view.
Apply filter and search on these issues and repositories then pick one and contribute to your favorite library.

[Learn more](https://medium.com/@alex_picprod/ce06811f3356)

[Go to the app](https://www.giistr.io/)

# Stack

- React
- Redux
- Typescript
- Immutable

# Run the app locally (Development)

- Install dependencies 
```
npm install
npm install -g typescript typings
typings install
```

- Start development server (The github oauth button won't work in development, you need to run the nodejs proxy server for that)
```
npm run start
```

# Run the app for Production

- Build the bundle
```
npm run build
```

Target the `/dist` folder with an nginx, you should use the nginx.conf file provided in the dist folder.
You should also set the `CLIENT_SECRET` and `CLIENT_ID` env variable on nginx.
