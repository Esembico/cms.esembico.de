import createReducer from '../redux/helpers/createReducer';
import getActions from '../redux/helpers/getActions';
import getMappers from '../redux/helpers/getMappers';
import getSelectors from '../redux/helpers/getSelectors';
import { toCamelCase, toUpperCaseFirstChar } from '../helpers/caseConverter';
import makeDataPage from '../helpers/makeDataPage';
import makeEditor from '../helpers/makeEditor';
import makeValidation from '../helpers/makeValidation';

class StateRegister {
  constructor() {
    this.states = {};
    this.defaultOptions = {
      validateData: () => {}
    };
    this.globalOptions = {};
  }

  setGlobalOptions(options) {
    this.globalOptions = options;
  }

  register(name, options = {}) {
    const mergedOptions = {
      ...this.defaultOptions,
      ...this.globalOptions,
      ...options
    };
    let editor = options.editor;
    let validateData = mergedOptions.validateData;
    if (mergedOptions.buildValidationFromEditor) {
      if (!Array.isArray(editor)) {
        throw Error('editor needs to be an array to build validation');
      }

      validateData = makeValidation(editor);
    }
    if (Array.isArray(editor)) {
      editor = makeEditor({ proprties: editor });
    }
    this.states[name] = {
      ...mergedOptions,
      actions: getActions(name, mergedOptions.endpoint || name),
      selectors: getSelectors(name),
      mappers: getMappers(name, mergedOptions.endpoint || name),
      reducer: createReducer(name),
      header: mergedOptions.header || toUpperCaseFirstChar(name),
      validateData,
      editor
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
            Editor: entry.editor
          })
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

  getAction(entityName, actionName) {
    return this.states[entityName].actions[actionName];
  }

  getSelectors(name) {
    return this.states[name].selectors;
  }

  getSelector(entityName, selectorName) {
    return this.states[entityName].selectors[selectorName];
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
