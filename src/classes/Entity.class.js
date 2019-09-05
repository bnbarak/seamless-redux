import _ from 'lodash';
import initAction from 'Actions/init.action';
import resetAction from 'Actions/reset.action';
import startAction from 'Actions/start.action';
import finishAction from 'Actions/finish.action';
import newDataAction from 'Actions/newData.action';
import mergeData from 'Actions/mergeData.action';
import updateObjectByKey from 'Actions/updateObjectByKey.action';
import toggleBoolean from 'Actions/toggleBoolean.action';
import pushData from 'Actions/pushData.action';
import newError from 'Actions/newError.action';
import findInArrayAndUpdate from 'Actions/findInArrayAndUpdate.action';

class Entity {
  constructor(name, defaultData, dispatch, userOptions) {
    const defaultOptions = {
      enableError: true,
      enableIsLoading: true,
      defaultIsLoading: true,
      defaultIsError: false,
      defaultErrorData: null,
    };
    const options = _.extend(defaultOptions, userOptions);

    this.options = options;
    this.dispatch = dispatch;
    this.name = name;
    this.defaultData = defaultData;
    this.isError = undefined;
    this.errorData = undefined;
    this.isLoading = undefined;
    this.init();
  }

  reset(
    isLoading = this.isLoading,
    isError = this.isError,
    errorData = this.errorData,
  ) {
    const { dispatch, name, defaultData } = this;
    resetAction(name, defaultData, isLoading, isError, errorData, dispatch);
  }

  init() {
    const { options } = this;
    if (options.enableIsLoading) {
      this.isLoading = options.defaultIsLoading;
    }
    if (options.enableError) {
      this.isError = options.defaultIsError;
      this.errorData = options.defaultErrorData;
    }
    const { dispatch, name } = this;
    initAction(name, this.defaultData, this.isLoading, this.isError, this.errorData, dispatch);
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

  updateObjectByKey(data, key) {
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

  newError(data) {
    const { dispatch, name } = this;
    newError(name, data, true, dispatch);
  }

  resetError() {
    const { dispatch, name } = this;
    newError(name, null, false, dispatch);
  }

  findInArrayAndUpdate(data, func) {
    const { dispatch, name } = this;
    findInArrayAndUpdate(name, func, data, dispatch);
  }
}

export default Entity;
