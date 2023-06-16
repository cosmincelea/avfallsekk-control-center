import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  Card, CardBody, CardTitleWrap, CardTitleGreen,
} from '@/shared/components/Card';
import styled from 'styled-components';
import { colorAccent } from '@/utils/palette';
import { FormContainer } from '@/shared/components/form/FormElements';
import ReactTableBase from '@/shared/components/table/ReactTableBase';
import ReactTableCustomizer from '@/shared/components/table/components/ReactTableCustomizer';
import { Button } from '@/shared/components/Button';
import { fetchZipZones } from '../../../redux/actions/directusActions';

const reorder = (rows, startIndex, endIndex) => {
  const result = Array.from(rows);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ApiTable = () => {
  const dispatch = useDispatch();
  const zip_zones_results = useSelector(state => state.zip_zones);
  const isFetching = useSelector(state => state.zip_zones.isFetching);


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

  // const updateDraggableData = (result) => {
  //   const items = reorder(
  //     rows,
  //     result.source.index,
  //     result.destination.index,
  //   );
  //   setData(items);
  // };

  const onFetch = () => {
    dispatch(fetchZipZones());
    // dispatch(fetchOrders());
  };

  // const updateEditableData = (rowIndex, columnId, value) => {
  //   setData(old => old.map((item, index) => {
  //     if (index === rowIndex) {
  //       return {
  //         ...old[rowIndex],
  //         [columnId]: value,
  //       };
  //     }
  //     return item;
  //   }));
  // };

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
      accessor: 'henting_address',
      Header: 'Henteadresse',
    }, {
      accessor: 'henting_dato',
      Header: 'Hentedato',
    },
    {
      accessor: 'billing.first_name',
      Header: 'First Name',
    }, {
      accessor: 'billing.last_name',
      Header: 'Last Name',
    }, {
      accessor: 'customer_note',
      Header: 'Customer Note',
    }, {
      accessor: 'total',
      Header: 'Order Total',
    },
    {
      accessor: 'standard_sekk',
      Header: 'Standard sekk QTY',
    },
    {
      accessor: 'stor_sekk',
      Header: 'Stor sekk QTY',
    },

  ];




  useEffect(() => {
    dispatch(fetchZipZones());
  }, [dispatch]);

  if (zip_zones_results == undefined) { return <h1>Loading</h1> }
  var returnComponent = []


  zip_zones_results.zip_zones.forEach(element => {
    if (element.orders.length !== 0) {
      returnComponent.push(<Container key={element.range_id}>
        <Row>
          <Col md={12} lg={12} xl={12}>
            <Card height='auto'>
              <CardBody height='auto'>
                <HeaderWrap>
                  <CardTitleWrap>
                    <CardTitleGreen>{element.range_name}</CardTitleGreen>
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


                {element.orders && !isFetching && (
                  <ReactTableBase
                    key={withSearchEngine || isResizable || isEditable ? 'modified' : 'common'}
                    columns={tableHeaders}
                    data={element.orders}
                    // updateEditableData={updateEditableData}
                    // updateDraggableData={updateDraggableData}
                    tableConfig={tableConfig}
                  />
                )}


              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>)
    }
  });



  return returnComponent
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
