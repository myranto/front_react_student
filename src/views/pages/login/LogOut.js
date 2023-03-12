import {useNavigate} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const LogOut = () =>{
  const swal = withReactContent(Swal)
  const nav = useNavigate();
  if (sessionStorage.getItem("idEtudiant")!==null)
    sessionStorage.removeItem("idEtudiant")
  const swalData = {
    icon: 'success',
    title: 'log out reussi',
    timer: 1000,
    showConfirmButton: false,
  }
  swal.fire(swalData).then(() => {
    nav('/login')
  })
}
export default LogOut;
