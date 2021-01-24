import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable/DataTable';
import Header from '../components/Header';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import DataList from '../components/DataList';
import Container from '../components/Responsive/Container';
import Row from '../components/Responsive/Row';
import Column from '../components/Responsive/Column';
import Button from '../components/Input/Button';
import stateRegister from '../register/stateRegister';

export default function makeDataPage({
  columns,
  primaryProperty,
  Editor,
  entity
}) {
  const Component = ({
    data,
    status,
    lastPage,
    currentPage,
    editedData,
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

    return (
      <div>
        <Header>{stateRegister.getOption(entity, 'header')}</Header>
        <LoadingIndicator show={status === 'loading'} />
        {status !== 'loading' && (
          <React.Fragment>
            <Container>
              <Row>
                <Button
                  className={mode === 'edit' ? 'hide-on-mobile' : ''}
                  onClick={newEntry}
                >
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
                />
              )}
              {mode === 'edit' && (
                <Row>
                  <Column width={25}>
                    <DataList
                      data={data}
                      pageData={{
                        current: currentPage,
                        last: lastPage
                      }}
                      primaryProperty={primaryProperty}
                      selected={selectedId}
                      onPageChange={changePage}
                      onSelect={(id) => {
                        editEntry(id);
                        selectItem(id);
                      }}
                    />
                  </Column>
                  <Column width={75}>
                    {Editor && (
                      <React.Fragment>
                        <Editor
                          errors={errors}
                          onUpdate={updateEditedData}
                          data={editedData}
                        />
                        <Column width={100}>
                          <Button onClick={saveEntry}>Save</Button>
                          <Button onClick={() => setMode('view')}>
                            Cancel
                          </Button>
                          <Button onClick={() => onDelete()} type='danger'>
                            Delete
                          </Button>
                        </Column>
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
