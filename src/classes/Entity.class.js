import _ from "lodash";
import initAction from "../actions/init.action";
import resetAction from "../actions/reset.action";
import startAction from "../actions/start.action";
import finishAction from "../actions/finish.action";
import newDataAction from "../actions/newData.action";
import mergeData from "../actions/mergeData.action";
import updateObjectByKey from "../actions/updateObjectByKey.action";
import toggleBoolean from "../actions/toggleBoolean.action";
import pushData from "../actions/pushData.action";

class Entity {
  constructor(name, defaultData, dispatch, userOptions) {
    const defaultOptions = {
      isLoading: true
    };
    const options = _.extend(defaultOptions, userOptions);

    this.options = options;
    this.dispatch = dispatch;
    this.name = name;
    this.data = defaultData;
    this.defaultData = defaultData;
    this.init();
  }

  get defaultState() {
    const { isLoading, data } = this;
    return {
      isLoading,
      data
    };
  }

  reset(isLoading = this.isLoading) {
    const { dispatch, name, defaultData } = this;
    resetAction(name, defaultData, isLoading, dispatch);
  }

  init() {
    const { options } = this;
    if (options.isLoading) this.isLoading = true;
    const { dispatch, name } = this;
    const defaultData = this.defaultState;
    initAction(name, defaultData, dispatch);
  }

  start() {
    const { dispatch, name } = this;
    startAction(name, dispatch);
  }

  finish() {
    const { dispatch, name } = this;
    finishAction(name, dispatch);
  }

  newData(data) {
    const { dispatch, name } = this;
    newDataAction(name, data, dispatch);
  }

  mergeData(data) {
    const { dispatch, name } = this;
    mergeData(name, data, dispatch);
  }

  updateObjectByKey(key, data) {
    const { dispatch, name } = this;
    updateObjectByKey(name, key, data, dispatch);
  }

  toggleBoolean() {
    const { dispatch, name } = this;
    toggleBoolean(name, dispatch);
  }

	pushData(data) {
		const { dispatch, name } = this;
		pushData(name, data, dispatch);
	}
}

export default Entity;
