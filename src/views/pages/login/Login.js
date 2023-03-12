import React, {useEffect, useState} from "react";
import './stylelogin.css'
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
import {lastPomodoro, login} from '../../../database/Api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const Login = () => {
  const [user, setUser] = useState({ nom: 'my.@gmail.com', motdepasse: 'mmm', email: 'my.@gmail.com' })
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const center = {
    "margin-left":"32%"
  }
  const [dure, setDure] = useState(null);
  const [pause, setPause] = useState(null);
  useEffect(() => {
    lastPomodoro()
      .then((data) => {
        console.log(data)
        setDure(data.durree)
        setPause(data.pause)
      })
      .catch((error) => {
        // console.log("cuo")
        console.log(error)
      })
  }, []);
  const linkRegister =  process.env.PUBLIC_URL+'/register';
  const submit = () => {
    login(user)
      .then((data) => {
        // console.log(data)
        // localStorage.setItem('appUser-token', data.value)
        sessionStorage.setItem('idEtudiant', data.idEtudiant)
        localStorage.setItem('time', dure)
        const swalData = {
          icon: 'success',
          title: 'Connexion réussie',
          timer: 1000,
          showConfirmButton: false,
        }
        swal.fire(swalData).then(() => {
          window.location.replace('/project')
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
    <div className="main">
    <div className="container">

      <div className="loginbox">
        <p className="titre">Connexion</p>
        <div className="mail"><span><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 119.45 122.88"><title>email-address</title><path
          d="M0,58.68V53.56L39.82,88.38.52,119.18A6.14,6.14,0,0,1,0,116.71v-58Zm82-6a24,24,0,0,1-1,6.19,15.32,15.32,0,0,1-2.48,4.85,10.89,10.89,0,0,1-3.83,3.18A11.09,11.09,0,0,1,69.83,68a8.69,8.69,0,0,1-2.13-.25A7.6,7.6,0,0,1,65.79,67a6.7,6.7,0,0,1-1.58-1.21,6.8,6.8,0,0,1-.69-.82,8.54,8.54,0,0,1-6.69,2.92,8,8,0,0,1-2.52-.39,7.53,7.53,0,0,1-2.19-1.19l0,0a7.89,7.89,0,0,1-1.71-1.88,10.11,10.11,0,0,1-1.19-2.52v0a15.7,15.7,0,0,1-.55-6.27v0a23.36,23.36,0,0,1,1.46-5.95,16.59,16.59,0,0,1,2.83-4.71,12.06,12.06,0,0,1,4-3.09,11.11,11.11,0,0,1,4.79-1,14.3,14.3,0,0,1,3.67.45,11.15,11.15,0,0,1,3.17,1.39l1.63,1.09a.65.65,0,0,1,.28.59L69.11,59.36a3.29,3.29,0,0,0,.29,2.22,1.75,1.75,0,0,0,1.54.61,2.63,2.63,0,0,0,1.61-.56A5.63,5.63,0,0,0,74,59.74a12,12,0,0,0,1.09-3,20.78,20.78,0,0,0,.47-3.83,24.13,24.13,0,0,0-.65-7.4,13.59,13.59,0,0,0-2.76-5.39,11.76,11.76,0,0,0-4.67-3.32A17.51,17.51,0,0,0,61,35.68a16.06,16.06,0,0,0-4.45.6,14.57,14.57,0,0,0-3.91,1.79A15.31,15.31,0,0,0,49.32,41a18.56,18.56,0,0,0-2.54,3.93,24,24,0,0,0-1.69,4.76,29.77,29.77,0,0,0-.74,5.42h0A25.78,25.78,0,0,0,45,62.81a14,14,0,0,0,2.77,5.57,11.75,11.75,0,0,0,4.76,3.38,18.42,18.42,0,0,0,6.77,1.15,19.82,19.82,0,0,0,2.16-.12c.74-.08,1.51-.21,2.28-.37s1.48-.33,2.12-.52a15.05,15.05,0,0,0,1.7-.61.64.64,0,0,1,.84.34.55.55,0,0,1,0,.17L69.41,76a.67.67,0,0,1-.28.68,10.53,10.53,0,0,1-2,1,17.2,17.2,0,0,1-2.47.76,23.7,23.7,0,0,1-2.73.49,23.18,23.18,0,0,1-2.75.16,24.74,24.74,0,0,1-12.17-2.77,16.89,16.89,0,0,1-4.39-3.45,18.16,18.16,0,0,1-3.09-4.79l0,0a24,24,0,0,1-1.73-5.95A35.46,35.46,0,0,1,37.41,55a32.6,32.6,0,0,1,1-6.86,28,28,0,0,1,2.36-6.12A23.13,23.13,0,0,1,44.37,37a21.6,21.6,0,0,1,4.74-3.82,22.27,22.27,0,0,1,5.65-2.37A24.52,24.52,0,0,1,61.07,30a22.8,22.8,0,0,1,11.5,2.77,17.53,17.53,0,0,1,4.28,3.4,18.32,18.32,0,0,1,3,4.59,22.32,22.32,0,0,1,1.76,5.6A28.62,28.62,0,0,1,82,52.71Zm-25.7,3a15.3,15.3,0,0,0,0,2.79,5.85,5.85,0,0,0,.48,1.9,2.42,2.42,0,0,0,.83,1,2.13,2.13,0,0,0,1.19.32,2.1,2.1,0,0,0,.89-.2,3.08,3.08,0,0,0,.87-.67,5.64,5.64,0,0,0,.83-1.17,10.13,10.13,0,0,0,.69-1.58l1-11-.17,0a5.62,5.62,0,0,0-.74,0,5,5,0,0,0-2.25.49A4.51,4.51,0,0,0,58.27,49a9.45,9.45,0,0,0-1.2,2.7,23.81,23.81,0,0,0-.73,4ZM.15,43.47C1,40.14,5.72,38,8.34,36.14V21.85a6,6,0,0,1,6-6H36.81L58.26.57A3.24,3.24,0,0,1,62,.59L83.08,15.85h22a6,6,0,0,1,6,6V36.1c2.82,2,8.34,4.72,8.34,8.49v.15L105.11,56.83v-35H14.34v34L.15,43.47Zm119.3,11.31v61.93a6.12,6.12,0,0,1-1.42,3.93L78.34,89.43l41.11-34.65Zm-11,68.1H8.26L45.71,93.53l11.15,9.75a3.83,3.83,0,0,0,5.15-.09L72.33,94.5l36.09,28.38Z"/></svg></span><input
          type="text" name="email" id=""  value={user.email}
          onChange={(e) =>
            setUser({ ...user, nom: e.target.value, email: e.target.value })
          } className="email" placeholder="email" /></div>
        <div className="mdp"><span><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 95.17 122.88"><defs><style>.cls-1{"fill-rule:evenodd"}</style></defs><title>confirm-password</title><path
          className="cls-1"
          d="M6.37,47.11H8.53V40.48A41.15,41.15,0,0,1,19.92,12a37.93,37.93,0,0,1,55.33,0,41.16,41.16,0,0,1,11.4,28.5v6.63H88.8a6.39,6.39,0,0,1,6.37,6.37v63a6.39,6.39,0,0,1-6.37,6.37H6.37A6.39,6.39,0,0,1,0,116.51v-63a6.39,6.39,0,0,1,6.37-6.37Zm14.22,0h54V40.48a29.07,29.07,0,0,0-8-20.16,26,26,0,0,0-38,0,29,29,0,0,0-8,20.16v6.63ZM35.3,77l7,6.53L58.84,66.72c1.47-1.5,2.39-2.69,4.21-.83l5.9,6c1.93,1.92,1.83,3,0,4.83L45.62,99.69c-3.85,3.78-3.19,4-7.08.13L25.37,86.74a1.71,1.71,0,0,1,.16-2.65L32.38,77c1-1.07,1.85-1,2.92,0Z"/></svg></span><input
          type="text" name="mdpass" id="" value={user.motdepasse}
          onChange={(e) => setUser({ ...user, motdepasse: e.target.value })} className="pass" placeholder="mot de passe" /></div>
        <button className="btn" onClick={submit}>Se connecter</button>
        <a className="insc" href={linkRegister}><p className="inscri">Inscrivez-vous!</p></a>
      </div>
      <div className="image"><img  src={process.env.PUBLIC_URL + '/image/imglog.png'} alt="logo" /></div>
    </div>
    </div>
  // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
  //     <div className="container-fluid ">
  //       <CRow className="justify-content-center">
  //         <CCol md={4}>
  //           <CCardGroup>
  //             <CCard className="p-3">
  //               <CCardBody>
  //                 <CForm>
  //                   <h1>Connexion</h1>
  //                   <p className="text-medium-emphasis">Sign In to your account</p>
  //                   <CInputGroup className="mb-3">
  //                     <CInputGroupText>
  //                       <CIcon icon={cilUser} />
  //                     </CInputGroupText>
  //                     <CFormInput
  //                       placeholder="Nom d'utilisateur ou email"
  //                       autoComplete="username"
  //                       value={user.email}
  //                       onChange={(e) =>
  //                         setUser({ ...user, nom: e.target.value, email: e.target.value })
  //                       }
  //                     />
  //                   </CInputGroup>
  //                   <CInputGroup className="mb-4">
  //                     <CInputGroupText>
  //                       <CIcon icon={cilLockLocked} />
  //                     </CInputGroupText>
  //                     <CFormInput
  //                       type="password"
  //                       placeholder="Mot de passe"
  //                       autoComplete="current-password"
  //                       value={user.motdepasse}
  //                       onChange={(e) => setUser({ ...user, motdepasse: e.target.value })}
  //                     />
  //                   </CInputGroup>
  //                   <CRow>
  //                     <CCol>
  //                       <CButton  style={center} className="btn btn-primary" onClick={submit}>
  //                         Se connecter
  //                       </CButton>
  //                     </CCol>
  //                   </CRow>
  //                 </CForm>
  //               </CCardBody>
  //               <a href={linkRegister} className='link-success'><p>Vous n'avez pas encore de compte?</p></a>
  //             </CCard>
  //           </CCardGroup>
  //         </CCol>
  //       </CRow>
  //     </div>
  //   </div>
  )
}

export default Login
