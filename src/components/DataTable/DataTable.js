import React from 'react';
import '../../css/DataTable.css';
import getDisplayValue from '../../helpers/getDisplayValue';
import Pagination from '../Pagination';

export default function DataTable({
  data,
  columns,
  pageData,
  onPageChange,
  onSelect,
  selected
}) {
  return (
    <React.Fragment>
      <div className='data-table-container'>
        <table className='data-table'>
          <thead>
            <tr>
              {columns.map((column) => {
                return <th key={column.header}>{column.header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => {
              return (
                <tr
                  className={selected === entry.id ? 'active' : ''}
                  onClick={() => onSelect(entry.id)}
                  key={entry.id}
                >
                  {columns.map((column) => {
                    return (
                      <td key={`${column.header}-${entry.id}`}>
                        {getDisplayValue(entry, column.display)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        align='right'
        lastPage={pageData.last}
        onPageChange={onPageChange}
        selectedPage={pageData.current}
      ></Pagination>
    </React.Fragment>
  );
}
