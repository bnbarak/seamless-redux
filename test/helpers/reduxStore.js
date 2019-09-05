import { createStore, combineReducers } from 'redux';
import entitiesDataReducer from '../../src/reducers/data.reducers';
import loadingReducers from '../../src/reducers/loading.reducers';
import errorReducers from '../../src/reducers/error.reducers';

export default () => createStore(combineReducers({
	dataEntities: entitiesDataReducer,
  loadingEntities: loadingReducers,
	errorEntities: errorReducers,
}));

