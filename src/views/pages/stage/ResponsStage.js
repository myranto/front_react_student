import {format} from "date-fns";
import {fr} from "date-fns/locale";
import List from "../../../components/generic/List";
import React, {useEffect, useState} from "react";
import {getAllproject, getListOffer} from "../../../database/Api";
import {Link} from "react-router-dom";

const ResponsStage = ()=>{
  const idEtudiant = sessionStorage.getItem("idEtudiant");
  const [dataList,setDataList] = useState();
  useEffect(() => {
    getListOffer(idEtudiant)
      .then((data) => {
        console.log(data)
        setDataList(data)
      })
      .catch((error) => {
        // console.log("cuo")
        console.log(error)
      })
  }, []);

  const column = [

    {
      name: 'Entreprise',
      selector: (row) => row.nom_entreprise
      ,
      sortable: true,
    },
    {
      name: 'poste',
      selector: (row) => row.poste,
      sortable: true,
    },
    {
      name: 'Exigences',
      cell: (row) => row.exigences,
      sortable: true,
    },
    {
      name: 'Addresse',
      selector: (row) =>row.localisation,
      sortable: true,
    },{
      name: 'lien',
      cell: (row) => <a href={row.lien} >row.lien</a>,
      sortable: true,
      style: {
        color:'blue',
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: '100px',
        height: 'auto'
      },
    },
    {
      name: 'Date Debut',
      selector: (row) =>format(new Date(row.date_debut), 'dd MMMM yyyy', { locale: fr }),
      sortable: true,
    },{
      name: 'Date fin',
      selector: (row) =>format(new Date(row.date_fin), 'dd MMMM yyyy', { locale: fr }),
      sortable: true,
    },

  ]
  return (
    <>
      <List
        title={'Liste des offres'}
        columns={column}
        selectable={false}
        data={dataList}
      />
    </>
  )
}
export default ResponsStage;
