# typescript-hmr-playground
Lightweight boilerplate for toying with TypeScript. Useful for prototyping. 

1. `npm run deps`
2. `npm run start` in the root to run server & client watchers concurrently, or respectively `cd client && npm run start`, `cd server && npm run start`.
3. http://localhost:3030

## Features
* TS on server / client
* rudimentary HMR: changes are reflected in the browser immediately upon save
* server hot-reloads on change
* source maps in the browser

## Todos
* extract common deps to root 
* improve start time
* hot-reloading for css files
* html templating
* test scaffolding
