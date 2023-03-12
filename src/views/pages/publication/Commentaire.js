import {Rating} from "@mui/material";
import React, {useEffect} from "react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {CreateProject, getAllproject, getNote, makeNoteComs} from "../../../database/Api";
import FileDisplay from "../../../components/Files/FileDisplay";

export function Commentaire ({coms}) {
  const [rate, setRate] = React.useState(0)
  const idEtudiant = sessionStorage.getItem("idEtudiant");
  // {idcoms}/{idetu}

  useEffect(() => {
    getNote(coms.idCommentaire,idEtudiant)
      .then((data) => {
        console.log(data)
        setRate(data.notes)
      })
      .catch((error) => {
        // console.log("cuo")
        console.log(error)
      })
  }, []);
  const handleSubmited = async (event, newValue) => {
    await setRate(newValue)
    // alert(newValue)
    // if (rate !== 0) {
      const json = {
        "idCommentaire": coms.idCommentaire,
        "notes": newValue,
        "idEtudiant": idEtudiant
      }
      makeNoteComs(json)
        .then()
        .catch((error) => {
          console.log(error)
        })

    // }

  }

  return (
   <>
     <div className="commentbox">
       <div className="row">
         <div className="col-lg-3"></div>

         <div className="content col-lg-6">
           <div className="row">
             <div className="col-lg-4">{coms.etudiant.prenom}</div>
             <div className="col-lg-7"></div>
             <div className="col-lg-1 col-md-3 col-sm-5"><span className="glyphicon glyphicon-option-vertical"
                                                               aria-hidden="true"></span></div>
           </div>

           <div className="row">
             <div className="col-lg-6">
               <div className="date_star">{format(new Date(coms.dateCommentaire), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                 <Rating name="simple-controlled" value={rate} size="small" onChange={handleSubmited}/>
               </div>
             </div>
           </div>

           <div className="row">
             <div className="text">{coms.texte}
             </div>
             {/*<div >*/}
             {/*  <div>*/}
             {/*     <h6 className={"text-info"}>fichier partager</h6>*/}
             {/*    {coms?.list_fileComs!==null && coms?.list_fileComs?.map((e)=><FilesDisplay files={e.fichierPartager} />)}*/}
             {/*  </div>*/}
             {/*</div>*/}
           </div>
         </div>

         <div className="col-lg-3"></div>
       </div>
     </div>
   </>
  )
}
const FilesDisplay = ({files}) => {
  return(
    <>
      {files!==null && <FileDisplay base64String={files} />}
    </>
  )

}
