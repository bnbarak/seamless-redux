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
## Entity
`Class Seamless`
 * Constractor(store)
    
    - store: redux store object
   
