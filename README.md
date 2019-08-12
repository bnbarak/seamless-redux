# Motivation
`React` should render DOM elements, and `Redux` should handle state management.
Easy to say, hard to write.
`seamless-redux` facilitate the separation `React` and `Redux` by eliminating the `dispatch` method and the overhead of writing repetitive `Redux` code.

# Setup 
1.
```javascript
// Root Reducer
import { combineReducers } from 'redux';
import { reducers as entities } from 'seamless-redux';

export default combineReducers({
  ...entities,
});
````
2.
```javascript
// index.js
const store = createStore(rootReducer);

export const seamless = Seamless(store); // pass the redux store
```


# API
#### Initialization
Create a seamless object right after the redux store.
```javascript
const store = createStore(rootReducer); // create the redux-store
export const seamless = Seamless(store);
```

#### Create Entity

```javascript
const defaultState = {};
const userOptions = {
	defaultIsLoading: true,
}
seamless.createEntity(entityName, defaultState, userOptions)
```
* `entityName: String` **[required]**  - Name of the entity
* `defaultState: Any` - Default state of the entity. Default `{}`
* `userOptions: Object` - Additional options
    - `defaultIsLoading: Boolean` - default loading state. Default: *true*

#### Get Entity
```javascript
seamless.getEntity(entityName)
```
* `entityName: String` Name of the entity

#### Get State
```javascript
seamless.state
```
Get the state. Simply invoke `store.getState()`
