import React, { useMemo } from 'react';

const CreateOrdersTableData = (orders) => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        Footer: 'Middle age:',
        disableGlobalFilter: true,
        width: 65,
      },
      {
        Header: 'Order Total',
        accessor: 'order_total',
      },
      {
        Header: 'Order Status',
        accessor: 'order_status',
        disableGlobalFilter: true,
      },
      {
        Header: 'ID',
        accessor: 'order_id',
        disableGlobalFilter: true,
      },
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
        disableGlobalFilter: true,
      },
      {
        Header: 'Customer Note',
        accessor: 'customer_note',
        disableGlobalFilter: true,
      }
    ],
    [],
  );


  const data = [];
  // const rows = () => {
  //   for (let i = 1; i < 36; i += 1) {
  //     data.push({
  //       id: i,
  //       first: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
  //       last: ['Morrison', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
  //       user: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
  //       age: Math.min(100, Math.round(Math.random() * 30) + 20),
  //       date: getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
  //       location: ['Melbourne', 'Tokio', 'Moscow', 'Rome'][Math.floor((Math.random() * 4))],
  //       work: ['Nova Soft', 'Dog Shop', 'Aspirity', 'Business Bro', 'Starlight'][Math.floor((Math.random() * 5))],
  //     });
  //   }
  // };

  // const rows2 = () => {
  //   orders.forEach(function (value) {
  //     console.log(value);
  //   }); 
  // };

  //rows2()
  //rows();
  const reactTableData = { tableHeaderData: columns, tableRowsData: data };
  return reactTableData;
};
export default CreateOrdersTableData;