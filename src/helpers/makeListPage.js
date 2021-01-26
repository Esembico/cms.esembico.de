import React, { useEffect } from 'react';
import DataTable from '../components/DataTable/DataTable';
import Header from '../components/Header';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Container from '../components/Responsive/Container';
import stateRegister from '../register/stateRegister';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';

// FIXME: Position: sticky is not supported on all browsers
const useStyles = makeStyles((theme) => {
  return {
    fab: {
      position: 'sticky',
      float: 'right',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  };
});

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
    const classes = useStyles();
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
