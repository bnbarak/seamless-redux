# Motivation
`React` should render DOM elements, and `Redux` should handle state management.
Easy to say, hard to write.
`seamless-redux` facilitate the separation `React` and `Redux` by eliminating the `dispatch` method and the overhead of writing repetitive `Redux` code.

# Setup 
1. Combine reducers
```javascript
// Root Reducer
import { combineReducers } from 'redux';
import { reducers as entities } from 'seamless-redux';

export default combineReducers({
  ...entities,
});
````

2. Pass the store object
```javascript
// Root.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Seamless from 'seamless-redux';
import rootReducer from './reducers';
import createMyEntities from './entities';

const store = createStore(rootReducer);
export const seamless = Seamless(store);
createMyEntities();

export default () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
```

## Example
#### Entities
Create the entity
```javascript
// entities.js
import { seamless } from './Root.js'
const createMyEntities = () => {
  seamless.createEntity('User', {}); // Set default state to {}
};
```
#### Action
```javascript
const fetchUer = (email, password) => {
  const userEntity = entities.getEntity('User');
  userEntity.start();
  getUser(email, password)
    .then((user) => {
      userEntity.newData(response.data);
      userEntity.resetError();
    })
    .catch(error => userEntity.newError(error))
    .finally(() => userEntity.finish());
};
```

#### Component 
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { selectors } from 'seamless-redux';

const {
  selectData, selectLoading, selectIsError, selectErrorData,
} = selectors;

class User extends React.PureComponent {
  handleSubmit = (email, password) => {
    fetchUer(email, password); // <- trigger the action action
  };

  render() {
    const {
      isLoading, user, errorMessage, isError,
    } = this.props;
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>{errorMessage}</div>;
    }
    return <div>{JSON.stringify(user)}</div>;
  }
}

const mapStateToProps = state => ({
  isLoading: selectLoading(state, 'User'),
  isError: selectIsError(state, 'User'),
  errorMessage: selectErrorData(state, 'User'),
  user: selectData(state, 'User'),
});

export default connect(mapStateToProps)(User);
```
