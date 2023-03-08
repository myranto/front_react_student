import {useEffect, useState} from "react";
import {getAllproject} from "../../../../database/Api";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

export const Project = () => {
  const [project,setProject] = useState();

  useEffect(() => {
    getAllproject()
      .then((data) => {
        setProject(data)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);
  const column = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Utilisateur',
      selector: (row) => row.appUser.username,
      sortable: true,
    },
    {
      name: 'Titre',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Date de début',
      selector: (row) => format(new Date(row.startDate), 'dd MMMM yyyy', { locale: fr }),
      sortable: true,
    },
    {
      name: 'Date de fin',
      selector: (row) => format(new Date(row.endDate), 'dd MMMM yyyy', { locale: fr }),
      sortable: true,
    },
    {
      name: 'Mise de depart',
      selector: (row) => row.startingPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      sortable: true,
    },
    {
      name: 'Mise actuelle',
      selector: (row) =>
        (row.topBid?.amount || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      sortable: true,
    },
  ]
  return (
      <>

      </>
    );
}
