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

class Entity {
  constructor(name, defaultData, dispatch, userOptions) {
    const defaultOptions = {
      isLoading: true,
      defaultIsLoading: true,
    };
    const options = _.extend(defaultOptions, userOptions);

    this.options = options;
    this.dispatch = dispatch;
    this.name = name;
    this.defaultData = defaultData;
    this.isError = false;
    this.init();
  }

  reset(isLoading = this.isLoading) {
    const { dispatch, name, defaultData } = this;
    resetAction(name, defaultData, isLoading, dispatch);
  }

  init() {
    const { options, defaultData } = this;
    let isLoading;
    if (options.isLoading) isLoading = options.defaultIsLoading;
    const { dispatch, name } = this;
    const data = defaultData;
    initAction(name, data, isLoading, dispatch);
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

  newError(data) {
    const { dispatch, name } = this;
    newError(name, data, true, dispatch);
  }

  resetError() {
    const { dispatch, name } = this;
    newError(name, null, false, dispatch);
  }
}

export default Entity;
