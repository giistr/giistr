# Github issues tracker

Fetch a list of repositories you starred then display the issues immediately in one view.
Apply filter and search on these issues and repository then pick one and contribute to your favorite library.

# Stack

- React
- Redux
- Typescript
- Immutable

# Run the app localy (Development)

- Install dependencies 
```
npm install
npm install -g typescript
typings install
```

- Start development server (The github oauth button won't work in development, you need to run the nodejs proxy server for that)
```
npm run start
```

# Run the app for Production

- Configure the server-config.json file, it should look like this
```
{
  "clientId": "your_client_id",
  "clientSecret": "your_client_sevret"
}
```

- Run the docker image
```
./deploy.sh
```
