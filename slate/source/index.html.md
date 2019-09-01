---
title: Seamless Redux

language_tabs: # must be one of https://git.io/vQNgJ
  - jsx  

toc_footers:
  - Created by <a href='https://github.com/bnbarak'>Barak Ben Noon</a>

search: true
---

# Introduction

> Example

```javascript
const userEntity = seamless.getEntity("User");
userEntity.start(); // Change the loading state to true
userEntity.newData({ username: "Barak" }); // Set the data
userEntity.newError("Some error"); // Set the error to true and the message to "Some error"
```

> Store will look like

```javascript
{
  "dataEntities": {
    "User": { username: "Barak" }
  },
  "loadingEntities": {
    "User": true
  },
  "errorEntities": {
    "User": {
      "isError": true,
      "data": "Some error"
    }
  }
}
```
**Motivation**

`React` should render DOM elements, and `Redux` should handle state management - easy to say, hard to do.
`seamless-redux` facilitate the separation between `React` and `Redux` by eliminating the `dispatch` method and the overhead of writing repetitive code.

**How**

To improve  React/Redux architecture, `seamless-redux` created decorators for common *actions/reducers/selectors* to better handle state management for loading state, data state, and error state.
<aside class="success">
**Yes**, `seamless-redux` is using [reselect](https://github.com/reduxjs/reselect) by default
</aside>
<aside class="success">
**Yes**, `seamless-redux` and can be integrated to an exciting store
</aside>
<aside class="success">
**No**, `seamless-redux` is not a breaking change
</aside>

# Setup
> npm
```bash
npm install seamless-redux
```

> index.js

```jsx
const store = createStore(rootReducer);
export const seamless = Seamless(store); // pass the redux store
```


> rootReducer.js

```jsx
import { combineReducers } from "redux";
import { reducers as entities } from "seamless-redux";
export default combineReducers({
  ...entities
});
```
1. `npm install seamless-redux`
2. Pass the store object to the class instance (index.js)
3. Add the reducers to the root reducer (rootReducer.js)
Then, the `redux` store will have three new subtrees  
`
{
  "dataEntities": {},
  "loadingEntities": {},
  "errorEntities": {},
  ...
}
`

4. Use the `seamless` instance to manage your store by creating entities and changing their data, loading, and error state.

`seamless.createEntity("MyEntity")` to create the entity

`const myEntity = seamless.getEntity("MyEntity")` to get the entity

`entity.start()` will change the loading state to `true`

`entity.finish()` will change the loading state to `false`

`entity.newData(data)` will change the data state to `data`

# Example

## Create Entity

```jsx
import { seamless } from '../index'
seamless.createEntity("User", {});
```

Creating an entity will initiate the data, loading, and error states.

## Component

> Component

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

## Action

> Action

```jsx
export const authUserAction = (email, password) => {
  const userEntity = seamless.getEntity("User");
  userEntity.start();
  userEntity.resetError();
  // Or just userEntity.reset();

  authApi(email, password)
    .then((response) => userEntity.newData(response.data))
    .catch(() => userEntity.newError("Error auth"))
    .finally(() => userEntity.finish());
};
```
Call the action from any component, no `dispatch` required. 

# Seamless API

## Create Entity

```jsx
import { seamelss } from '../index.js';
const entityName = "MyEntity";
const defaultState = {};
const options = {
  defaultIsLoading: true
};
seamless.createEntity(entityName, defaultState, options);
```

Argument | Default | Required | Description
--------- | ------- | ----------- | -----------
entityName | null | true | The name of the entity, example: "User"
defaultState| `{}` | false | The entity's initial data state
options| `{defaultIsLoading: true}` | false | Additional options

## Get Entity

```jsx
const entityName = "MyEntity";
seamless.getEntity(entityName)
```

Get the entity by its name.

## Get State
```jsx
seamless.state;
```

Get the redux state. Simply invoke `store.getState()`


# Loading State

## Reset

```jsx
myEntity.reset()
```

Reset the data, loading, and error, to the default values.
## Start Loading

```jsx
myEntity.start();
  
{
    "loadingEntities": {
-       "MyEntity": false,
+       "MyEntity": true,
    }:
}
```

Set the loading state to true.


## Finish Loading

Set the loading state to false/

```jsx
myEntity.start();
  
{
    "loadingEntities": {
-       "MyEntity": true,
+       "MyEntity": false,
    }:
}
```

# Data State

## New Data

Replace the old data with new data.

```jsx
myEntity.newData("new data");

{
	"dataEntities": {
-		"MyEntity": "old data",
+		"MyEntity": "new data"
	}
}
```

## Merge Data

Merge old data with new data using [\_.merge](https://lodash.com/docs/4.17.15#merge).

```jsx
myEntity.merge({ b: 2 });

{
	"dataEntities": {
-		"MyEntity": {"a": 1},
+		"MyEntity": {"a": 1, "b": 2}
	}
}
```

## Update Object by Key

If the data is an object, change the data under a key.

```jsx
myEntity.updateObjectByKey("new data", "b");

{
	"dataEntities": {
-		"MyEntity": {"a": "just data", "b": "old data"},
+		"MyEntity": {"a": "just data", "b": "new data"}
	}
}
```

## Find in Array and Update

Will search an array with the search function and will replaced a single find with data.

```jsx
const func = item => item === 2;
myEntity.findInArrayAndUpdate("new data", func);

{
	"dataEntities": {
-		"MyEntity": [1, 2, 3, 2],
+		"MyEntity": [1, "new data", 3, "new data"]
	}
}
```

## Toggle Boolean

If the data is a boolean, will toggle `true -> false` and `false -> true`.

```jsx
myEntity.toggleBoolean();

{
	"dataEntities": {
-		"MyEntity": false,
+		"MyEntity": true
	}
}
// OR 
{
	"dataEntities": {
-		"MyEntity": true,
+		"MyEntity": false
	}
}
```

## Push Data to Array

If the data is an array, will push an item to the array.

```jsx
myEntity.pushData("new data");

{
	"dataEntities": {
-		"MyEntity": [1, 2, 3],
+		"MyEntity": [1, 2, 3, "new data"]
	}
}
```
# Error State 

## New Error

Will set the `isError` flag to true, and will set the error message to `data`

```jsx
myEntity.newError("error message");

{
	"errorEntities": {
		"MyEntity": {
-         "isError": false,
-         "data": null
+         "isError": true,
+         "data": "error message"
		}
	}
}
```

## Reset Error

Will reset the `isError` to false and the error message to `null`.

```jsx
myEntity.resetError();

	"errorEntities": {
		"MyEntity": {
-         "isError": true,
-         "data": "error message"
+         "isError": false,
+         "data": null
		}
	}
}
```

# Selectors
  
The selectors select the data, loading, error, and error message for a specific entity.
## Select Data

`selectData(state, entityName)`

Select the data for an entity


## Select a key in the data 

`selectKeyInData(state, entityName, key)`

Select the a key in an data if data is an object


## Select Loading

`selectLoading(state, entityName)`

Select the loading state for an entity

## Select `isError` 

`selectIsError(state, entityName)`

Select the isError boolean for an entity

## Select Error Data

`selectErrorData(state, entityName)`

Select the error message/data for an entity
