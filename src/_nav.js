import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import {
  Category, Comment,
  Dashboard,
  FileOpen,
  Gavel, Grading,
  Logout,
  Money,
  Public,
  Publish,
  Settings,
  Timer, WorkOffOutlined, WorkOutlineRounded
} from '@mui/icons-material'
import Project from "./views/pages/Student/project/Project";

const _nav = [

  {
    component: CNavItem,
    name: 'Projets',
    to: '/project',
    icon: <Grading className={'nav-icon'} />,
  },
  {
    component: CNavItem,
    name: 'Publication',
    to: '/publication',
    icon: <Comment className={'nav-icon'} />,
  },
  {
    component: CNavItem,
    name: 'Fichiers',
    to: '/repo',
    icon: <FileOpen className={'nav-icon'} />,
  },
  {
    component: CNavGroup,
    name: 'Stage',
    icon: <WorkOutlineRounded className={'nav-icon'} />,
    items: [
      {
        component: CNavItem,
        name: 'profil',
        to: '/addStage',
      },
      {
        component: CNavItem,
        name: 'offre',
        to: '/Liststage',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'pomodoro',
    icon: <Timer className={'nav-icon'} />,
    items: [
      {
        component: CNavItem,
        name: 'timer',
        to: '/pomodoro',
      },
      {
        component: CNavItem,
        name: 'Modifier',
        to: '/modify_pomodoro',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'log out',
  //   to: '/logout',
  //   icon: <Logout className={'nav-icon'} />,
  // },
]

export default _nav
