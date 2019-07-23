import { createStore, combineReducers } from 'redux';
import entitiesDataReducer from '../../src/reducers/data.reducers';
import loadingReducers from '../../src/reducers/loading.reducers';
import errorReducers from '../../src/reducers/error.reducers';

const store = createStore(combineReducers({
  entitiesData: entitiesDataReducer,
  entitiesLoading: loadingReducers,
  entitiesError: errorReducers,
}));

export default () => createStore(combineReducers({
  entitiesData: entitiesDataReducer,
  entitiesLoading: loadingReducers,
	entitiesError: errorReducers,
}));
