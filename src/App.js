import React, { Component, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Repertoire from "./views/pages/Student/repertoires/Repertoire";
// import {Project} from "./views/pages/Student/project/Project";
// import {Taches} from "./views/pages/Student/project/Taches";
// import {SousTache} from "./views/pages/Student/project/SousTache";
// import {DetailPub} from "./views/pages/publication/DetailPub";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  // const isAuth = localStorage.getItem('aappUser-token') !== null
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />}
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          {/*<Route exact path="/repo" name="repertoire" element={<Repertoire />} />*/}
          {/*<Route exact path="/project" name="project Page" element={<Project />} />*/}
          {/*<Route exact path="/project/:id/:name/:estimation/:tempPasser" name="project Page" element={<Taches />} />*/}
          {/*<Route exact path="/project/:id/:name/:tacheId/:nametache" name="project Page" element={<SousTache />} />*/}
          {/*<Route exact path="/publication/:id" name="project Page" element={<DetailPub />} />*/}
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
