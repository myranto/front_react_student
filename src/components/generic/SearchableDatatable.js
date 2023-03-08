import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormInput, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
const SearchableDatatable = ({
  data,
  columns,
  title,
  selectable,
  linkFunction,
  handleRowSelection,
  contextActions,
  selectableRowDisabled,
  clearRow,
}) => {
  const [filteredData, setFiltered] = useState()
  const filterBar = React.useMemo(() => {
    const filterData = (text) => {
      const filtered = data.filter((entry) => {
        if (text === '') return true
        for (const column of columns) {
          const target = column.selector(entry).toString()
          if (target.match(new RegExp(text, 'i')) !== null) {
            return true
          }
        }
        return false
      })
      setFiltered(filtered)
    }

    return (
      <CCol sm={3} lg={2}>
        <CFormInput
          size="sm"
          type="text"
          placeholder="Rechercher..."
          onChange={(e) => filterData(e.target.value)}
        />
      </CCol>
    )
  }, [data])
  const navigate = useNavigate()
  useEffect(() => {
    setFiltered(data)
  }, [data])
  return (
    <CRow>
      <DataTable
        title={title}
        columns={columns}
        data={filteredData}
        selectableRows={selectable}
        onSelectedRowsChange={handleRowSelection}
        selectableRowDisabled={
          selectableRowDisabled !== undefined ? selectableRowDisabled : () => false
        }
        pagination
        subHeader
        contextActions={contextActions}
        subHeaderComponent={filterBar}
        className={linkFunction ? 'clickable' : ''}
        onRowClicked={(row) => {
          if (linkFunction) navigate(linkFunction(row))
        }}
        clearSelectedRows={clearRow}
      />
    </CRow>
  )
}

SearchableDatatable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string,
  selectable: PropTypes.bool,
  linkFunction: PropTypes.func,
  handleRowSelection: PropTypes.func,
  contextActions: PropTypes.object,
  selectableRowDisabled: PropTypes.func,
  clearRow: PropTypes.bool,
}

export default SearchableDatatable
