import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuction } from '../../../../database/Api'
import Details from '../../../../components/generic/Details'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'


const AuctionDetails = () => {
  const { id } = useParams()
  const [auction, setAuction] = useState(undefined)
  const bidsColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: false,
    },
    {
      name: 'Utilisateur',
      selector: (row) => row.appUser.username,
      sortable: false,
    },
    {
      name: 'Montant',
      selector: (row) => row.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      sortable: false,
    },
    {
      name: 'Date',
      selector: (row) => format(new Date(row.date), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      sortable: false,
    },
  ]
  console.log(auction)

  const properties = [
     //{ selector: (auction) => auction.images, label: 'Photos', type: 'image' },
    { selector: (element) => element.id, label: 'ID', type: 'text' },
    { selector: (element) => element.description, label: 'Description', type: 'text' },
    { selector: (element) => element.category.name, label: 'Categorie', type: 'text' },
    { selector: (element) => element.appUser.username, label: 'Utilisateur', type: 'text'},
    { selector: (element) => element.auctionState.value, label: 'Etat', type: 'text' },
    {
      selector: (element) =>
        format(new Date(element.startDate), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      label: 'Date de début',
      type: 'text',
    },
    {
      selector: (element) =>
        format(new Date(element.endDate), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      label: 'Date de fin',
      type: 'text',
    },
    {
      selector: (element) =>
        element.startingPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      label: 'Mise de départ',
      type: 'text',
    },
    {
      selector: (element) => {
        return element.topBid
          ? element.topBid.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })
          : '--';
      },
      label: 'Mise actuelle',
      type: 'text',
    },
    {
      selector: (element) => element.history,
      label: 'Historiques des offres',
      type: 'table',
      columns: bidsColumns,
    },
  ]
  useEffect(() => {
    getAuction(id).then((data) => {
      setAuction(data)
    })
  }, [id])
  return (
    <>
      {auction !== undefined && (
        <><Details title={auction.title} data={auction} properties={properties} /></>
      )}  
    </>
    
  )
}

export default AuctionDetails
