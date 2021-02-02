import React, { FC, useEffect, useState, FormEvent } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import Container from '../components/Responsive/Container';
import Row from '../components/Responsive/Row';
import Column from '../components/Responsive/Column';
import stateRegister from '../register/stateRegister';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonWithLoading from '../components/ButtonWithLoading';
import { MakeEditPageParams, EditPageProps } from './types/makeEditPage';
import {
  ValidateData,
  InputErrors,
  EditorAction,
  ActionDialogOptions
} from '../types/stateRegister';

const useStyles = makeStyles((theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  };
});

const initialDialogOptions: ActionDialogOptions = {
  show: false
};

export default function makeEditPage({
  Editor,
  entity
}: MakeEditPageParams): FC<EditPageProps> {
  const Component: FC<EditPageProps> = (props) => {
    const {
      editedData,
      selectPage,
      setEditedData,
      updateEditedData,
      commitData,
      status,
      lastEditedField,
      addAlert,
      canAdd
    } = props;
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const actions = stateRegister.getEditorActions(entity);
    const validateData = stateRegister.getOption(
      entity,
      'validateData'
    ) as ValidateData;

    useEffect(() => {
      selectPage(1);
    }, [selectPage]);

    const params: any = useParams();
    const history = useHistory();
    const id = params.id;
    const [
      actionDialogOptions,
      setActionDialogOptions
    ] = useState<ActionDialogOptions>(initialDialogOptions);

    const makeActionButton = (action: EditorAction) => {
      return (
        <ButtonWithLoading
          color={action.buttonColor}
          onClick={() => {
            if (action.onClick) {
              action.onClick(
                {
                  props,
                  id,
                  errors: errors as InputErrors,
                  entity,
                  history
                },
                (options) => setActionDialogOptions(options),
                () => setActionDialogOptions(initialDialogOptions)
              );
            }
          }}
          disabled={
            action.disabled
              ? action.disabled({
                  props,
                  id,
                  errors: errors as InputErrors,
                  entity,
                  history
                })
              : false
          }
          loading={action.loading ? action.loading(status) : false}
          key={action.name}
          type={action.isSubmitAction ? 'submit' : undefined}
        >
          {action.text}
        </ButtonWithLoading>
      );
    };

    useEffect(() => {
      if (id === 'new') {
        setEditedData(-1);
      } else {
        setEditedData(parseInt(id));
      }
    }, [id]);

    useEffect(() => {
      const errors = validateData(editedData || {});
      setErrors(errors || {});
    }, [editedData, validateData]);

    const saveEntry = () => {
      if (Object.keys(errors).length === 0) {
        commitData(
          editedData,
          (data: any) => {
            history.push(stateRegister.getEditUrl(entity, data.id));
          },
          (error: any) => {
            addAlert({
              severity: 'error',
              title: 'Failed to Save',
              message: error.message
            });
          }
        );
      }
    };

    const onEditorSubmit = (e: FormEvent) => {
      e.preventDefault();
      saveEntry();
    };

    const newEntry = () => {
      history.push(stateRegister.getEditUrl(entity, 'new'));
    };

    return (
      <div>
        <Header loading={status !== 'idle'}>
          {stateRegister.getOption(entity, 'header')}
        </Header>
        {editedData && (
          <Container>
            <Row>
              <form onSubmit={onEditorSubmit}>
                <Editor
                  errors={errors}
                  onUpdate={updateEditedData}
                  data={editedData}
                  lastEditedField={lastEditedField}
                />
                <Column width={100}>
                  <ButtonGroup color='primary' variant='contained'>
                    {actions.map((action) => {
                      return makeActionButton(action);
                    })}
                  </ButtonGroup>
                </Column>
              </form>
            </Row>
            <Fab
              className={classes.fab}
              color='primary'
              aria-label='New'
              onClick={newEntry}
              disabled={!canAdd || !editedData.id}
            >
              <AddIcon />
            </Fab>
            <Dialog
              open={actionDialogOptions.show}
              onClose={() => setActionDialogOptions(initialDialogOptions)}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {actionDialogOptions.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  {actionDialogOptions.text}
                </DialogContentText>
                {actionDialogOptions.component}
              </DialogContent>
              <DialogActions>
                {actionDialogOptions.actions?.map((action) => {
                  return makeActionButton(action);
                })}
              </DialogActions>
            </Dialog>
          </Container>
        )}
      </div>
    );
  };
  const { mapStateToProps, mapDispatchToProps } = stateRegister.getMappers(
    entity
  );

  return connect(mapStateToProps, mapDispatchToProps)(Component);
}
