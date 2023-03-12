import React, {useEffect, useRef, useState} from "react";
import {
  ChangeStatesSousTache,
  ChangeStateTache, createSousTache, CreateTache,
  getSousTacheByTache,
  getTacheByProject
} from "../../../../database/Api";
// import './styletodo.css';/
import List from "../../../../components/generic/List";
import {CButton, CCard, CCardBody, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow} from "@coreui/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Modal from "react-modal";
import CIcon from "@coreui/icons-react";
import {cilAvTimer, cilText, cilUser} from "@coreui/icons";
import {customStyles, style} from "./Taches";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
const SousTache = ({soustaches,nom,tacheId}) =>{
  // console.log(soustaches)
  const swal = withReactContent(Swal)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedligne, setSelectedligne] = useState([]);

  const [dateplanning,setDateplanning] = useState('');
  const [durree,setDurree] = useState('');
  const [titre,setTitre] = useState('');
  const [priorite,setPriorite] = useState(0);
  const [description,setDescription] = useState('');
  const handleChanges = (state) => {
    setSelectedligne(state.selectedRows);
  };
  const handlesubmit = async () => {
    // Récupère la première ligne sélectionnée
    const selectedRow = selectedligne;
    for (let i = 0; i < selectedRow.length; i++) {
      ChangeStatesSousTache(selectedRow[i].idSousTache, selectedRow[i].etat).then();
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
  const column = [
    {
      name: 'Titre',
      selector: (row) => row.titresoustache,
      sortable: true,
    },
    {
      name: 'Description',
      cell: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Date de sous tache',
      selector: (row) => format(new Date(row.date_sous_tache), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      sortable: true,
    },
    {
      name: 'priority',
      selector: (row) => row.priorite,
      sortable: true,
    },
    {
      name: 'etat',
      selector: (row) => (row.etat===0)?'non fini':'fini',
      sortable: true,
    },
  ]
  const handleSend = ()=>{
    if (dateplanning !=='' && durree!=='' && description!=='' && titre!== ''){
      const json = {
        "titresoustache": titre,
        "description": description,
        "date_sous_tache": dateplanning,
        "estimation": durree,
        "priorite": priorite,
        "etat": 0,
        "planningidtache": tacheId
      }
      console.log(json)
      createSousTache(json)
        .then(async () => {
          const swalData = {
            icon: 'success',
            title: 'creation  sous tache reussi',
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
  return (
    <>
      <h1>Tache : {nom}</h1>

      <div >
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
                      <h1>{nom}</h1>
                      <p className="text-medium-emphasis">Create new subtask</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilText} />
                        </CInputGroupText>
                        <CFormInput value={titre} onChange={(e)=>{setTitre(e.target.value)}} placeholder="tache name" autoComplete="nom" required/>
                      </CInputGroup>
                        <textarea cols="40" rows="3" className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="description" autoComplete="tache description" required/>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilAvTimer} />
                        </CInputGroupText>
                        <CFormInput type="datetime-local" value={dateplanning} onChange={(e)=>{setDateplanning(e.target.value)}} required/>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>estimation :</CInputGroupText>
                        <CFormInput type={"number"} min={1} value={durree} onChange={(e)=>{setDurree(e.target.value)}} required/>
                        <CInputGroupText>Priorite :</CInputGroupText>
                        <CFormInput type={"number"} min={0} value={priorite} onChange={(e)=>{setPriorite(e.target.value)}} required/>
                      </CInputGroup>

                      <div className="d-grid">
                        <CButton onClick={handleSend} color="success">create</CButton>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </Modal>
          <a type={"button"} className="btn btn-outline-info " onClick={()=>setModalIsOpen(true)}>creer sous  tache</a>
          {/*    </div>*/}
        </div>
        <List
          title={'Liste des sous taches'}
          columns={column}
          selectable={true}
          data={soustaches}
          handleRowSelection={handleChanges}
        />
        <center><CButton className={"btn w-auto"} color="info" onClick={handlesubmit}>change etat sous tache</CButton></center>
      </div>
    </>
  );
}
export default SousTache;
