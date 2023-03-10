import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Pages
const Statistics = React.lazy(() => import('./views/pages/statistics/Statistics'))
const Reloads = React.lazy(() => import('./views/pages/reloads/Reloads'))
const AuctionList = React.lazy(() => import('./views/pages/auctions/List/AuctionList'))
const AuctionDetails = React.lazy(() => import('./views/pages/auctions/Details/AuctionDetails'))
const AuctionModificationForm = React.lazy(() =>
  import('./views/pages/auctions/ModificationForm/AuctionModificationForm'),
)
const CategoryList = React.lazy(() => import('./views/pages/category/List/CategoryList'))
const CategoryDetails = React.lazy(() => import('./views/pages/category/Details/CategoryDetails'))
const CategoryModificationForm = React.lazy(() =>
  import('./views/pages/category/ModificationForm/CategoryModificationForm'),
)
const CategoryAddForm = React.lazy(() => import('./views/pages/category/AddForm/CategoryAddForm'))
const SettingList = React.lazy(() => import('./views/pages/settings/List/SettingList'))
const SettingDetails = React.lazy(() => import('./views/pages/settings/Details/SettingDetails'))
const SettingModificationForm = React.lazy(() =>
  import('./views/pages/settings/ModificationForm/SettingModificationForm'),
)
const SettingAddForm = React.lazy(() => import('./views/pages/settings/AddForm/SettingAddForm'))
const AdvancedSearch = React.lazy(() => import('./views/pages/auctions/advancedSearch/AdvancedSearch'))
const AuctionListDesc = React.lazy(() => import('./views/pages/auctions/List/AuctionListDesc'))
const AuctionMised = React.lazy(() => import('./views/pages/auctions/List/AuctionMised'))
const Encherir = React.lazy(() => import('./views/pages/auctions/Encherir/Encherir'))
const Publication = React.lazy(() => import('./views/pages/publication/publication'))
const Pomodoro = React.lazy(() => import('./views/pages/pomodoro/pomodoro'))
const ModifyPomodoro = React.lazy(() => import('./views/pages/pomodoro/ModifyDefaultPomodoro'))
const Project = React.lazy(() => import('./views/pages/Student/project/Project'))
const Taches = React.lazy(() => import('./views/pages/Student/project/Taches'))
const SousTache = React.lazy(() => import('./views/pages/Student/project/SousTache'))
const DetailPub = React.lazy(() => import('./views/pages/publication/DetailPub'))
const LogOut = React.lazy(() => import('./views/pages/login/LogOut'))
const Stage = React.lazy(() => import('./views/pages/stage/Stage'))
const ListStage = React.lazy(() => import('./views/pages/stage/ResponsStage'))
const Repository = React.lazy(() => import('./views/pages/Student/repertoires/Repertoire'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Statistics', element: Statistics },
  { path: '/reloads', name: 'Reloads', element: Reloads },
  { path: '/auctions', name: 'Ench??res', element: AuctionList },
  { path: '/auctions/:id', name: 'Ench??res', element: AuctionDetails },
  { path: '/auctions/:id/modify', name: 'Modify Auction', element: AuctionModificationForm },
  { path: '/categories', name: 'Cat??gorie', element: CategoryList },
  { path: '/categories/:id', name: 'Cat??gorie', element: CategoryDetails },
  { path: '/categories/:id/modify', name: 'Cat??gorie', element: CategoryModificationForm },
  { path: '/categories/new', name: 'Ajout cat??gorie', element: CategoryAddForm },
  { path: '/settings', name: 'Param??tre', element: SettingList },
  { path: '/settings/:id', name: 'Param??tre', element: SettingDetails },
  { path: '/settings/:id/modify', name: 'Param??tre', element: SettingModificationForm },
  { path: '/settings/new', name: 'Ajout param??tre', element: SettingAddForm },
  { path: '/advancedSearch', name: 'AdvancedSearch', element: AdvancedSearch },
  { path: '/accueil', name: 'AuctionListDesc', element: AuctionListDesc },
  { path: '/mised', name: 'AuctionMised', element: AuctionMised },
  { path: '/encherir/:id', name: 'Encherir', element: Encherir },
  { path: '/publication', name: 'Publication', element: Publication },
  { path: '/publication/:id', name: 'Publication', element: DetailPub },
  { path: '/pomodoro', name: 'Pomodoro', element: Pomodoro },
  { path: '/project', name: 'Project', element: Project },
  { path: '/project/:id/:name/:estimation/:tempPasser/:pourcent', name: 'Project/taches', element: Taches },
  { path: '/project/:id/:name/:tacheId/:nametache', name: 'Project/taches/sous taches', element: SousTache },
  { path: '/logout', name: 'log out', element: LogOut },
  { path: '/addStage', name: 'offre stage', element: Stage },
  { path: '/Liststage', name: 'offre stage', element: ListStage },
  { path: '/modify_pomodoro', name: 'modifier pomodoro', element: ModifyPomodoro },
  { path: '/repo', name: 'fichiers', element: Repository },
]

export default routes
