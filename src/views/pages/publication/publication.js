import React from 'react'
import '../../../css/style.css'
import '../../../css/style2.css'
import { Rating } from '@mui/material'
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
const publication = () =>{
    const [rate, setRate] = React.useState(0)
    const [file, setFile] = React.useState(null)
    const [comment,setComment] = React.useState('')
    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0]
        const allowedExtensions = /(\.docx|\.pptx|\.mp4)$/i
        if (!allowedExtensions.exec(uploadedFile.name)) {
          alert('Veuillez télécharger une photo avec une extension autorisée (.docx, .pptx, .mp4).')
        } else {
          //const base64 = await convertBase64(uploadedFile)
          setFile(uploadedFile)
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

    const submit = async () =>{
        alert(comment)
        const base64 = await convertBase64(file)
        setFile(base64)
    }
    return(
      
    <div id="container">
    <div class="post">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="contentpost col-lg-6">
                <div class="row">
                    <div class="col-lg-4"><img class="avatar" src="" alt=""/>Rabenarison</div>
                    <div class="col-lg-7"></div>
                    <div class="col-lg-1"><span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span></div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="date_star">2 days ago
                            
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="postdescri">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus voluptatibus quas in, soluta nam, quasi, ratione doloremque aut provident laudantium distinctio nobis quaerat rerum iusto veritatis odio totam aperiam saepe?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus vitae harum officia aperiam aut, accusantium hic, praesentium fuga molestias, quidem eligendi veritatis sed adipisci atque voluptas saepe esse perspiciatis expedita.
                    </div>
                </div>
            </div>
            <div class="col-lg-3"></div>
        </div>
    </div>
    <div class="commentbox">
        <div class="row">
            <div class="col-lg-3"></div>

            <div class="content col-lg-6">
                <div class="row">
                    <div class="col-lg-4"><img class="avatar" src="" alt=""/>Jean dark</div>
                    <div class="col-lg-7"></div>
                    <div class="col-lg-1 col-md-3 col-sm-5"><span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span></div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="date_star">2 days ago
                        <Rating name="simple-controlled" value={rate} size="small" onChange={(event,newValue)=>{setRate(newValue)}}/>
                        </div>    
                    </div>
                </div>
                
                <div class="row">
                
                    <div class="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Tempora quae natus quod qui accusantium aliquid expedita iusto assumenda fugiat repudiandae,
                        ipsum voluptatum provident nisi illo id laboriosam minus blanditiis eveniet.
                    </div>
                </div>
            </div>

            <div class="col-lg-3"></div>
        </div>
    </div>
  
    <div class="commentbox">
        <div class="row">
            <div class="col-lg-3"></div>

            <div class="content col-lg-6">
                <div class="row">
                    <div class="col-lg-4"><img class="avatar" src="" alt=""/>Rakoto</div>
                    <div class="col-lg-7"></div>
                    <div class="col-lg-1"><span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span></div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="date_star">2 days ago
                            <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                            <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                            <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                            <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                            <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Tempora quae natus quod qui accusantium aliquid expedita iusto assumenda fugiat repudiandae,
                        ipsum voluptatum provident nisi illo id laboriosam minus blanditiis eveniet.
                    </div>
                </div>
            </div>

            <div class="col-lg-3"></div>
        </div>
    </div>
    <div class="commenter">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="contentpost col-lg-6">
               <textarea value={comment} onChange={(e)=>{setComment(e.target.value)}} class="area" name="" id="" cols="30" rows="10"></textarea>
               
               <CInputGroup className="mb-3">
                    <CFormInput
                      type="file"
                      size="sm"
                      id="formFileSm"
                    onChange={handleFileUpload}
                      required
                    />
                  </CInputGroup>
               <div class="row">
                    <div class="col-lg-2"><CButton onClick={submit} precision={0.5} class="btn btn-primary">Commenter</CButton></div>
                    <div class="col-lg-10"></div>
                </div>
            </div>
            <div class="col-lg-3"></div>
        </div>
    </div>
   
</div>

)
}
export default publication