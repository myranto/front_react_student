import React, { useEffect, useState } from 'react'
import Form from '../../../../components/generic/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { getAuction, getCategories, updateAuction } from '../../../../database/Api'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const AuctionModificationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [auction, setAuction] = useState(undefined)
  const [categories, setCategories] = useState(undefined)
  const [categoriesOptions, setCategoriesOptions] = useState(undefined)
  const properties = [
    {
      label: 'Titre',
      name: 'title',
      type: 'text',
      selector: (auction) => auction.title,
      change: (e) => (auction.title = e.target.value),
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textArea',
      selector: (auction) => auction.description,
      change: (e) => (auction.description = e.target.value),
    },
    {
      label: 'Categorie',
      name: 'category',
      type: 'select',
      selector: (auction) => auction.category.id,
      options: categoriesOptions,
      change: (e) => {
        auction.category.id = e.target.value
        console.log(auction.category.id)
        auction.category.name = categories.find((category) => category.id === e.target.value).name
      },
    },
    {
      label: 'Etat',
      name: 'state',
      type: 'disabled',
      selector: (auction) => auction.auctionState.value,
    },
    {
      label: 'Utilisateur',
      name: 'user',
      type: 'disabled',
      selector: (auction) => auction.appUser.username,
    },
    {
      label: 'Date de début',
      name: 'startDate',
      type: 'datetime-local',
      selector: (auction) => format(new Date(auction.startDate), "yyyy-MM-dd'T'HH:mm"),
      change: (e) => (auction.startDate = new Date(e.target.value)),
    },
    {
      label: 'Date de fin',
      name: 'endDate',
      type: 'disabled',
      selector: (auction) =>
        format(new Date(auction.endDate), 'dd MMMM yyyy à HH:mm', { locale: fr }),
    },
    {
      label: 'Mise de départ',
      name: 'startPrice',
      type: 'number',
      selector: (auction) => auction.startingPrice,
      change: (e) => (auction.startingPrice = e.target.value),
    },
    {
      label: "Pas des mises de l'enchère",
      name: 'bidStep',
      type: 'number',
      selector: (auction) => auction.bidStep,
      change: (e) => (auction.bidStep = e.target.value),
    },
    // {
    //   label: 'Images',
    //   name: 'pictures',
    //   type: 'image-gallery',
    //   selector: (auction) => auction.pictures,
    //   change: (links) => {
    //     auction.pictures = links
    //   },
    // },
  ]
  const submit = () => {
    const body = {
      id: auction.id,
      title: auction.title,
      description: auction.description,
      category: {
        id: auction.category.id,
      },
      startDate: auction.startDate,
      startingPrice: auction.startingPrice,
      bidStep: auction.bidStep,
    }
    const swal = withReactContent(Swal)
    updateAuction(id, body)
      .then(() => {
        swal
          .fire({
            icon: 'success',
            title: "L'enchère a été modifiée avec succes",
            timer: 2000,
            showConfirmButton: false,
          })
          .then(() => {
            navigate(-1)
          })
      })
      .catch((error) => {
        const swalData = {
          icon: 'error',
          title: "Une erreur est survenue lors de l'enregistrement",
          text: error.response.data.message,
        }
        swal.fire(swalData).then()
      })
  }
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
      setCategoriesOptions(
        data.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      )
      getAuction(id).then((data) => {
        setAuction(data)
      })
    })
  }, [id])
  return <>{auction && <Form data={auction} properties={properties} submit={submit} />}</>
}

export default AuctionModificationForm
