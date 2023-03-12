import React, {useEffect, useState} from 'react'
import '../../../css/style.css'
import '../../../css/style2.css'
import Modal from "react-modal";
import {createpub, createSousTache, getTacheByProject, selectAllpub} from "../../../database/Api";
import {ItemsPub} from "./DetailPub";
import {customStyles, style} from "../Student/project/Taches";
import {CButton, CCard, CCardBody, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilAvTimer, cilText} from "@coreui/icons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const publication = () => {
  const [pub, setPub] = useState(null);
  const [text,setText] = useState('');
  const idEtudiant = sessionStorage.getItem("idEtudiant");
  const swal = withReactContent(Swal)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    selectAllpub()
      .then((data) => {
        console.log(data)
        setPub(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  const handleSend = ()=>{
    if (text !==''){
      const json = {
        "texte": text,
        "etudiantidEtudiant": idEtudiant
      }
      console.log(json)
      createpub(json)
        .then(async () => {
          const swalData = {
            icon: 'success',
            title: 'publication reussi',
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

    <div >
      <div className="container">
        <Modal

          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
        >
          <button className={"w-25 btn-close btn-danger"} color={"red"} style={style} onClick={() => setModalIsOpen(false)}></button>

          <CRow className="justify-content-center">
            <CCol >
              <CCard className="mx-8">
                <CCardBody className="p-8">
                  <CForm>
                   <center><h3 className={title} color={"blue"} >publication</h3>
                    <p className="text-medium-emphasis">publier !!</p></center>
                    <CInputGroup className="mb-6">
                      <textarea value={text} onChange={(e) => {
                        setText(e.target.value)
                      }} className="form-control" name="" id="" cols="50" rows="10"></textarea>
                    </CInputGroup>

                    <div className="d-grid">
                      <CButton onClick={handleSend} color="success">publier</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </Modal>
        <a type={"button"} className="btn btn-outline-info " onClick={()=>setModalIsOpen(true)}>creer publication</a>
        {/*    </div>*/}
      </div>
      {
        pub !== null &&
        pub?.map((e) => <ItemsPub e={e} />
        )
      }


    </div>

  )
}
const title = {
  "align-self": "center",
  "color": "#206DF7",
  "font-size": "24pt",
  "font-weight": "bold",
  "margin-bottom":"-15px"
}
export default publication
