import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, data, isLoading, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.INIT_ENTITY,
    entityName,
    data,
    isLoading,
  };

  dispatch(action);
};
