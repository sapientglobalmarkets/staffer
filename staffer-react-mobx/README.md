#### Staffer with React + [Mobx](https://github.com/mobxjs/mobx/)

- All of the domain logic is encapsulated in the store. Views are pure observers of the application state and are only responsible for firing actions on the store. 
- All of the actions are methods on the store
- We are also using [mobx-react](https://github.com/mobxjs/mobx-react), [mobx-connect](https://github.com/nightwolfz/mobx-connect) to provide the glue for React.
