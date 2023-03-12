import React from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import EditableGallery from './EditableGallery'
import SearchableDatatable from './SearchableDatatable'
import DataTable from 'react-data-table-component'
const Form = ({
  data,
  properties,
  submit,
  multiple,
  multipleData,
  add,
  multipleSelectionHandler,
  contextActions,
}) => {
  const basicInputs = [
    'text',
    'number',
    'email',
    'password',
    'date',
    'time',
    'datetime-local',
    'month',
    'week',
  ]
  let columns = []
  if (multiple) {
    columns = properties.map((property) => {
      return {
        name: property.label,
        selector: property.selector,
        sortable: true,
      }
    })
  }
  return (
    <CCard>
      <CCardBody>
        {properties.map((propety) => (
          <div className={'row mb-2'} key={propety.id}>
            <div className={'col-12'}>
              {basicInputs.find((input) => {
                return input === propety.type
              }) !== undefined && (
                <TextField
                  variant={'standard'}
                  type={propety.type}
                  defaultValue={propety.selector(data)}
                  name={propety.name}
                  label={propety.label}
                  fullWidth
                  onChange={(e) => propety.change(e)}
                />
              )}
              {propety.type === 'textArea' && (
                <TextField
                  variant={'standard'}
                  label={propety.label}
                  defaultValue={propety.selector(data)}
                  multiline
                  maxRows={4}
                  fullWidth
                  onChange={propety.change}
                />
              )}
              {propety.type === 'select' && (
                <FormControl variant={'standard'} fullWidth>
                  <InputLabel id={propety.label}>{propety.label}</InputLabel>
                  <Select
                    labelId={propety.label}
                    defaultValue={propety.selector(data)}
                    variant={'standard'}
                    onChange={propety.change}
                  >
                    {propety.options.map((option) => (
                      <MenuItem value={option.value} key={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {propety.type === 'disabled' && (
                <>
                  <CFormLabel>{propety.label}</CFormLabel>
                  <p>{propety.selector(data)}</p>
                </>
              )}
              {propety.type === 'image-gallery' && (
                <>
                  <CFormLabel>{propety.label}</CFormLabel>
                  <EditableGallery links={propety.selector(data)} changeLinks={propety.change} />
                </>
              )}
            </div>
          </div>
        ))}
        <CRow>
          <CCol sm={12}>
            <CButton color={'primary'} onClick={multiple ? add : submit}>
              {multiple ? 'Ajouter' : 'Enregistrer'}
            </CButton>
          </CCol>
        </CRow>
        {multiple && (
          <>
            <SearchableDatatable
              title={'Catégories à enregistrer'}
              data={multipleData}
              columns={columns}
              selectable
              handleRowSelection={multipleSelectionHandler}
              contextActions={contextActions}
            />
            <CButton color={'primary'} onClick={submit}>
              Enregistrer
            </CButton>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}
Form.propTypes = {
  data: PropTypes.object,
  properties: PropTypes.array,
  submit: PropTypes.func,
  add: PropTypes.func,
  delete: PropTypes.func,
  multiple: PropTypes.bool,
  multipleData: PropTypes.array,
  multipleSelectionHandler: PropTypes.func,
  contextActions: PropTypes.object,
}

export default Form
