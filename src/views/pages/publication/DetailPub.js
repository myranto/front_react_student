import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {createComs, createSousTache, selectAllpub, selectOnepub} from "../../../database/Api";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {customStyles, style} from "../Student/project/Taches";
import {CButton, CForm, CFormInput, CInputGroup} from "@coreui/react";
import Modal from "react-modal";
import '../../../css/style.css'
import '../../../css/style2.css'
import {Commentaire} from "./Commentaire";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const DetailPub=()=> {
  const idEtudiant = sessionStorage.getItem("idEtudiant");
  const {id} = useParams();
  const [file, setFile] = React.useState(null)
  const [comment, setComment] = React.useState('')
  const [pub, setPub] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const swal = withReactContent(Swal)
  useEffect(() => {
    selectOnepub(id)
      .then((data) => {
        console.log(data)
        setPub(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]
    // const allowedExtensions = /(\.docx|\.pptx|\.mp4)$/i
    // if (!allowedExtensions.exec(uploadedFile.name)) {
    //   alert('Veuillez télécharger une photo avec une extension autorisée (.docx, .pptx, .mp4).')
    // } else {
      //const base64 = await convertBase64(uploadedFile)
      setFile(uploadedFile)
    // }

  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submit = async () => {
    const base64 = (file !== null) ? await convertBase64(file) : ''
    // await setFile(base64)
    const json = {
      "commentaire": {
        "texte": comment,
        "etudiantidEtudiant": idEtudiant,
        "publicationidPublication": id
      },
      "file": {
        "fichierPartager": base64
      },
    }
    createComs(json)
      .then(async () => {
        const swalData = {
          icon: 'success',
          title: 'commentaire reussi',
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
  }

  return (
    <>
      {pub !== null && <ItemsPub e={pub}/>}
      {
        pub?.list_coms != null && pub?.list_coms.map((coms) => <Commentaire coms={coms}/>)
      }
      <center><a type={"button"} className="btn btn-info"
                 onClick={() => setModalIsOpen(true)}>commenter</a></center>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <button className={"w-25 btn-close btn-danger"} color={"red"} style={style}
                onClick={() => setModalIsOpen(false)}></button>
        <div className="commenter">
          <div className="row">
            <div className="col-lg-6 col-md-9 col-lg-7 col-lg-*"></div>
            <CForm>

            <div className="contentpost col-lg-8">
                  <textarea value={comment} onChange={(e) => {
                    setComment(e.target.value)
                  }} className="area" name="" id="" cols="30" rows="6"></textarea>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="file"
                  size="sm"
                  id="formFileSm"
                  onChange={handleFileUpload}
                  required
                />
              </CInputGroup>
              <div className="row">
                  <CButton onClick={submit} type={"button"}
                           className={"btn btn-primary"}>Commenter</CButton>
                </div>
            </div>
          </CForm>

        </div>
        </div>
      </Modal>
    </>
  )
    ;
}

const textStyle =  {
  "text-decoration":"none",
  "color":"black"
}
export const ItemsPub = ({e}) => {

  return (
    <>
      <a href={`/publication/${e.idPublication}`} style={textStyle}>
      <div className="post">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="contentpost col-lg-6">
            <div className="row">
              <div className="col-lg-4">{e.etudiant.prenom}</div>
              <div className="col-lg-7"></div>
              <div className="col-lg-1"><span className="glyphicon glyphicon-option-vertical"
                                              aria-hidden="true"></span></div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="date_star">{format(new Date(e.datePublication), 'dd MMMM yyyy à HH:mm', {locale: fr})}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="postdescri">{e.texte}
              </div>
            </div>
          </div>
          {/*<div className="col-lg-3"><a href={`/publication/${e.idPublication}`}>voir commentaire</a></div>*/}
        </div>
      </div>
      </a>
    </>
  );
}
export default DetailPub;
