import createReducer from "../redux/helpers/createReducer";
import getActions from "../redux/helpers/getActions";
import getMappers from "../redux/helpers/getMappers";
import getSelectors from "../redux/helpers/getSelectors";
import { toCamelCase, toUpperCaseFirstChar } from "../helpers/caseConverter";
import makeDataPage from "../helpers/makeDataPage";

class StateRegister {
  constructor() {
    this.states = {};
    this.globalOptions = {};
  }

  setGlobalOptions(options) {
    this.globalOptions = options;
  }

  register(name, options = {}) {
    const mergedOptions = { ...this.globalOptions, ...options };
    this.states[name] = {
      actions: getActions(name, mergedOptions.endpoint || name),
      selectors: getSelectors(name),
      mappers: getMappers(name, mergedOptions.endpoint || name),
      reducer: createReducer(name),
      header: mergedOptions.header || toUpperCaseFirstChar(name),
      columns: mergedOptions.columns,
      primaryProperty: mergedOptions.primaryProperty,
      editor: mergedOptions.editor,
      pageComponent: mergedOptions.pageComponent,
    };
  }

  getRoutes() {
    const routes = [];
    Object.entries(this.states).forEach(([name, entry]) => {
      routes.push({
        name,
        path: `/${name}`,
        component:
          entry.pageComponent ||
          makeDataPage({
            columns: entry.columns,
            primaryProperty: entry.primaryProperty,
            entity: name,
            Editor: entry.editor,
          }),
      });
    });
    return routes;
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
    Object.entries(this.states).forEach(([name, entry]) => {
      reducers[toCamelCase(name)] = entry.reducer;
    });

    return reducers;
  }
}

const stateRegister = new StateRegister();

export default stateRegister;
