import React from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { logout } from '../../database/Api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const handle = () => {
    const swal = withReactContent(Swal)
    logout()
      .then((data) => {
        localStorage.removeItem('admin-token')
        const swalData = {
          icon: 'success',
          title: 'Vous avez été déconnecté',
          timer: 1000,
          showConfirmButton: false,
        }
        swal.fire(swalData).then(() => {
          navigate('/login')
        })
      })
      .catch((error) => {
        const swalData = {
          icon: 'error',
          title: 'Une erreur est survenue lors de la déconnexion',
          text: error.response.data.message,
        }
        swal.fire(swalData).then()
      })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem className={'clickable'} onClick={handle}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
