import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ReactTableBase from '@/shared/components/table/ReactTableBase';
import ReactTableCustomizer from '@/shared/components/table/components/ReactTableCustomizer';
import {
  Card, CardBody, CardTitleWrap, CardTitle, CardSubhead,
} from '@/shared/components/Card';
import styled from 'styled-components';

const reorder = (rows, startIndex, endIndex) => {
  const result = Array.from(rows);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DataReactTable = ({ reactTableData }) => {
  const [rows, setData] = useState(reactTableData.tableRowsData);

  console.log()
  const [isEditable, setIsEditable] = useState(false);
  const [isResizable, setIsResizable] = useState(false);
  const [isSortable, setIsSortable] = useState(false);
  const [isDisabledDragAndDrop, setIsDisabledDragAndDrop] = useState(false);
  const [isDisabledEditable, setIsDisabledEditable] = useState(false);
  const [isDisabledResizable, setIsDisabledResizable] = useState(false);
  const [withDragAndDrop, setWithDragAndDrop] = useState(false);
  const [withPagination, setWithPaginationTable] = useState(false);
  const [withSearchEngine, setWithSearchEngine] = useState(true);
  console.log(isEditable)
  const handleClickIsEditable = () => {
    if (!withDragAndDrop) setIsDisabledResizable(!isDisabledResizable);
    setIsResizable(false);
    setIsEditable(!isEditable);
  };
  const handleClickIsResizable = () => {
    setIsEditable(false);
    setWithDragAndDrop(false);
    setIsDisabledDragAndDrop(!isDisabledDragAndDrop);
    setIsDisabledEditable(!isDisabledEditable);
    setIsResizable(!isResizable);
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
    placeholder: 'Search by First name...',
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <HeaderWrap>
            <CardTitleWrap>
              <CardTitle>data react-table</CardTitle>
              <CardSubhead>
                Use table with&nbsp;
                <span className="red-text">table customizer</span>
              </CardSubhead>
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
          </HeaderWrap>
          <ReactTableBase
            key={withSearchEngine || isResizable || isEditable ? 'modified' : 'common'}
            columns={reactTableData.tableHeaderData}
            data={rows}
            updateEditableData={updateEditableData}
            updateDraggableData={updateDraggableData}
            tableConfig={tableConfig}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

DataReactTable.propTypes = {
  reactTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
    })),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
    defaultTableHeaderData: PropTypes.arrayOf(PropTypes.shape()),
    defaultTableRowData: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default DataReactTable;

// region STYLES

const HeaderWrap = styled.div`
  display: flex;
  
  & > div:first-child {
    margin-right: auto;
  }
`;

// endregion
