import { ACTION_TYPES_NAMES } from "./utils/constants.util";
import combineData from "./utils/combainData.util";
const {
  START_FETCH,
  FINISH_FETCH,
  NEW_DATA,
  INIT_ENTITY,
  MERGE_DATA,
  UPDATE_OBJECT_BY_KEY,
  TOGGLE_BOOLEAN,
  RESET_ENTITY,
	PUSH_DATA
} = ACTION_TYPES_NAMES;

const entityReducer = (state = {}, action) => {
  const { type, data, entityName, key, isLoading } = action;

  if (type === INIT_ENTITY) {
    const newState = state;
    newState[entityName] = data;
    return { ...newState };
  }

  // Guard from a bad/non-exciting entity name
  if (!entityName || state[entityName] === undefined) {
    return state;
  }

  if (type === START_FETCH) {
    const newState = state;
    newState[entityName].isLoading = true;
    return { ...newState };
  }

  if (type === RESET_ENTITY) {
    const newState = state;
    newState[entityName].isLoading = isLoading;
    newState[entityName].data = data;
    return { ...newState };
  }

  if (type === FINISH_FETCH) {
    const newState = state;
    newState[entityName].isLoading = false;
    return { ...newState };
  }

  if (type === NEW_DATA) {
    const newState = state;
    newState[entityName].data = data;
    return { ...newState };
  }

  if (type === MERGE_DATA) {
    const newState = state;
    const oldData = newState[entityName].data;
    newState[entityName].data = combineData(oldData, data);
    return { ...newState };
  }

  if (type === UPDATE_OBJECT_BY_KEY) {
    const newState = state;
    const oldData = newState[entityName].data;
    if (oldData) {
      newState[entityName].data[key] = data;
    }
    return { ...newState };
  }

  if (type === TOGGLE_BOOLEAN) {
    const newState = state;
    const oldData = newState[entityName].data;
    if (typeof oldData == "boolean") {
      newState[entityName].data = !oldData;
    }
    return { ...newState };
  }

  if (type === PUSH_DATA) {
    const newState = state;
    newState[entityName].data.push(data);
    return { ...newState };
  }

  return state;
};

export default entityReducer;
