import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
  ChangeStateTache,
  CreateProject,
  CreateTache,
  getSousTacheByTache,
  getTacheByProject
} from "../../../../database/Api";
import List from "../../../../components/generic/List";
import Modal from "react-modal";
import {CButton, CCard, CCardBody, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilAvTimer, cilClosedCaptioning, cilListNumbered, cilText, cilUser} from "@coreui/icons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import SousTache from "./SousTache";
export const style={
  color:"black"
};
export const butt = {
  float:"right"
}
export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',

  }
};
const Taches = () =>{
  const { id,name,estimation,tempPasser,pourcent } = useParams()
  const [taches,setTaches] = useState();
  const [idtache,setIdtache] = useState(null);
  const [nametache,setNametache] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const idEtudiant = sessionStorage.getItem("idEtudiant");

  const [dateplanning,setDateplanning] = useState('');
  const [durree,setDurree] = useState('');
  const [titre,setTitre] = useState('');
  const [priorite,setPriorite] = useState(0);
  const [description,setDescription] = useState('');
  const [rappel,setRappel] = useState(5);
  const swal = withReactContent(Swal)

  useEffect(() => {
    getTacheByProject(id)
      .then((data) => {
        console.log(data)
        setTaches(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);
  // idetudiant |    dateplanning     | durree |   titretache   |                 descriptiontache                 | priorite | rappel | etat | projetidprojet
  const column = [

    {
      name: 'Titre',
      selector: (row) => row.titreTache,
      sortable: true,
    },
    {
      name: 'Description',
      cell: (row) => row.descriptionTache,
      sortable: true,
    },

    {
      name: 'priority',
      selector: (row) => row.priorite,
      sortable: true,
    },
    {
      name: 'début',
      selector: (row) => format(new Date(row.datePlanning), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      sortable: true,
    },
    {
      name: 'etat',
      selector: (row) => (row.etat===0)?'non fini':'fini',
      sortable: true,
    },
  ]
  const [soustaches,setSoustaches] = useState();

  const changeIdTache = (row)=>{
    setNametache(row.titreTache)
    setIdtache(row.idTache);
    getSousTacheByTache(row.idTache)
      .then((data) => {
        console.log(data)
        setSoustaches(data)
      })
      .catch((error) => {
        console.log(error)
      })

  }
  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = (state) => {
    setSelectedRows(state.selectedRows);
  };
  const handleButtonClick = async () => {
    // Récupère la première ligne sélectionnée
    const selectedRow = selectedRows;
    for (let i = 0; i < selectedRow.length; i++) {
      ChangeStateTache(selectedRow[i].idTache, selectedRow[i].etat).then();
    }
    const swalData = {
      icon: 'success',
      title: 'state changed!',
      timer: 1000,
      showConfirmButton: false,
    }
    await swal.fire(swalData).then()
    window.location.reload();
    // Faites quelque chose avec la ligne sélectionnée
  };
  const handleSubmit = ()=>{
    if (dateplanning !=='' && durree!=='' && description!=='' && titre!== ''){
      const json = {
        "idEtudiant":idEtudiant,
        "projetidProjet":id,
        "datePlanning":dateplanning,
        "durree":durree,
        "titreTache":titre,
        "priorite":priorite,
        "descriptionTache":description,
        "rappel":rappel
      }
      CreateTache(json)
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
        text: 'error ',
      }
      swal.fire(swalData).then()
    }

  }
  return(
    <>
      <h1>Project {name}</h1>
      <h4>Temps estimer sur le projet : <strong><FormatedMIn minutes={estimation}  /></strong> min</h4>
      <h4>Temps total passer sur le projet : <strong><FormatedMIn minutes={tempPasser}  /></strong>min </h4>
      <h4>Avancement : <strong>{pourcent}</strong> %</h4>
      <div className="form-group">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
        >
          <button className={"w-25 btn-close btn-danger"} color={"red"} style={style} onClick={() => setModalIsOpen(false)}></button>

            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={9}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm>
                      <h1>{name}</h1>
                      <p className="text-medium-emphasis">Create new Task</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilText} />
                        </CInputGroupText>
                        <CFormInput value={titre} onChange={(e)=>{setTitre(e.target.value)}} placeholder="tache name" autoComplete="nom" required/>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <textarea cols="40" rows="3" className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="description" autoComplete="tache description" required/>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilAvTimer} />
                        </CInputGroupText>
                        <CFormInput type="datetime-local" value={dateplanning} onChange={(e)=>{setDateplanning(e.target.value)}} required/>

                        <CInputGroupText>duree :</CInputGroupText>
                        <CFormInput type={"number"} min={1} value={durree} onChange={(e)=>{setDurree(e.target.value)}} required/>

                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Priorite :</CInputGroupText>
                        <CFormInput type={"number"} min={0} value={priorite} onChange={(e)=>{setPriorite(e.target.value)}} required/>
                        <CInputGroupText>rappel :</CInputGroupText>
                        <CFormInput type={"number"} min={0} value={rappel} onChange={(e)=>{setRappel(e.target.value)}} required/>
                      </CInputGroup>

                      <div className="d-grid">
                        <CButton onClick={handleSubmit} color="success">create</CButton>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
        </Modal>
        <a type={"button"} className="btn btn-outline-info " onClick={()=>setModalIsOpen(true)}>creer tache</a>
        {/*    </div>*/}
      </div>
      <List
        title={'Liste des taches'}
        columns={column}
        selectable={true}
        data={taches}
        handleRowSelection={handleChange}
        // linkFunction={(row) => `/project/${id}/${name}/${row.idTache}/${row.titreTache}`}
        Action={changeIdTache}
      />
      <center><CButton className={"btn w-auto"} color="success" onClick={handleButtonClick}>changer etat tache</CButton></center>
      {(soustaches?.length>0 || soustaches?.length<=0)   && <SousTache soustaches={soustaches} nom={nametache} tacheId={idtache}  />}
    </>
  )
}

const FormatedMIn = ({minutes}) => {
  const hours = Math.floor(minutes / 60); // calcule le nombre d'heures entières
  const minutesRemaining = minutes % 60; // calcule les minutes restantes
  const formattedTime = `${hours.toString().padStart(2, '0')} h et ${minutesRemaining.toString().padStart(2, '0')}`; // formatte le temps en HH:MM
  return(
    <>
      {formattedTime}
    </>
  )
}


export default Taches;


