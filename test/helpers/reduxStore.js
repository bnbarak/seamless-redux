import { createStore, combineReducers } from "redux";
import entityReducer from '../../src/Reducer';
import thunk from "redux-thunk";

const store = createStore(combineReducers({
  entities: entityReducer
}));

export default () => {
  return createStore(combineReducers({
		entities: entityReducer
	}))
};
