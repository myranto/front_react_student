import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilLockLocked, cilUser} from "@coreui/icons";
import React, {useState} from "react";
import {createPomodoro} from "../../../database/Api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const ModifyDefaultPomodoro = ()=>{
  const [duree,setDuree] = useState(25);
  const [pause,setPause] = useState(5);
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const submit = ()=>{
    createPomodoro(duree,pause).then(async r => {
      const swalData = {
        icon: 'success',
        title: 'modification reussi',
        timer: 1000,
        showConfirmButton: false,
      }
      localStorage.setItem('time', duree)
      await swal.fire(swalData).then(()=>navigate("/pomodoro"))
      // pomodoro
      window.location.reload();
    })
      .catch(async error => {
        const swalData = {
          icon: 'error',
          title: 'modification error',
          timer: 1000,
          showConfirmButton: false,
        }
        await swal.fire(swalData).then()
      });
  }
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <div className="container-fluid ">
          <CRow className="justify-content-center">
            <CCol md={4}>
              <CCardGroup>
                <CCard className="p-3">
                  <CCardBody>
                    <CForm>
                      <h1>valeur par defaut pomodoro</h1>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          duree
                        </CInputGroupText>
                        <CFormInput
                          type={"number"}
                          value={duree}
                          min={10}
                          onChange={(e) =>
                            setDuree(e.target.value)
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          pause
                        </CInputGroupText>
                        <CFormInput
                          type={"number"}
                          min={1}
                          value={pause}
                          onChange={(e) =>  setPause(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol>
                          <CButton  className="btn btn-primary" onClick={submit}>
                            valider
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}
export default ModifyDefaultPomodoro;
