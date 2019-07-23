import { ACTION_TYPES_NAMES } from 'Utils/constants.util';
import combineData from 'Utils/combainData.util';

const {
  INIT_ENTITY,
  RESET_ENTITY,
  NEW_ERROR,
} = ACTION_TYPES_NAMES;

const entityReducer = (state = {}, action) => {
  const {
    type, data, entityName, isError,
  } = action;

  if (type === INIT_ENTITY) {
    const newState = state;
    newState[entityName] = {
		  isError: false,
      data: null,
    };
    return { ...newState };
  }

  // Guard from a bad/non-exciting entity name
  if (!entityName || state[entityName] === undefined) {
    return state;
  }

  if (type === RESET_ENTITY) {
    const newState = state;
    newState[entityName].data = null;
    newState[entityName].isErrors = false;
    return { ...newState };
  }

  if (type === NEW_ERROR) {
    const newState = state;
    newState[entityName].data = data;
    newState[entityName].isError = isError;
    return { ...newState };
  }

  return state;
};

export default entityReducer;
