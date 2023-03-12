import React, { useEffect } from 'react'
import { getSettings } from '../../../../database/Api'
import List from '../../../../components/generic/List'
const SettingList = () => {
  const [settings, setSettings] = React.useState([])
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.key,
      sortable: true,
    },
    {
      name: 'Valeur actuelle',
      selector: (row) => row.currentValue.value,
      sortable: true,
    },
  ]
  useEffect(() => {
    getSettings().then((data) => {
      setSettings(data)
    })
  }, [])
  return (
    <List
      title={'Liste des paramètres'}
      columns={columns}
      selectable={false}
      data={settings}
      linkFunction={(row) => `/settings/${row.id}`}
    />
  )
}

export default SettingList
