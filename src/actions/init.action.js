import { ACTION_TYPES_NAMES } from "../utils/constants.util";

export default (entityName, defaultData, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.INIT_ENTITY,
    data: defaultData,
    entityName
  };

  dispatch(action);
};
