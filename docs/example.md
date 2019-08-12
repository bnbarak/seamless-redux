
# Example
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
import { seamless } from './Root';
const fetchUer = (email, password) => {
  const userEntity = seamless.getEntity('User');
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
    fetchUer(email, password); // <- trigger the action
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
