import React, { useEffect } from 'react';
import DataTable from '../components/DataTable/DataTable';
import Header from '../components/Header';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Container from '../components/Responsive/Container';
import Row from '../components/Responsive/Row';
import Button from '@material-ui/core/Button';
import stateRegister from '../register/stateRegister';
import { useHistory } from 'react-router-dom';

export default function makeListPage({ columns, entity }) {
  const Component = ({
    data,
    status,
    lastPage,
    currentPage,
    totalItems,
    fetchData,
    selectPage,
    selectItem,
    selectedId
  }) => {
    const history = useHistory();

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const changePage = (page) => {
      selectPage(page);
    };

    const newEntry = () => {
      history.push(stateRegister.getEditUrl(entity, 'new'));
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
              <DataTable
                pageData={{
                  current: currentPage,
                  last: lastPage
                }}
                data={data}
                columns={columns}
                onPageChange={changePage}
                onSelect={(id) => {
                  selectItem(id);
                  history.push(stateRegister.getEditUrl(entity, id));
                }}
                selected={selectedId}
                totalItems={totalItems}
              />
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
