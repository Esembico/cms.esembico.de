import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import Container from '../components/Responsive/Container';
import Row from '../components/Responsive/Row';
import Column from '../components/Responsive/Column';
import Button from '@material-ui/core/Button';
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
import getDisplayValue from '../helpers/getDisplayValue';

const useStyles = makeStyles((theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  };
});

export default function makeEditPage({ Editor, entity }) {
  const Component = ({
    editedData,
    fetchData,
    selectedId,
    setEditedData,
    updateEditedData,
    commitData,
    deleteItem
  }) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const validateData = stateRegister.getOption(entity, 'validateData');
    const primaryProperty = stateRegister.getOption(entity, 'primaryProperty');

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const params = useParams();
    const history = useHistory();
    const id = params.id;

    const handleClose = () => {
      setConfirmationOpen(false);
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
        commitData(editedData);
      }
    };

    const onDelete = () => {
      deleteItem(selectedId);
      setConfirmationOpen(false);
    };

    const onEditorSubmit = (e) => {
      e.preventDefault();
      saveEntry();
    };

    const newEntry = () => {
      history.push(stateRegister.getEditUrl(entity, 'new'));
    };

    return (
      <div>
        <Header>{stateRegister.getOption(entity, 'header')}</Header>
        {editedData && (
          <Container>
            <Row>
              <form onSubmit={onEditorSubmit}>
                <Editor
                  errors={errors}
                  onUpdate={updateEditedData}
                  data={editedData}
                />
                <Column width={100}>
                  <ButtonGroup color='primary' variant='contained'>
                    <Button
                      disabled={Object.keys(errors).length !== 0}
                      type='submit'
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() =>
                        history.push(stateRegister.getListUrl(entity))
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setConfirmationOpen(true)}
                      color='secondary'
                      disabled={!editedData.id}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Column>
              </form>
            </Row>
            <Fab
              className={classes.fab}
              color='primary'
              aria-label='New'
              onClick={newEntry}
              disabled={!editedData.id}
            >
              <AddIcon />
            </Fab>
            <Dialog
              open={confirmationOpen}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                Delete {stateRegister.getOption(entity, 'singularName')}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Are you sure you want to delete the following{' '}
                  {stateRegister.getOption(entity, 'singularName')}?
                  <br />
                  {getDisplayValue(editedData, primaryProperty.display)}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onDelete} color='secondary'>
                  Yes
                </Button>
                <Button onClick={handleClose} color='secondary'>
                  No
                </Button>
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
