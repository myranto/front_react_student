import { faker } from '@faker-js/faker'
import _ from 'lodash'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import axios from 'axios'

/* urls */
const host =
  'http://localhost:8000'
const baseProjectUrl = `${host}/projet`
const basePublicationUrl = `${host}/publication`

// auth
const logoutUrl = `${host}/users/logout`
// auctions
const bidUrl = (id,bidid,amount) =>`${auctionsUrl}/bid/${id}&${bidid}&${amount}`
const getAuctionListDescUrl = (id) =>`${host}/auctions/recentAuction/${id}`
const advancedSearchUrl = `${host}/auctions/search`
const auctionStateUrl = `${host}/auctionState`
const auctionsUrl = `${host}/auctions`
const auctionUrl = (id) => `${auctionsUrl}/${id}`
const countUrl = (id) => `${auctionsUrl}/count/${id}`
const auctionMisedUrl = (id) => `${auctionsUrl}/mised/${id}`
// categories
const categoriesUrl = `${host}/categories`
const categoryUrl = (id) => `${categoriesUrl}/${id}`
// reloads
const reloadsUrl = `${host}/reloads`
const reloadValidationUrl = `${reloadsUrl}/validations`
// settings
const settingsUrl = `${host}/settings`
const settingUrl = (id) => `${settingsUrl}/${id}`
// statistics
const turnoverUrl = `${host}/statistics/turnover`
const auctionsStatsUrl = `${host}/statistics/auctions`
//AppUser
const appUsersUrl = `${host}/users/appUsers`

//HIU
const loginUrl = `${host}/Etudiant/connexion/login`
const registerUrl = `${host}/Etudiant/connexion/inscription`
//project
const AllprojectUrl = `${baseProjectUrl}/selectAll`
const createprojectUrl = `${baseProjectUrl}/create`
const updateprojectUrl = `${baseProjectUrl}/update`
const createTacheUrl = `${baseProjectUrl}/tache/create`
const createsousTacheUrl = `${baseProjectUrl}/soustache/create`
const updateTacheUrl = `${baseProjectUrl}/update/create`
const stateUrl = `${baseProjectUrl}/etat/tache`;
const statesous_tacheUrl = `${baseProjectUrl}/etat/sous_tache`;
const TacheUrl = `${baseProjectUrl}/findCustomize/tache`
const SousTacheUrl = `${baseProjectUrl}/findCustomize/sous_tache`
//publication
const getAllPubUrl = `${basePublicationUrl}/selectAll`
const createAllPubUrl = `${basePublicationUrl}/create`
const getOnePubUrl = `${basePublicationUrl}/find/pub`
const createOneComsUrl = `${basePublicationUrl}/commentaire/create`
const noteComsUrl = `${basePublicationUrl}/note_commentaire/create`
const notefindComsUrl = `${basePublicationUrl}/note_commentaire/find`
//pomodoro
const lastPomodoroUrl = `${host}/Etudiant/pomodoro/last`
const createPomodoroUrl = `${host}/Etudiant/pomodoro/create`

const createDemandeStage = `${host}/stage/insererprofil`
const ListStageUrl = `${host}/stage/offrestage`
const ProfilStageUrl = `${host}/stage/profil`


/* api calls */
// Generic
export const getCall = (url, auth = false) => {
  let config = {}
  if (auth) {
    config = { headers: { Authorization: `Bearer ${localStorage.getItem('appUser-token')}` } }
  }
  return axios
    .get(url, config)
    .then((res) => ( ((res.status === 200)||(res.status===201)||(res.status===202)) ? res : Promise.reject(res)))
    .then((res) => res.data.data)
}

export const postCall = (url, data, auth = false) => {
  let config = {}
  if (auth) {
    config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('appUser-token') } }
  }
  return axios
    .post(url, data, config)
    .then((res) => ( ((res.status === 200)||(res.status===201)||(res.status===202)) ? res : Promise.reject(res)))
    .then((res) => res.data.data)
}

export const putCall = (url, data, auth = false) => {
  let config = {}
  if (auth) {
    config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('appUser-token') } }
  }
  return axios
    .put(url, data, config)
    .then((res) => (res.status === 200 ? res : Promise.reject(res)))
    .then((res) => res.data.data)
}

//HIU
export const register = (user) => {
  return postCall(registerUrl, user)
}

// Authentication
export const login = (user) => {
  return postCall(loginUrl, user)
}
export const logout = () => {
  return getCall(logoutUrl, true)
}

// Auctions
export function getAuctionListDesc(id){
  console.log(getAuctionListDescUrl(id))
  return getCall(getAuctionListDescUrl(id), true)
}
export const advancedSearch = (data) =>{
  return postCall(advancedSearchUrl,data, true)
}
export function getAuctionState() {
  return getCall(auctionStateUrl, true)
}
export function getAuctions() {
  return getCall(auctionsUrl, true)
}
export function getAuction(id) {
  return getCall(auctionUrl(id), true)
}
export function updateAuction(id, data) {
  return putCall(auctionUrl(id), data, true)
}
export function count(id) {
  return getCall(countUrl(id),true)
}
export function getAuctionMised(id) {
  return getCall(auctionMisedUrl(id),true)
}

export function encherir(id,bidid,amount) {
  return getCall(bidUrl(id,bidid,amount),true)
}
// Categories
export function getCategories() {
  return getCall(categoriesUrl,true)
}
export function getCategory(id) {
  return getCall(categoryUrl(id), true)
}

export function updateCategory(id, data) {
  return putCall(categoryUrl(id), data, true)
}

export function addCategory(category) {
  return postCall(categoriesUrl, category, true)
}

// Reloads
export function getReloads() {
  return getCall(reloadsUrl, true)
}
export function validateReloads(reload) {
  return postCall(reloadValidationUrl, reload, true)
}

// Settings
export function getSettings() {
  return getCall(settingsUrl, true)
}
export function getSetting(id) {
  return getCall(settingUrl(id), true)
}

export function updateSetting(id, data) {
  return putCall(settingUrl(id), data, true)
}

export function addSetting(category) {
  return postCall(settingsUrl, category, true)
}

export function getTurnoverStats() {
  return getCall(turnoverUrl, true)
}

export function getAuctionsStats() {
  return getCall(auctionsStatsUrl, true)
}

//AppUser
export function getAppUser() {
  return getCall(appUsersUrl,true)
}
//hiu
//select All project by etudiant
export function getAllproject(idEtudiant){
  return getCall(AllprojectUrl+"/"+idEtudiant,true)
}
export function getTacheByProject(idtache){
  return getCall(TacheUrl+"/"+idtache,true)
}
export function getSousTacheByTache(idSoustache){
  return getCall(SousTacheUrl+"/"+idSoustache,true)
}

export function CreateProject(project) {
  return postCall(createprojectUrl, project, true)
}
export function updateProject(project) {
  return postCall(updateprojectUrl, project, true)
}
export function CreateTache(Tache) {
  return postCall(createTacheUrl, Tache, true)
}
export function createSousTache(soustache){
  return postCall(createsousTacheUrl, soustache, true)

}
export function updateTache(Tache) {
  return postCall(updateTacheUrl, Tache, true)
}
export function ChangeStateTache(idtache,state){
  let etat = (state===0)?1:0;
  return getCall(stateUrl+"/"+idtache+"/"+etat,true)
}
export function ChangeStatesSousTache(idsoustache,state){
  let etat = (state===0)?1:0;
  return getCall(statesous_tacheUrl+"/"+idsoustache+"/"+etat,true)
}

//publication
export function selectAllpub(){
  return getCall(getAllPubUrl,true)
}
export function selectOnepub(id){
  return getCall(getOnePubUrl+"/"+id,true)
}

export function createComs(coms){
  return postCall(createOneComsUrl, coms, true)
}
export function createpub(pub){
  return postCall(createAllPubUrl, pub, true)
}
export function makeNoteComs(note){
  return postCall(noteComsUrl, note, true)
}
// notefindComsUrl
export function getNote(idcom,idetu){
   return getCall(notefindComsUrl+"/"+idcom+"/"+idetu,true)
}

// pomodoro
export function lastPomodoro(){
  return getCall(lastPomodoroUrl,true)
}
export function createPomodoro(durre,pause){
  return getCall(createPomodoroUrl+"/"+durre+"/"+pause,true)
}

export function insertProfil(EtudiantProfil) {
  return postCall(createDemandeStage,EtudiantProfil,true)
}
export function getListOffer(idEtudiant){
  return getCall(ListStageUrl+"/"+idEtudiant,true)
}
export function getProfilEtudiant(idEtudiant){
  return getCall(ProfilStageUrl+"/"+idEtudiant,true)
}

