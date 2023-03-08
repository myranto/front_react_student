import React, { useEffect, useState } from 'react'
import { getReloads, validateReloads } from 'database/Api'
import DataTable from 'react-data-table-component'
import { CButton, CCard, CCardBody, CCol, CFormInput, CRow } from '@coreui/react'
import List from '../../../components/generic/List'
import { fr } from 'date-fns/locale'
import { format } from 'date-fns'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const Reloads = () => {
  const [reloads, setReloads] = useState([])
  const [clearRow, setClearRow] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Utilisateur',
      selector: (row) => row.user.username,
      sortable: true,
    },
    {
      name: 'Montant (Ar)',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Date du rechargement',
      selector: (row) => format(new Date(row.date), 'dd MMMM yyyy à HH:mm', { locale: fr }),
      sortable: true,
    },
    {
      name: 'Etat',
      selector: (row) => row.currentState.reloadState.description,
      sortable: true,
    },
  ]
  const addSelected = ({ selectedRows }) => {
    setSelectedRows(selectedRows)
  }

  const contextActions = React.useMemo(() => {
    const swal = withReactContent(Swal)
    const handleReject = async () => {
      for (const row of selectedRows) {
        try {
          const reload = {
            id: row.id,
            currentState: {
              id: 3,
            },
          }
          const result = await validateReloads(reload)
        } catch (error) {
          swal.fire({
            icon: 'error',
            title: "Une erreur s'est produite lors de la mis a jour de des demandes",
            text: error.response.data.message,
          })
          break
        }
        swal
          .fire({
            icon: 'success',
            title: 'Les demandes ont été rejetées',
            timer: 2000,
            showConfirmButton: false,
          })
          .then(() => {
            getReloads().then((data) => {
              setReloads(data)
              setSelectedRows([])
              setClearRow(!clearRow)
            })
          })
      }
    }

    const handleAccept = async () => {
      for (const row of selectedRows) {
        try {
          const reload = {
            id: row.id,
            currentState: {
              id: 2,
            },
          }
          const result = await validateReloads(reload)
        } catch (error) {
          swal.fire({
            icon: 'error',
            title: "Une erreur s'est produite lors de la mis a jour de des demandes",
            text: error.response.data.message,
          })
          break
        }
        swal
          .fire({
            icon: 'success',
            title: 'Les demandes ont été acceptées',
            timer: 2000,
            showConfirmButton: false,
          })
          .then(() => {
            getReloads().then((data) => {
              setReloads(data)
              setSelectedRows([])
              setClearRow(!clearRow)
            })
          })
      }
    }

    return (
      <>
        <CButton key={'reject'} onClick={handleReject} color={'danger'}>
          Refuser
        </CButton>
        <CButton key={'accept'} onClick={handleAccept} color={'success'}>
          Accepter
        </CButton>
      </>
    )
  }, [reloads, selectedRows])

  useEffect(() => {
    getReloads().then((data) => {
      setReloads(data)
    })
  }, [])
  return (
    <>
      <List
        title={'Liste des rechargements'}
        columns={columns}
        selectable={true}
        selectableDisableFunction={(row) => row.currentState.reloadState.id !== 1}
        data={reloads}
        handleRowSelection={addSelected}
        contextActions={contextActions}
        clearRow={clearRow}
      />
    </>
  )
}

export default Reloads
