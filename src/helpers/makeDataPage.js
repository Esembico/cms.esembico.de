import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable/DataTable';
import Header from '../components/Header';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Container from '../components/Responsive/Container';
import Row from '../components/Responsive/Row';
import Column from '../components/Responsive/Column';
import Button from '@material-ui/core/Button';
import stateRegister from '../register/stateRegister';
import { ButtonGroup } from '@material-ui/core';

export default function makeDataPage({ columns, Editor, entity }) {
  const Component = ({
    data,
    status,
    lastPage,
    currentPage,
    editedData,
    totalItems,
    fetchData,
    selectPage,
    selectItem,
    selectedId,
    setEditedData,
    updateEditedData,
    commitData,
    deleteItem
  }) => {
    const [mode, setMode] = useState('view');
    const [errors, setErrors] = useState({});
    const validateData = stateRegister.getOption(entity, 'validateData');
    useEffect(() => {
      fetchData();
    }, [fetchData]);

    useEffect(() => {
      const errors = validateData(editedData || {});
      setErrors(errors || {});
    }, [editedData, validateData]);

    const changePage = (page) => {
      selectPage(page);
    };

    const editEntry = (id) => {
      setMode('edit');
      setEditedData(id);
    };

    const saveEntry = () => {
      if (Object.keys(errors).length === 0) {
        commitData(editedData);
      }
    };

    const newEntry = () => {
      setMode('edit');
      setEditedData(-1);
      selectItem(null);
    };

    const onDelete = () => {
      // FIXME: Ask for confirmation before deleting.
      deleteItem(selectedId);
    };

    const onEditorSubmit = (e) => {
      e.preventDefault();
      saveEntry();
    };

    return (
      <div>
        <Header>{stateRegister.getOption(entity, 'header')}</Header>
        <LoadingIndicator show={status === 'loading'} />
        {status !== 'loading' && (
          <React.Fragment>
            <Container>
              <Row>
                <Button variant='contained' color='primary' onClick={newEntry}>
                  New
                </Button>
              </Row>
              {mode === 'view' && (
                <DataTable
                  pageData={{
                    current: currentPage,
                    last: lastPage
                  }}
                  data={data}
                  columns={columns}
                  onPageChange={changePage}
                  onSelect={(id) => {
                    editEntry(id);
                    selectItem(id);
                  }}
                  selected={selectedId}
                  totalItems={totalItems}
                />
              )}
              {mode === 'edit' && (
                <Row>
                  <Column width={100}>
                    {Editor && (
                      <React.Fragment>
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
                              <Button onClick={() => setMode('view')}>
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
                      </React.Fragment>
                    )}
                  </Column>
                </Row>
              )}
            </Container>
          </React.Fragment>
        )}
      </div>
    );
  };
  const { mapStateToProps, mapDispatchToProps } = stateRegister.getMappers(
    entity
  );

  return connect(mapStateToProps, mapDispatchToProps)(Component);
}
