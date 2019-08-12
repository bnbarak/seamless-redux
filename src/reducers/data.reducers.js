import _ from 'lodash';
import { ACTION_TYPES_NAMES } from 'Utils/constants.util';
import combineData from 'Utils/combainData.util';

const {
  NEW_DATA,
  INIT_ENTITY,
  MERGE_DATA,
  UPDATE_OBJECT_BY_KEY,
  TOGGLE_BOOLEAN,
  RESET_ENTITY,
  PUSH_DATA,
  FIND_IN_ARRAY_AND_UPDATE,
} = ACTION_TYPES_NAMES;

const entityReducer = (state = {}, action) => {
  const {
    type, data, entityName, key, func,
  } = action;

  if (type === INIT_ENTITY) {
    const newState = state;
    newState[entityName] = data;
    return { ...newState };
  }

  // Guard from a bad/non-exciting entity name
  if (!entityName || state[entityName] === undefined) {
    return state;
  }

  if (type === RESET_ENTITY) {
    const newState = state;
    newState[entityName] = data;
    return { ...newState };
  }

  if (type === NEW_DATA) {
    const newState = state;
    newState[entityName] = data;
    return { ...newState };
  }

  if (type === MERGE_DATA) {
    const newState = state;
    const oldData = newState[entityName];
    newState[entityName] = combineData(oldData, data);
    return { ...newState };
  }

  if (type === UPDATE_OBJECT_BY_KEY) {
    const newState = state;
    const oldData = newState[entityName];
    if (oldData) {
      newState[entityName][key] = data;
    }
    return { ...newState };
  }

  if (type === TOGGLE_BOOLEAN) {
    const newState = state;
    const oldData = newState[entityName];
    if (typeof oldData === 'boolean') {
      newState[entityName] = !oldData;
    }
    return { ...newState };
  }

  if (type === PUSH_DATA) {
    const newState = state;
    newState[entityName].push(data);
    return { ...newState };
  }

  if (type === FIND_IN_ARRAY_AND_UPDATE) {
    const newState = state;
    const index = _.findIndex(newState[entityName], func);
    newState[entityName][index] = data;
    return { ...newState };
  }

  return state;
};

export default entityReducer;
