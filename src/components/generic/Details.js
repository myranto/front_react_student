import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCarousel,
  CCarouselItem,
  CCol,
  CImage,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import SearchableDatatable from './SearchableDatatable'
import { useNavigate } from 'react-router-dom'
import { InputLabel } from '@mui/material'

const Details = ({ title, properties, data, deletable }) => {
  const navigate = useNavigate()
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <h4 className="card-title">{title}</h4>
          </CRow>
          {properties.map((property) => (
            <>
              <CRow key={property.label}>
                <CCol sm={12}>
                  <p className="card-text">
                    <strong>{property.label} :</strong>
                  </p>
                  {property.type === 'image' && (
                    <CRow>
                      <CCol sm={{ span: 6, offset: 3 }}>
                        <CCarousel controls indicators>
                          {Array.isArray(property.selector(data)) &&
                            property.selector(data).map((image, index) => (
                              <CCarouselItem key={image}>
                                <CImage className={'d-block w-100 h-50'} src={image} alt={index} />
                              </CCarouselItem>
                            ))}
                        </CCarousel>
                      </CCol>
                    </CRow>
                  )}
                  {property.type === 'table' && (
                    <CRow>
                      <SearchableDatatable
                        data={property.selector(data)}
                        columns={property.columns}
                      />
                    </CRow>
                  )}
                  {property.type === 'text' && property.selector(data)}
                </CCol>
              </CRow>
            </>
          ))}     
        <CRow>
          <CCol sm={12}>
            <CButton color={'primary'} onClick={() => navigate('modify')}>
              Modifier
            </CButton>
            {deletable && <CButton color={'warning'}>Supprimer</CButton>}
            {data.auctionState.id==2 && data.appUser.id != localStorage.getItem('id') &&<CButton color={'primary'} onClick={() => navigate('/encherir/'+data.id)}>
              Encherir
            </CButton>}
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
    </>
  )
}

Details.propTypes = {
  title: PropTypes.string,
  properties: PropTypes.array,
  data: PropTypes.object,
  deletable: PropTypes.bool,
}

export default Details
