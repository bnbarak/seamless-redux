import { ACTION_TYPES_NAMES } from "../utils/constants.util";

export default (entityName, dispatch) => {
	const action = {
		type: ACTION_TYPES_NAMES.START_FETCH,
		entityName
	};

	dispatch(action);
};
