import { CardMedia, TextField, Select, MenuItem, InputLabel, FormControl, Slider, TableRow, TableContainer, TableBody, Table, TableCell, Paper, Chip, Button } from '@mui/material';
import * as React from 'react';
import '../../../../css/gallery.css';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { encherir } from '../../../../database/Api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Encherir = () => {
  const [prix, setPrix] = React.useState('');
  const { id } = useParams()
  const navigate = useNavigate()
  const swal = withReactContent(Swal)

  console.log(id)
  const addPrix = (event) => {
    setPrix(event.target.value);
  };
  const bid = () => {
    encherir(localStorage.getItem('id'), id, prix).then(() => {
      const swalData = {
        icon: 'success',
        title: 'vous avez encheri',
        timer: 1000,
        showConfirmButton: false,
      }
      swal.fire(swalData).then(() => {
        navigate('/auctions/'+id)
      })
    })
        .catch((error) => {
          const swalData = {
            icon: 'error',
            title: 'Verifier que vous avez le montant ou vous suivez le bid-step',
            text: error.response.data.message,
          }
          swal.fire(swalData).then()
        })
    }
      
    return (
      <><TextField style={{ width: '100%' }} size='small' id="outlined-basic" label="Montant a encherir" variant="outlined" type="number" value={prix} onChange={addPrix}>

      </TextField><Button variant="contained" onClick={bid}>Encherir</Button></>
    )
  }
  export default Encherir