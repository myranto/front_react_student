import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'assets/brand/logo'
import {Logout} from "@mui/icons-material";
import PomodoroConfig from 'views/pages/pomodoro/pomodoro_components/PomodoroConfig'
const headerStyle = {
  "background":"#206DF7"
}
const navigateur = {
  cursor:"pointer",
  color:"black"
}
let pomodoroHeader = true
let sessionLength = 25;
export const setPomodoroHeader = (newState) =>{
  pomodoroHeader = newState
}

export const getPomodoroHeader = (newState) =>{
  return pomodoroHeader
}
export const setSessionLength = (newState) =>{
  sessionLength = newState
}

export const getSessionLength = (newState) =>{
  return sessionLength
}

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()
  if(localStorage.getItem('time')!=25){
    setSessionLength(localStorage.getItem('time'))
  }
  return (
    <CHeader  position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink >Accueil</CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/*<CHeaderNav className="d-none d-md-flex me-auto">*/}
        {/*  <CNavItem>*/}
        {/*    <CNavLink style={navigateur} onClick={() => navigate('/login')}>sign up</CNavLink>*/}
        {/*  </CNavItem>*/}
        {/*</CHeaderNav>*/}
        {/*<CHeaderNav className="d-none d-md-flex me-auto">*/}
        {/*  <CNavItem>*/}
        {/*    <CNavLink style={navigateur} onClick={() => navigate('/register')}>sign in</CNavLink>*/}
        {/*  </CNavItem>*/}
        {/*</CHeaderNav>*/}

        {pomodoroHeader &&(
          <CHeaderNav className="d-none d-md-flex me-auto">
            <PomodoroConfig
              defaultBreakLength='5'
              defaultSessionLength={sessionLength}
              value="" />
          </CHeaderNav>)}
        <CHeaderNav className="ms-3">
          {/*<AppHeaderDropdown />*/}
          <CNavLink style={navigateur} onClick={() => navigate('/logout')}><Logout className={'nav-icon'} />log out</CNavLink>
        </CHeaderNav>
      </CContainer>
      {/*<CHeaderDivider />*/}
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
