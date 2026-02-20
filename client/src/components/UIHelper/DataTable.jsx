import React from 'react';
import Table from './Table';

const DataTable = ({ 
  columns, 
  data, 
  onRowClick,
  rowClassName = '',
  cellClassName = '',
  headerClassName = ''
}) => {
  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <Table.Header>
        {columns.map((column) => (
          <Table.Head
            key={column.key}
            className={headerClassName}
          >
            {column.header}
          </Table.Head>
        ))}
      </Table.Header>

      <Table.Body>
        {data.map((row, rowIndex) => (
          <Table.Row
            key={rowIndex}
            className={rowClassName}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((column) => (
              <Table.Cell
                key={column.key}
                className={cellClassName}
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
