import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.TOGGLE_BOOLEAN,
    entityName,
  };

  dispatch(action);
};
