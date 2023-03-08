import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../database/Api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const Login = () => {
  const [user, setUser] = useState({ nom: 'Jean.Marie@gmail.com', motdepasse: 'yavok', email: 'yavo@gmail.com' })
  const navigate = useNavigate()
  const swal = withReactContent(Swal)

  const center = {
    "margin-left":"32%"
  }

  const linkRegister =  process.env.PUBLIC_URL+'/register';
  const submit = () => {
    login(user)
      .then((data) => {
        // console.log(data)
        // localStorage.setItem('appUser-token', data.value)
        localStorage.setItem('idEtudiant', data.idEtudiant)
        const swalData = {
          icon: 'success',
          title: 'Connexion réussie',
          timer: 1000,
          showConfirmButton: false,
        }
        swal.fire(swalData).then(() => {
          navigate('/accueil')
        })
      })
      .catch((error) => {
        console.log(error)
        const swalData = {
          icon: 'error',
          title: 'Une erreur est survenue lors de la connexion',
          text: error.response.data.message,
        }
        swal.fire(swalData).then()
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container-fluid ">
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-3">
                <CCardBody>
                  <CForm>
                    <h1>Connexion</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Nom d'utilisateur ou email"
                        autoComplete="username"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, nom: e.target.value, email: e.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        value={user.motdepasse}
                        onChange={(e) => setUser({ ...user, motdepasse: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <CButton  style={center} className="btn btn-primary" onClick={submit}>
                          Se connecter
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                <a href={linkRegister} className='link-success'><p>Vous n'avez pas encore de compte?</p></a>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

export default Login
