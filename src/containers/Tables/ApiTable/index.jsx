import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';
import styled from 'styled-components';
import { colorAccent } from '@/utils/palette';
import { FormContainer } from '@/shared/components/form/FormElements';
import { fetchOrders } from '../../../redux/actions/woocommerceActions';
import ReactTableBase from '@/shared/components/table/ReactTableBase';
import ReactTableCustomizer from '@/shared/components/table/components/ReactTableCustomizer';
import { Button } from '@/shared/components/Button';

const reorder = (rows, startIndex, endIndex) => {
  const result = Array.from(rows);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ApiTable = () => {
  const dispatch = useDispatch();
  const results = useSelector(state => state.orders);
  const [rows, setData] = useState(results.orders);

  const isFetching = useSelector(state => state.orders.isFetching);

  const [isEditable, setIsEditable] = useState(true);
  const [isResizable, setIsResizable] = useState(false);
  const [isSortable, setIsSortable] = useState(true);
  const [isDisabledDragAndDrop, setIsDisabledDragAndDrop] = useState(false);
  const [isDisabledEditable, setIsDisabledEditable] = useState(false);
  const [isDisabledResizable, setIsDisabledResizable] = useState(false);
  const [withDragAndDrop, setWithDragAndDrop] = useState(true);
  const [withPagination, setWithPaginationTable] = useState(false);
  const [withSearchEngine, setWithSearchEngine] = useState(true);

  const handleClickIsEditable = () => {
    if (!withDragAndDrop) setIsDisabledResizable(!isDisabledResizable);
    setIsResizable(false);
    setIsEditable(!isEditable);
  };
  const handleClickIsResizable = () => {
    // setIsEditable(false);
    // setWithDragAndDrop(false);
    // setIsDisabledDragAndDrop(!isDisabledDragAndDrop);
    // setIsDisabledEditable(!isDisabledEditable);
    // setIsResizable(!isResizable);
  };
  const handleClickIsSortable = () => {
    setIsSortable(!isSortable);
  };
  const handleClickWithDragAndDrop = () => {
    if (!isEditable) setIsDisabledResizable(!isDisabledResizable);
    setIsResizable(false);
    setWithDragAndDrop(!withDragAndDrop);
  };
  const handleClickWithPagination = () => {
    setWithPaginationTable(!withPagination);
  };
  const handleClickWithSearchEngine = () => {
    setWithSearchEngine(!withSearchEngine);
  };

  const updateDraggableData = (result) => {
    const items = reorder(
      rows,
      result.source.index,
      result.destination.index,
    );
    setData(items);
  };

  const onFetch = () => {
    dispatch(fetchOrders());
  };

  const updateEditableData = (rowIndex, columnId, value) => {
    setData(old => old.map((item, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        };
      }
      return item;
    }));
  };

  const tableConfig = {
    isEditable,
    isResizable,
    isSortable,
    withDragAndDrop,
    withPagination,
    withSearchEngine,
    manualPageSize: [10, 20, 30, 40],
    placeholder: 'Search',
  };

  let tableHeaders = [
    {
      accessor: 'id',
      Header: 'Order Id',
    }, {
      accessor: 'total',
      Header: 'Order Total',
    }, {
      accessor: 'status',
      Header: 'Order Status',
    }, {
      accessor: 'billing.first_name',
      Header: 'First Name',
    },
    {
      accessor: 'billing.last_name',
      Header: 'Last Name',
    },
    {
      accessor: 'customer_note',
      Header: 'Customer Note',
    }, {
      accessor: 'order_comments',
      Header: 'Order Comments',
    }, {
      accessor: 'henting_address',
      Header: 'Henteadresse',
    },

  ];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  useEffect(() => {
    const data = results.orders
    data.forEach(function (element) {
      element.henting_address = element.meta_data.filter(function (el) {
        console.log(el.key)
        return el.key == '_henting_address'
      }).value;
    });

    setData(data)
  }, [results]);

  return (
    <Container>
      <Row>
        <Col md={12} lg={12} xl={12}>
          <Card height='auto'>
            <CardBody height='auto'>
              <HeaderWrap>
                <CardTitleWrap>
                  <CardTitle>Orders</CardTitle>
                </CardTitleWrap>
                <ReactTableCustomizer
                  handleClickIsEditable={handleClickIsEditable}
                  handleClickIsResizable={handleClickIsResizable}
                  handleClickIsSortable={handleClickIsSortable}
                  handleClickWithDragAndDrop={handleClickWithDragAndDrop}
                  handleClickWithPagination={handleClickWithPagination}
                  handleClickWithSearchEngine={handleClickWithSearchEngine}
                  isEditable={isEditable}
                  isResizable={isResizable}
                  isSortable={isSortable}
                  isDisabledDragAndDrop={isDisabledDragAndDrop}
                  isDisabledEditable={isDisabledEditable}
                  isDisabledResizable={isDisabledResizable}
                  withDragAndDrop={withDragAndDrop}
                  withPagination={withPagination}
                  withSearchEngine={withSearchEngine}
                  fullCustomizer
                />
                <Button variant="secondary" onClick={onFetch}>Fetch</Button>
              </HeaderWrap>
              {isFetching && (
                <div className="text-center">
                  <TableSpinner animation="border" />
                </div>
              )}


              {rows && !isFetching && (
                <ReactTableBase
                  key={withSearchEngine || isResizable || isEditable ? 'modified' : 'common'}
                  columns={tableHeaders}
                  data={rows}
                  updateEditableData={updateEditableData}
                  updateDraggableData={updateDraggableData}
                  tableConfig={tableConfig}
                />
              )}


            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApiTable;

// region STYLES

const TableSpinner = styled(Spinner)`
  color: ${colorAccent};
`;

const SearchWrap = styled(FormContainer)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  
  input {
    margin-right: 10px;
  }
  
  button {
    margin: 0;
    height: 32px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  
  & > div:first-child {
    margin-right: auto;
  }
`;

// endregion
