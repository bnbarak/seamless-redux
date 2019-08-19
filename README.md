# Motivation

`React` should render DOM elements, and `Redux` should handle state management - easy to say, hard to do.
`seamless-redux` facilitate the separation between `React` and `Redux` by eliminating the `dispatch` method and the overhead of writing repetitive reducers.

# Setup

```javascript
// Root Reducer
import { combineReducers } from "redux";
import { reducers as entities } from "seamless-redux";

export default combineReducers({
  ...entities
});
```

```javascript
// index.js
const store = createStore(rootReducer);

export const seamless = Seamless(store); // pass the redux store
```

The `redux` store will have three new subtrees

```json
{
  "dataEntities": {},
  "loadingEntities": {},
  "errorEntities": {},
  ...
}
```

# API

## Initialization

Create a seamless object right after the redux store.

```javascript
const store = createStore(rootReducer); // create the redux-store
export const seamless = Seamless(store);
```

### `seamless.createEntity(entityName, defaultState, options)`

```javascript
const defaultState = {};
const options = {
  defaultIsLoading: true
};
```

- `entityName: String` **[requir    ed]** - Name of the entity
- `defaultState: Any` - Default state of the entity. Default `{}`
- `options: Object` - Additional options
  - `defaultIsLoading: Boolean` - default loading state. Default: _true_

### `seamless.getEntity(entityName)`

- `entityName: String` Name of the entity

### `seamless.state`

Get the state. Simply invoke `store.getState()`

## Manage State

```javascript
const myEntity = seamless.getEntity("MyEntity");
```

Will yield

```json
{
  "dataEntities": {
    "MyEntity": {}
  },
  "loadingEntities": {
    "MyEntity": true
  },
  "errorEntities": {
    "MyEntity": {
      "isError": false,
      "data": null
    }
  }
}
```

### `myEntity.reset()`

Reset the data, loading, and error, to the default values.

### `myEntity.start()`

Set the loading state to true

```javascript
myEntity.start();
```

```diff
{
    "loadingEntities": {
-       "MyEntity": false,
+       "MyEntity": true,
    }:
}
```

### `myEntity.finish()`

Set the loading state to false

```javascript
myEntity.finish();
```

```diff
{
    "loadingEntities": {
-       "MyEntity": true,
+      	"MyEntity": false,
    }:
}
```

### `myEntity.newData(data)`

Replace the old data with new data

```javascript
myEntity.newData("new data");
```

```diff
{
	"dataEntities": {
-		"MyEntity": "old data",
+		"MyEntity": "new data"
	}
}
```

### `myEntity.merge(data)`

Merge old data with new data by [\_.merge](https://lodash.com/docs/4.17.15#merge).

```javascript
myEntity.merge({ b: 2 });
```

```diff
{
	"dataEntities": {
-		"MyEntity": {"a": 1},
+		"MyEntity": {"a": 1, "b": 2}
	}
}
```

### `myEntity.updateObjectByKey(data, key)`

If the data is an object, change the data under a key.

```javascript
myEntity.updateObjectByKey("new data", "b");
```

```diff
{
	"dataEntities": {
-		"MyEntity": {"a": "just data", "b": "old data"},
+		"MyEntity": {"a": "just data", "b": "new data"}
	}
}
```

### `myEntity.findInArrayAndUpdate(data, func)`

Will search an array with the search function and will replaced a single find with data.

```javascript
const func = item => item === 2;
myEntity.findInArrayAndUpdate("new data", func);
```

```diff
{
	"dataEntities": {
-		"MyEntity": [1, 2, 3, 2],
+		"MyEntity": [1, "new data", 3, "new data"]
	}
}
```

### `myEntity.toggleBoolean()`

If the data is a boolean, will toggle `true -> false` and `false -> true`.

```javascript
myEntity.toggleBoolean();
```

```diff
{
	"dataEntities": {
-		"MyEntity": false,
+		"MyEntity": true
	}
}
```

or

```diff
{
	"dataEntities": {
-		"MyEntity": true,
+		"MyEntity": false
	}
}
```

### `myEntity.pushData(item)`

If the data is an array, will push an item to the array.

```javascript
myEntity.pushData("new data");
```

```diff
{
	"dataEntities": {
-		"MyEntity": [1, 2, 3],
+		"MyEntity": [1, 2, 3, "new data"]
	}
}
```

### `myEntity.newError(data)`

Will set the `isError` flag to true, and will set the error message to `data`

```javascript
myEntity.newError("error message");
```

```diff
{
	"errorEntities": {
		"MyEntity": {
-            		isError: false,
-            		data: null
+			isError: true,
+            		data: "error message"
  		}
	}
}
```

### `myEntity.resetError()`

Will reset the `isError` to false and the error message to `null`.

```javascript
myEntity.resetError();
```

```diff
{
	"errorEntities": {
		"MyEntity": {
-			isError: true,
-            		data: "error message"
+            		isError: false,
+            		data: null
  		}
	}
}
```

## Selectors

### `selectData(state, entityName)`

Select the data for an entity

### `selectKeyInData(state, entityName, key)`

Select the a key in an data if data is an object

### `selectLoading(state, entityName)`

Select the loading state for an entity

### `selectIsError(state, entityName)`

Select the isError boolean for an entity

### `selectErrorData(state, entityName)`

Select the error message/data for an entity

#### Use Selectors

```javascript
import { selectors } from 'seamless-redux';

const {
  selectData, selectLoading, selectIsError, selectErrorData, selectKeyInData
} = selectors;


class MyComponent extends PureComponent {
  render() {
    const { isLoading, isError, errorMessage, data, someProperty } = this.props;
    return (<div>...</div>);
  }
}
const mapStateToProps = state => ({
  isLoading: selectLoading(state, "MyEntity"),
  isError: selectIsError(state, "MyEntity"),
  errorMessage: selectErrorData(state, "MyEntity"),
  data: selectData(state, "MyEntity"),
  someProperty: selectKeyInData(state, "MyEntity", "some key")
});

export default connect(
  mapStateToProps,
  null
)(MyComponent);
```
