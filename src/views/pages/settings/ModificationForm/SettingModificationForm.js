import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSetting, updateSetting } from '../../../../database/Api'
import Form from '../../../../components/generic/Form'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const SettingModificationForm = () => {
  const { id } = useParams()
  const [setting, setSetting] = React.useState(undefined)
  const navigate = useNavigate()
  const properties = [
    {
      label: 'ID',
      name: 'id',
      type: 'disabled',
      selector: (setting) => setting.id,
    },
    {
      label: 'Désignation',
      name: 'name',
      type: 'text',
      selector: (setting) => setting.key,
      change: (e) => (setting.key = e.target.value),
    },
    {
      label: 'Valeur',
      name: 'value',
      type: 'text',
      selector: (setting) => setting.currentValue.value,
      change: (e) => (setting.currentValue.value = e.target.value),
    },
  ]
  const submit = () => {
    const swal = withReactContent(Swal)
    const data = {
      id: setting.id,
      key: setting.key,
      currentValue: {
        value: setting.currentValue.value,
      },
    }
    updateSetting(id, data)
      .then(() => {
        swal
          .fire({
            icon: 'success',
            title: 'Le paramètre a été modifié avec succes',
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
          title: 'Une erreur est survenue lors de la modification du paramètre',
          text: error.response.data.message,
        }
        swal.fire(swalData).then()
      })
  }
  useEffect(() => {
    getSetting(id).then((data) => {
      setSetting(data)
    })
  }, [id])
  return <> {setting && <Form data={setting} properties={properties} submit={submit} />} </>
}
export default SettingModificationForm
