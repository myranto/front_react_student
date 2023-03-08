import React, { useEffect, useState } from 'react'
import List from '../../../../components/generic/List'
import { getAuctions } from '../../../../database/Api'
import { fr } from 'date-fns/locale'
import { format } from 'date-fns'

const AuctionList = () => {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    getAuctions().then((data) => {
      setAuctions(data)
    })
  }, [])
  const columns = [
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
      <List
        title={'Liste des encheres'}
        columns={columns}
        selectable={false}
        data={auctions}
        linkFunction={(row) => `/auctions/${row.id}`}
      />
    </>
  )
}

export default AuctionList
