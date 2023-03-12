import React from 'react'
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
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBirthdayCake, cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'
import { register } from '../../../database/Api'
import withReactContent from 'sweetalert2-react-content'



const Register = () => {

  const [file, setFile] = React.useState(null)
  const [nom, setNom] = React.useState('')
  const [prenom, setPrenom] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [date, setDate] = React.useState('')
  const [mdp, setMdp] = React.useState('')
  const [repeatMdp, setRepeatMdp] = React.useState('')
  const swal = withReactContent(Swal)

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0]
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    if (!allowedExtensions.exec(uploadedFile.name)) {
      alert('Veuillez télécharger une photo avec une extension autorisée (.jpg, .jpeg, .png).')
    } else {
      const base64 = await convertBase64(uploadedFile);
      setFile(base64)
    }

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
  const submit = () => {
    if(nom==='' || prenom===''||email===''||date===''||mdp===''||repeatMdp===''||file===null){
      const swalData = {
        icon: 'error',
        title: 'Une erreur est survenu',
        text: 'L\'un des champs est vide',
      }
      swal.fire(swalData).then()
    }else{
      if(mdp === repeatMdp){
        const data = {
          "nom": nom,
          "prenom": prenom,
          "email": email,
          "motdepasse": mdp,
          "datenaissance": date,
          "carteetudiant": file
        }
        register(data)
        .then(() => {
          const swalData = {
            icon: 'success',
            title: 'Connexion réussie',
            timer: 1000,
            showConfirmButton: false,
          }
          swal.fire(swalData).then()
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
          text: 'Les mot de passe ne se correspond pas',
        }
        swal.fire(swalData).then()
      }
    }

  }
  return (
    <div className="bg-blue min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput value={nom} onChange={(e)=>{setNom(e.target.value)}} placeholder="Nom" autoComplete="nom" required/>
                    <CFormInput value={prenom} onChange={(e)=>{setPrenom(e.target.value)}} placeholder="Prenom" autoComplete="prenom" required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBirthdayCake} />
                    </CInputGroupText>
                    <CFormInput type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" autoComplete="email" required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      value={mdp}
                      onChange={(e)=>{setMdp(e.target.value)}}
                      type="password"
                      placeholder="Mot de passe"
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                     value={repeatMdp}
                     onChange={(e)=>{setRepeatMdp(e.target.value)}}
                      type="password"
                      placeholder="Retaper mot de passe"
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="file"
                      size="sm"
                      id="formFileSm"
                      onChange={handleFileUpload}
                      required
                    />
                  </CInputGroup>

                  {file && (
                     <><p>Voici votre photo:</p><div>
                      <img style={{ "margin-left": "20%", width: "50%", height: "50%" }} src={file} alt="Uploaded file" />
                    </div></>
                  )}
                  <div className="d-grid">
                    <CButton onClick={submit} color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
