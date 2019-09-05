import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, data, isLoading, isError, errorData, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.INIT_ENTITY,
    entityName,
    data,
    isLoading,
    isError,
    errorData,
  };

  dispatch(action);
};
