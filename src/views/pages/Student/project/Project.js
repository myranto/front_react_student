import React, {useEffect, useState} from "react";
import {CreateProject, getAllproject, register} from "../../../../database/Api";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import List from "../../../../components/generic/List";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilAvTimer, cilBirthdayCake, cilLockLocked, cilText, cilUser} from "@coreui/icons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {HeaderStudent} from "../../../../components/student/HeaderStudent";

 const Project = () => {
  const [project,setProject] = useState();
  const [nom,setNom] = useState('');
  const [debut,setDebut] = useState('');
  const [description,setDescription] = useState('');
  const [fin,setFin] = useState('');

const idEtudiant = sessionStorage.getItem("idEtudiant");
  const swal = withReactContent(Swal)

  useEffect(() => {
    getAllproject(idEtudiant)
      .then((data) => {
        console.log(data)
        setProject(data)
      })
      .catch((error) => {
        // console.log("cuo")
        console.log(error)
      })
  }, []);
  const handleSubmit = ()=>{
      if (nom !=='' && debut!=='' && description!=='' && fin!== ''){
        const json = {
          "etudiantidEtudiant":idEtudiant,
          "nomProjet":nom,
          "dateDebut":debut,
          "descriptionProjet":description,
          "dateFin":fin
        }
        CreateProject(json)
          .then(async () => {
            const swalData = {
              icon: 'success',
              title: 'creation reussi',
              timer: 1000,
              showConfirmButton: false,
            }
            await swal.fire(swalData).then()
            window.location.reload();
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
      }else{
        const swalData = {
          icon: 'error',
          title: 'Une erreur est survenu',
          text: 'error:champs vide',
        }
        swal.fire(swalData).then()
      }

  }

  // NomProjet
  // DateDebut
  // DescriptionProjet
  // DateFin

  const column = [
    {
      name: 'ID',
      selector: (row) => row.idProjet,
      sortable: true,
    },
    {
      name: 'etudiant',
      selector: (row) => row.etudiant.prenom
      ,
      sortable: true,
    },
    {
      name: 'Titre',
      selector: (row) => row.nomProjet,
      sortable: true,
    },
    {
      name: 'Date de début',
      selector: (row) => format(new Date(row.dateDebut), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      sortable: true,
    },
    {
      name: 'Date de fin',
      selector: (row) =>format(new Date(row.dateFin), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      sortable: true,
    },
  ]
  return (
      <>
        <div className="bg-light min-vh-100  d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={6}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm>
                     <center> <h1>Projet</h1>
                      <p className="text-medium-emphasis">Create new project</p></center>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilText} />
                        </CInputGroupText>
                        <CFormInput value={nom} onChange={(e)=>{setNom(e.target.value)}} placeholder="project name" autoComplete="nom" required/>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                        <CFormInput value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="description" autoComplete="project description" required/>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilAvTimer} />
                        </CInputGroupText>
                        <CFormInput type="datetime-local" value={debut} onChange={(e)=>{setDebut(e.target.value)}} required/>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText><CIcon icon={cilAvTimer} /></CInputGroupText>
                        <CFormInput type={"datetime-local"} value={fin} onChange={(e)=>{setFin(e.target.value)}} required/>
                      </CInputGroup>

                      <div className="d-grid">
                       <center> <CButton onClick={handleSubmit} className={"w-25"} color="success">create</CButton></center>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <br/>
            <div >
                <List
                  title={'Liste des project'}
                  columns={column}
                  selectable={false}
                  data={project}
                  linkFunction={(row) => `/project/${row.idProjet}/${row.nomProjet}/${row.estimationProject}/${row.tempPasser}/${row.tachesTermineesPourcentage}`}
                />

            </div>
          </CContainer>
        </div>

      </>
    );
}

export default Project;
