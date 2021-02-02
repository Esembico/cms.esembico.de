import React, { MouseEvent } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import getDisplayValue from '../../helpers/getDisplayValue';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import { DataTableProps } from '../types/components';
import { Data } from '../../redux/helpers/types/state';

const usePaginationStyle = makeStyles((theme) => {
  return {
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  };
});

function TablePaginationActions({
  onChangePage,
  count,
  page,
  rowsPerPage
}: TablePaginationActionsProps) {
  const classes = usePaginationStyle();
  const theme = useTheme();
  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 1);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 2);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function DataTable({
  data,
  columns,
  pageData,
  totalItems,
  onPageChange,
  onSelect,
  selected,
  className
}: DataTableProps): JSX.Element {
  return (
    <React.Fragment>
      <TableContainer>
        <Table className={className}>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell key={column.header}>{column.header}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry: Data) => {
              return (
                <TableRow
                  onClick={() => onSelect(entry.id)}
                  selected={entry.id === selected}
                  hover
                  key={entry.id}
                >
                  {columns.map((column) => {
                    const display = getDisplayValue(entry, column.display);
                    return (
                      <TableCell key={`${column.header}-${entry.id}`}>
                        {typeof display === 'object'
                          ? display
                          : display.toString()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          {totalItems ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={columns.length}
                  count={totalItems}
                  rowsPerPage={parseInt(
                    process.env.REACT_APP_ROWS_PER_PAGE ?? '50'
                  )}
                  page={pageData.current - 1}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true
                  }}
                  onChangePage={(
                    e: MouseEvent<HTMLButtonElement> | null,
                    page: number
                  ) => onPageChange(page)}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
