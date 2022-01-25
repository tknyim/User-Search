# GitHub User Search

## Setup
- React Hooks (yarn start or npm start to start server)
- v4 GraphQL version of GitHub's API

## Task List
- [x] Search for users and see a paginated list of results (10 per page)
- [x] Able to navigate through the next and previous pages of the paginated results
- [x] See the total count of search results
- [x] See notable information for each search result, such as username/login, name, avatar, star repositories count, follower count, and url
- [x] Select a search result and be taken to the applicable page on github.com API

## GitHub GraphQL OAuth

To reach the endpoint for the api, you have to authorize your personal access token. Follow this [link](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql) to generate and setup your own personal access token with the correct permissions. Once you start the server, you'll see where to insert your personal access token. Afterwardsm you'll be able to search for users! 
