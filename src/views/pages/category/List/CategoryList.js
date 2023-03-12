import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../../database/Api'
import List from '../../../../components/generic/List'
const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nom',
      selector: (row) => row.name,
      sortable: true,
    },
  ]
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, [])
  return (
    <List
      title={'Liste des catégories'}
      columns={columns}
      selectable={false}
      data={categories}
      linkFunction={(row) => `/categories/${row.id}`}
    />
  )
}

export default CategoryList
