import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

const {
	INIT_ENTITY,
  START_FETCH,
  FINISH_FETCH,
  RESET_ENTITY,
} = ACTION_TYPES_NAMES;

const entityReducer = (state = {}, action) => {
  const {
    type, entityName, isLoading,
  } = action;

	if (type === INIT_ENTITY) {
		const newState = state;
		newState[entityName] = isLoading;
		return { ...newState };
	}

  // Guard from a bad/non-exciting entity name
  if (!entityName || state[entityName] === undefined) {
    return state;
  }

  if (type === START_FETCH) {
    return { ...state, [entityName]: true };
  }


	if (type === FINISH_FETCH || type === RESET_ENTITY) {
		return {...state, [entityName]: false};
	}

  return state;
};

export default entityReducer;
