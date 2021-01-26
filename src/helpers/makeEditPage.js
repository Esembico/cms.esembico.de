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

const useStyles = makeStyles((theme) => {
  return {
    fab: {
      position: 'absolute',
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
    const validateData = stateRegister.getOption(entity, 'validateData');
    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const params = useParams();
    const history = useHistory();
    const id = params.id;
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
      // FIXME: Ask for confirmation before deleting.
      deleteItem(selectedId);
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
                      onClick={() => onDelete()}
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
