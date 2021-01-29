import React, { FC, useEffect } from 'react';
import DataTable from '../components/DataTable/DataTable';
import Header from '../components/Header';
import { connect } from 'react-redux';
import Container from '../components/Responsive/Container';
import stateRegister from '../register/stateRegister';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import { ListPageProps, MakeListPageParams } from './types/makeListPage';

const useStyles = makeStyles((theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    dataTable: {
      marginBottom: theme.spacing(5)
    }
  };
});

export default function makeListPage({
  columns,
  entity
}: MakeListPageParams): FC<ListPageProps> {
  const Component: FC<ListPageProps> = ({
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
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const changePage = (page: number) => {
      selectPage(page);
    };

    const newEntry = () => {
      history.push(stateRegister.getEditUrl(entity, 'new'));
    };

    return (
      <div>
        <Header loading={status !== 'idle'}>
          {stateRegister.getOption(entity, 'header')}
        </Header>
        {status !== 'loading' && (
          <React.Fragment>
            <Container>
              <DataTable
                className={classes.dataTable}
                pageData={{
                  current: currentPage,
                  last: lastPage
                }}
                data={data}
                columns={columns}
                onPageChange={changePage}
                onSelect={(id: number) => {
                  selectItem(id);
                  history.push(stateRegister.getEditUrl(entity, id));
                }}
                selected={selectedId}
                totalItems={totalItems}
              />
              <Fab
                className={classes.fab}
                color='primary'
                aria-label='New'
                onClick={newEntry}
              >
                <AddIcon />
              </Fab>
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
