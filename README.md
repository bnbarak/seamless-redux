# Motivation

`React` should render DOM elements, and `Redux` should handle state management - easy to say, hard to do.
`seamless-redux` facilitate the separation between `React` and `Redux` by eliminating the `dispatch` method and the overhead of writing repetitive code.

To improve  React/Redux architecture, `seamless-redux` created decorators for common *actions/reducers/selectors* to better handle state management for loading state, data state, and error state.

* **Yes**, `seamless-redux` is using [reselect](https://github.com/reduxjs/reselect) by default
* **Yes**, `seamless-redux` and can be integrated to an exciting store
* **No**, `seamless-redux` is not a breaking change
</aside>

# Install
`npm install seamless-redux`

# Documentation
See [seamless-redux](https://bnbarak.github.io/seamless-redux) documentations

# Example

> Entity

Creating an entity will initiate the data, loading, and error states.

```jsx
seamless.createEntity("User", {});
```


> React Component

```jsx
import React from 'react';
import { selectors } from 'seamless-redux';

const {
  selectData, selectLoading, selectIsError, selectErrorData,
} = selectors;


class MyComponent extends React.PureComponent {
  componentDidMount() {
    authUserAction(email, password);
  }
 
  render() {
    const { isLoading, isError, errorMessage, user } = this.props;
    return <div />
  }
}
```

> selectors

```jsx
const mapStateToProps = state => ({
  isLoading: selectLoading(state, "MyEntity"),
  isError: selectIsError(state, "MyEntity"),
  errorMessage: selectErrorData(state, "MyEntity"),
  user: selectData(state, "MyEntity"),
});

export default connect(
  mapStateToProps,
  null
)(MyComponent);
```

> Action

```jsx
export const authUserAction = (email, password) => {
  const userEntity = seamless.getEntity("User");
  userEntity.start();
  userEntity.resetError();
  // Or userEntity.reset();

  authApi(email, password)
    .then((response) => userEntity.newData(response.data))
    .catch(() => userEntity.newError("Error auth"))
    .finally(() => userEntity.finish());
};
```
