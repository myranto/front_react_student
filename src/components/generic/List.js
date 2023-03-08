import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CFormInput, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'
import SearchableDatatable from './SearchableDatatable'

const List = ({
  data,
  columns,
  title,
  selectable,
  linkFunction,
  selectableDisableFunction,
  handleRowSelection,
  contextActions,
  clearRow,
}) => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <SearchableDatatable
              title={title}
              columns={columns}
              data={data}
              selectable={selectable}
              selectableRowDisabled={selectableDisableFunction}
              linkFunction={linkFunction}
              contextActions={contextActions}
              handleRowSelection={handleRowSelection}
              clearRow={clearRow}
            />
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

List.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  selectable: PropTypes.bool,
  linkFunction: PropTypes.func,
  selectableDisableFunction: PropTypes.func,
  handleRowSelection: PropTypes.func,
  contextActions: PropTypes.object,
  clearRow: PropTypes.bool,
}
export default List
