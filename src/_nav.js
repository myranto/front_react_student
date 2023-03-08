import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { Category, Dashboard, Gavel, Money, Settings } from '@mui/icons-material'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <Dashboard className={'nav-icon'} />,
  },
  {
    component: CNavItem,
    name: 'Enchères',
    to: '/auctions',
    icon: <Gavel className={'nav-icon'} />,
  },
  {
    component: CNavItem,
    name: 'Rechargements',
    to: '/reloads',
    icon: <Money className={'nav-icon'} />,
  },
  {
    component: CNavGroup,
    name: 'Catégories',
    icon: <Category className={'nav-icon'} />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des catégories',
        to: '/categories',
      },
      {
        component: CNavItem,
        name: 'Ajouter une catégorie',
        to: '/categories/new',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Paramètres',
    icon: <Settings className={'nav-icon'} />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des paramètres',
        to: '/settings',
      },
      {
        component: CNavItem,
        name: 'Ajouter un paramètre',
        to: '/settings/new',
      },
    ],
  },
]

export default _nav
