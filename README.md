# Motivation
`React` should render DOM elements, and `redux` should handle state management.
Easy to say, hard to write.
`seamless-redux` aims to bring clear separation of entities and reduce the overhead of writing `redux` code.

## Setup 
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
// App.js
import { createStore } from 'redux';
import Seamless from 'seamless-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
export const seamless = Seamless(store);
createMyEntities(seamless);
```
3. Create a user entity
```javascript
// entities.js
const createMyEntities = (seamless) => {
  seamless.createEntity('User', {}); // Set default state to {}
};
```

## Example
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
