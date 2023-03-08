import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSetting } from '../../../../database/Api'
import Details from '../../../../components/generic/Details'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const SettingDetails = () => {
  const { id } = useParams()
  const [setting, setSetting] = React.useState(undefined)
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Valeur',
      selector: (row) => row.value,
    },
    {
      name: 'Date de modification',
      selector: (row) => format(new Date(row.date), 'dd MMMM yyyy à HH:mm', { locale: fr }),
    },
  ]
  const properties = [
    { selector: (setting) => setting.id, label: 'ID', type: 'text' },
    { selector: (setting) => setting.key, label: 'Désignation', type: 'text' },
    { selector: (setting) => setting.currentValue.value, label: 'Valeur actuelle', type: 'text' },
    {
      selector: (setting) => format(new Date(setting.creationDate), 'dd MM yyyy', { locale: fr }),
      label: 'Date de création',
      type: 'text',
    },
    {
      selector: (setting) => setting.history,
      label: 'Historiques des valeurs',
      type: 'table',
      columns: columns,
    },
  ]
  useEffect(() => {
    getSetting(id).then((data) => {
      setSetting(data)
    })
  }, [id])
  return (
    <>
      {setting && (
        <Details title={`Détail de ${setting.name}`} data={setting} properties={properties} />
      )}{' '}
    </>
  )
}

export default SettingDetails
