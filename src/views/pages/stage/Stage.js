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
import React, {useEffect, useState} from "react";
import {getNote, getProfilEtudiant, insertProfil} from "../../../database/Api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Stage = () => {
  const idEtudiant = sessionStorage.getItem("idEtudiant");
  const swal = withReactContent(Swal)
  const [form, setForm] = useState({
    idEtudiant:idEtudiant,
    domaine_etude: '',
    profil: '',
    competences: '',
    experience: 0
  });
  useEffect(() => {
    getProfilEtudiant(idEtudiant)
      .then((data) => {
        console.log(data)
        const val = {
          idEtudiant:idEtudiant,
          domaine_etude: data.domaine_etude,
          profil: data.profil,
          competences: data.competences,
          experience: data.experience
        }
        setForm(val);
      })
      .catch((error) => {
        // console.log("cuo")
        console.log(error)
      })
  }, []);
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    insertProfil(form)
      .then(async r => {
        const swalData = {
          icon: 'success',
          title: 'creation reussi',
          timer: 1000,
          showConfirmButton: false,
        }
        await swal.fire(swalData).then()
        window.location.reload();
      })
      .catch(async error => {
        const swalData = {
          icon: 'error',
          title: 'creation echouer',
          timer: 1000,
          showConfirmButton: false,
        }
        await swal.fire(swalData).then()
        window.location.reload();
      });
  };
  return (
    <>
      <div className="bg-light w-100 min-vh-100 d-flex flex-row align-items-center">
        <div className="container">
          <CRow className="justify-content-center">
            <CCol md={4}>
              <CCardGroup>
                <CCard className="p-6">
                  <CCardBody>
                    <CForm>
                      <center>
                      <h1>stage</h1>
                      <p className="text-medium-emphasis">mon profil</p>

                      </center>
                     <label  className="subtitle" htmlFor={"profil"}>profil :</label>
                        <CFormInput
                          id={"profil"}
                          type={"text"}
                          name={"profil"}
                          value={form.profil}
                          onChange={handleChange}
                        />
                          <label htmlFor={"domaine"}>Domaine :</label>
                          <CFormInput
                            id={"domaine"}
                            type={"text"}
                            name={"domaine_etude"}
                            value={form.domaine_etude}
                            onChange={handleChange}
                          />
                      <label htmlFor={"cmp"}>competence :</label>
                      <CFormInput
                        id={"cmp"}
                        type={"text"}
                        name={"competences"}
                        value={form.competences}
                        onChange={handleChange}
                      />
                        <label>
                          experience
                        </label>
                          <CFormInput
                            type={"number"}
                            min={0}
                            name={"experience"}
                            value={form.experience}
                            onChange={handleChange}
                          />
                        <CRow>
                          <CCol>
                           <center> <CButton  onClick={handleSubmit} className={sstyle}>
                              demander
                            </CButton>
                           </center>
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
);
}
const sstyle =
{
  "align-self": "center",
  width:"150px",
  height:"40px",
  margin: "10px",
  "background-color": "#323461",
  "border": "none",
  "border-radius": "3px",
  color: "white"
}

export default Stage;
