import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, defaultData, isLoading, isError, errorData, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.RESET_ENTITY,
    data: defaultData,
    isLoading,
    entityName,
  };

  dispatch(action);
};
