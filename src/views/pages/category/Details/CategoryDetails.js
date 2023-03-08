import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../../../database/Api'
import Details from '../../../../components/generic/Details'

const CategoryDetails = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(undefined)
  const properties = [
    { selector: (category) => category.id, label: 'ID', type: 'text' },
    { selector: (category) => category.name, label: 'Désignation', type: 'text' },
  ]
  useEffect(() => {
    getCategory(id).then(
      (data) => {
        setCategory(data)
      },
      [id],
    )
  })
  return (
    <>
      {category && (
        <Details title={`Détail de ${category.name}`} data={category} properties={properties} />
      )}
    </>
  )
}

export default CategoryDetails
