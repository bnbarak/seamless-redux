import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, data, isError, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.NEW_ERROR,
    entityName,
    data,
		isError
  };

  dispatch(action);
};
