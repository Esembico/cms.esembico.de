import createReducer from '../redux/helpers/createReducer';
import getActions from '../redux/helpers/getActions';
import getMappers from '../redux/helpers/getMappers';
import getSelectors from '../redux/helpers/getSelectors';
import { toCamelCase, toUpperCaseFirstChar } from '../helpers/caseConverter';
import makeEditor from '../helpers/makeEditor';
import makeValidation from '../helpers/makeValidation';
import makeListPage from '../helpers/makeListPage';
import makeEditPage from '../helpers/makeEditPage';
import {
  States,
  Options,
  Link,
  Route,
  Reducers,
  EditorEntry,
  StateOption,
  Property
} from '../types/stateRegister';
import { FC } from 'react';
import { EditorProps } from '../helpers/types/makeEditor';
import getDisplayValue from '../helpers/getDisplayValue';

class StateRegister {
  states: States;
  defaultOptions: Options;
  globalOptions: Options;
  constructor() {
    this.states = {};
    this.defaultOptions = {
      validateData: () => ({}),
      editorActions: [
        {
          name: 'save',
          text: 'Save',
          isSubmitAction: true,
          loading: (status) => {
            return status === 'saving';
          },
          disabled: ({ props, id, errors }) => {
            return (
              (id !== 'new' && !props.canChange) ||
              Object.keys(errors).length !== 0
            );
          }
        },
        {
          name: 'cancel',
          text: 'Cancel',
          onClick: ({ history, entity }) => {
            history.push(this.getListUrl(entity));
          }
        },
        {
          name: 'delete',
          text: 'Delete',
          loading: (status) => {
            return status === 'deleting';
          },
          disabled: ({ props }) => {
            return !props.canDelete || !props.editedData.id;
          },
          buttonColor: 'secondary',
          onClick: ({ entity, props }, showDialog, closeDialog) => {
            const { editedData } = props;
            showDialog({
              title: `Delete ${this.getOption(entity, 'singularName')}`,
              show: true,
              text: `Are you sure you want to delete the following ${this.getOption(
                entity,
                'singularName'
              )}: ${getDisplayValue(
                editedData,
                (this.getOption(entity, 'primaryProperty') as Property).display
              )}`,
              actions: [
                {
                  name: 'yes',
                  text: 'Yes',
                  buttonColor: 'secondary',
                  onClick: ({ props, id, history, entity }) => {
                    const { addAlert, deleteItem } = props;
                    deleteItem(
                      id,
                      () => {
                        history.push(this.getListUrl(entity));
                      },
                      (error: any) => {
                        addAlert({
                          severity: 'error',
                          title: 'Failed to delete',
                          message: error.message
                        });
                      }
                    );
                  }
                },
                {
                  name: 'no',
                  text: 'No',
                  buttonColor: 'secondary',
                  onClick: () => {
                    closeDialog();
                  }
                }
              ]
            });
          }
        }
      ]
    };
    this.globalOptions = {};
  }

  setGlobalOptions(options: Options) {
    this.globalOptions = options;
  }

  register(name: string, options: Options = {}) {
    const mergedOptions = {
      ...this.defaultOptions,
      ...this.globalOptions,
      ...options
    };
    let editor: FC<EditorProps> | Array<EditorEntry> = options.editor ?? [];
    let validateData = mergedOptions.validateData;
    if (mergedOptions.buildValidationFromEditor) {
      if (!Array.isArray(editor)) {
        throw Error('editor needs to be an array to build validation');
      }

      validateData = makeValidation(editor);
    }
    if (Array.isArray(editor)) {
      editor = makeEditor({ properties: editor });
    }
    if (!validateData) {
      throw Error('validateData is required');
    }
    if (!editor) {
      throw new Error('editor is required');
    }
    const model = mergedOptions.model ?? name;
    this.states[name] = {
      ...mergedOptions,
      actions: getActions(name, mergedOptions.endpoint || name),
      selectors: getSelectors(name),
      mappers: getMappers(name, model),
      reducer: createReducer(name),
      header: mergedOptions.header || toUpperCaseFirstChar(name),
      validateData,
      editor,
      model,
      editorActions: mergedOptions.editorActions ?? []
    };
  }

  getListUrl(name: string) {
    return `/${name}`;
  }

  getEditUrl(name: string, id: number | string) {
    return `/${name}/${id}`;
  }

  getLinks() {
    const links: Array<Link> = [];
    Object.entries(this.states).forEach(([name, entry]) => {
      links.push({
        text: entry.header,
        to: this.getListUrl(name),
        icon: entry.icon
      });
    });
    return links;
  }

  getRoutes() {
    const routes: Array<Route> = [];
    Object.entries(this.states).forEach(([name, entry]) => {
      routes.push({
        name,
        listPath: `/${name}`,
        editPath: `/${name}/:id`,
        listComponent: makeListPage({
          columns: entry.columns ?? [],
          entity: name
        }),
        editComponent: makeEditPage({
          entity: name,
          Editor: entry.editor
        })
      });
    });
    return routes;
  }

  getOption(name: string, option: string, defaultValue?: StateOption) {
    const value = this.states[name][option];
    return value || defaultValue;
  }

  getActions(name: string) {
    return this.states[name].actions;
  }

  getAction(entityName: string, actionName: string) {
    return this.states[entityName].actions[actionName];
  }

  getSelectors(name: string) {
    return this.states[name].selectors;
  }

  getSelector(entityName: string, selectorName: string) {
    return this.states[entityName].selectors[selectorName];
  }

  getMappers(name: string) {
    return this.states[name].mappers;
  }

  getReducer(name: string) {
    return this.states[name].reducer;
  }

  getReducers() {
    const reducers: Reducers = {};
    Object.entries(this.states).forEach(([name, entry]) => {
      reducers[toCamelCase(name)] = entry.reducer;
    });

    return reducers;
  }

  getEditorActions(entity: string) {
    return this.states[entity].editorActions;
  }
}

const stateRegister = new StateRegister();

export default stateRegister;
