import createReducer from "../redux/helpers/createReducer";
import getActions from "../redux/helpers/getActions";
import getMappers from "../redux/helpers/getMappers";
import getSelectors from "../redux/helpers/getSelectors";
import { toCamelCase } from "../helpers/caseConverter";

class StateRegister {
  constructor() {
    this.states = {};
  }

  register(name, options = {}) {
    this.states[name] = {
      actions: getActions(name, options.endpoint || name),
      selectors: getSelectors(name),
      mappers: getMappers(name, options.endpoint || name),
      reducer: createReducer(name),
      header: options.header || name,
    };
  }

  getOption(name, option, defaultValue) {
    const value = this.states[name][option];
    return value || defaultValue;
  }

  getActions(name) {
    return this.states[name].actions;
  }

  getSelectors(name) {
    return this.states[name].selectors;
  }

  getMappers(name) {
    return this.states[name].mappers;
  }

  getReducer(name) {
    return this.states[name].reducer;
  }

  getReducers() {
    const reducers = {};
    Object.entries(this.states).forEach(([key, value]) => {
      reducers[toCamelCase(key)] = value.reducer;
    });

    return reducers;
  }
}

const stateRegister = new StateRegister();

export default stateRegister;
