import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategory, updateCategory } from '../../../../database/Api'
import Form from '../../../../components/generic/Form'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const CategoryModificationForm = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(undefined)
  const navigate = useNavigate()
  const properties = [
    {
      label: 'ID',
      name: 'id',
      type: 'disabled',
      selector: (category) => category.id,
    },
    {
      label: 'Désignation',
      name: 'name',
      type: 'text',
      selector: (category) => category.name,
      change: (e) => (category.name = e.target.value),
    },
  ]
  const submit = () => {
    const swal = withReactContent(Swal)
    updateCategory(id, category)
      .then(() => {
        swal
          .fire({
            icon: 'success',
            title: 'La catégorie a été modifié avec succes',
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
    getCategory(id).then((data) => {
      setCategory(data)
    })
  }, [id])
  return <>{category && <Form data={category} properties={properties} submit={submit} />}</>
}
export default CategoryModificationForm
