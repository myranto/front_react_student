import React, { useState } from 'react'
import Form from '../../../../components/generic/Form'
import { CButton } from '@coreui/react'
import { Delete } from '@mui/icons-material'
import { addCategory, getReloads } from '../../../../database/Api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const CategoryAddForm = () => {
  let [categories, setCategories] = useState([])
  let [fakeId, setFakeId] = useState(0)
  const [selectedRows, setSelectedRows] = useState([])
  const [category, setCategory] = useState({ name: '' })
  const navigate = useNavigate()
  const properties = [
    {
      label: 'Désignation',
      name: 'name',
      type: 'text',
      selector: (category) => category.name,
      change: (e) => setCategory({ name: e.target.value }),
    },
  ]
  const add = () => {
    setCategories([...categories, { id: fakeId, name: category.name }])
    setFakeId(fakeId + 1)
  }

  const addSelected = ({ selectedRows }) => {
    setSelectedRows(selectedRows)
  }
  const submit = async () => {
    const swal = withReactContent(Swal)
    for (const element of categories) {
      try {
        element.id = null
        await addCategory(element)
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: "Une erreur s'est produite lors de l'ajout de la catégorie",
          text: error.response.data.message,
        })
        break
      }
      swal
        .fire({
          icon: 'success',
          title: 'Les catégories ont été enregistrées',
          timer: 2000,
          showConfirmButton: false,
        })
        .then(() => {
          navigate('/categories')
        })
    }
  }
  const deleteButton = React.useMemo(() => {
    const handleDelete = () => {
      setCategories(
        categories.filter((cat) => selectedRows.find((row) => row.id === cat.id) === undefined),
      )
    }
    return (
      <CButton key={'delete'} onClick={handleDelete} color={'danger'}>
        <Delete />
      </CButton>
    )
  }, [categories, selectedRows])
  return (
    <Form
      data={category}
      properties={properties}
      submit={submit}
      multiple
      multipleData={categories}
      add={add}
      key={categories.length}
      multipleSelectionHandler={addSelected}
      contextActions={deleteButton}
    />
  )
}

export default CategoryAddForm
