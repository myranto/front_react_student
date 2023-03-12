import React, { useState } from 'react'
import Form from '../../../../components/generic/Form'
import { CButton } from '@coreui/react'
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { addSetting } from '../../../../database/Api'

const SettingAddForm = () => {
  let [settings, setSettings] = useState([])
  let [fakeId, setFakeId] = useState(0)
  const [selectedRows, setSelectedRows] = useState([])
  const [setting, setSetting] = useState({ key: '', currentValue: { value: '' } })
  const navigate = useNavigate()
  const properties = [
    {
      label: 'Désignation',
      name: 'name',
      type: 'text',
      selector: (setting) => setting.key,
      change: (e) => setSetting({ ...setting, key: e.target.value }),
    },
    {
      label: 'Valeur initiale',
      name: 'initiale-value',
      type: 'text',
      selector: (setting) => setting.currentValue.value,
      change: (e) => setSetting({ ...setting, currentValue: { value: e.target.value } }),
    },
  ]
  const add = () => {
    setSettings([...settings, { id: fakeId, key: setting.key, currentValue: setting.currentValue }])
    setFakeId(fakeId + 1)
  }

  const addSelected = ({ selectedRows }) => {
    setSelectedRows(selectedRows)
  }
  const submit = async () => {
    const swal = withReactContent(Swal)
    for (const element of settings) {
      try {
        element.id = null
        await addSetting(element)
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: "Une erreur s'est produite lors de l'ajout du paramètre",
          text: error.response.data.message,
        })
        break
      }
      swal
        .fire({
          icon: 'success',
          title: 'Les paramètres ont été enregistrées',
          timer: 2000,
          showConfirmButton: false,
        })
        .then(() => {
          navigate('/settings')
        })
    }
  }
  const deleteButton = React.useMemo(() => {
    const handleDelete = () => {
      setSettings(
        settings.filter((cat) => selectedRows.find((row) => row.id === cat.id) === undefined),
      )
    }
    return (
      <CButton key={'delete'} onClick={handleDelete} color={'danger'}>
        <Delete />
      </CButton>
    )
  }, [settings, selectedRows])
  return (
    <Form
      data={setting}
      properties={properties}
      submit={submit}
      multiple
      multipleData={settings}
      add={add}
      key={settings.length}
      multipleSelectionHandler={addSelected}
      contextActions={deleteButton}
    />
  )
}

export default SettingAddForm
