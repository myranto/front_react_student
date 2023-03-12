import { CardMedia, TextField, Select, MenuItem, InputLabel, FormControl, Slider, TableRow, TableContainer, TableBody, Table, TableCell, Paper, Chip, Button } from '@mui/material';
import * as React from 'react';
import { getCategories, getAppUser, getAuctionState, advancedSearch } from '../../../../database/Api';
import '../../../../css/gallery.css';

const minDistance = 100000;
const prixMin = 0;
const prixMax = 90000000;

const AdvancedSearch = () => {
  const [prix, setprix] = React.useState([prixMin, prixMax]);
  const [categories, setCategories] = React.useState([]);
  const [allCategories, setallCategories] = React.useState([])
  const [allUsername, setAllUsername] = React.useState([])
  const [username, setUsername] = React.useState([]);
  const [allAuctionState, setAllAuctionState] = React.useState([])
  const [auctionState, setAuctionState] = React.useState([])
  const [startDate1, setStartDate1] = React.useState('')
  const [startDate2, setStartDate2] = React.useState('')
  const [endDate1, setEndDate1] = React.useState('')
  const [endDate2, setEndDate2] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [searchResult, setSearchResult] = React.useState([])

  const baseUrl = process.env.PUBLIC_URL;

  const link =
baseUrl+'/auctions/'

  React.useEffect(() => {
    getCategories()
      .then((data) => {
        setallCategories(data)
      })
      .catch((error) => {
      })
    getAppUser()
      .then((data) => {
        setAllUsername(data)
      }).catch((error) => {
      })
    getAuctionState()
      .then((data) => {
        setAllAuctionState(data)
      }).catch((error) => {
      })
  }, []);
  //description
  const addDescription = (event) => {
    setDescription(event.target.value);
  };
  //Interval prix
  const prixInterval = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setprix([Math.min(newValue[0], prix[1] - minDistance), prix[1]]);
    } else {
      setprix([prix[0], Math.max(newValue[1], prix[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: prixMin,
      label: prix[0] + ' AR',
    },
    {
      value: prixMax,
      label: prix[1] + ' AR',
    },
  ];
  //for categories
  const selectedCategories = (event) => {
    setCategories(event.target.value)
  }
  //for appUser
  const selectedUsername = (event) => {
    setUsername(event.target.value)
  }
  //for auction State
  const selectedAuctionState = (event) => {
    setAuctionState(event.target.value)
  }
  //debut date

  const startDateChange1 = (event) => {
    setStartDate1(event.target.value);
  };
  const startDateChange2 = (event) => {
    setStartDate2(event.target.value);
  };
  //fin date
  const endDateChange1 = (event) => {
    setEndDate1(event.target.value);
  };
  const endDateChange2 = (event) => {
    setEndDate2(event.target.value);
  };
  //Submit
  const filtrer = () => {

    const data = {
      "description": description,
      "category": categories,
      "username": username,
      "auctionState": auctionState,
      "startDate1": startDate1,
      "startDate2": startDate2,
      "endDate1": endDate1,
      "endDate2": endDate2,
      "prix": prix

    }
    advancedSearch(data)
      .then((data) => {
        setSearchResult(data)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(data)

  }
  return (
    <><h3>Recherche avancée</h3>
      <div className="bg-light min-vh-10 d-flex flex-row align-items-center">

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell><TextField style={{ width: '100%' }} size='small' id="outlined-basic" label="Titre et description" variant="outlined" value={description} onChange={addDescription}>

                </TextField></TableCell>

              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell><FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                  <Select multiple
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categories}
                    onChange={selectedCategories}
                    renderValue={(selected) => <div>
                      {selected.map((selected) => (
                        <Chip key={selected.id} label={selected.name} />
                      ))}
                    </div>}
                  >{allCategories.map((allCategories) => <MenuItem value={allCategories}>{allCategories.name}</MenuItem>)}

                  </Select>
                </FormControl></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell><FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Utilisateur</InputLabel>
                  <Select multiple
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={username}
                    onChange={selectedUsername}
                    renderValue={(selected) => <div>
                      {selected.map((selected, index) => (
                        <Chip key={index} label={selected.username} />
                      ))}
                    </div>}
                  >{allUsername.map((allUsername) => <MenuItem value={allUsername}>{allUsername.username}</MenuItem>)}
                  </Select>
                </FormControl></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Etat</InputLabel>
                    <Select multiple
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={auctionState}
                      onChange={selectedAuctionState}
                      renderValue={(selected) => <div>
                        {selected.map((selected) => (
                          <Chip key={selected.id} label={selected.value} />
                        ))}
                      </div>}
                    >{allAuctionState.map((allAuctionState) => <MenuItem value={allAuctionState}>{allAuctionState.value}</MenuItem>)}
                    </Select>
                  </FormControl></TableCell>

              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell>
                  <InputLabel id="demo-simple-select-label">Mise actuelle de l'enchere</InputLabel>
                  <Slider
                    getAriaLabel={() => 'Prix interval'}
                    value={prix}
                    onChange={prixInterval}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={prixMin}
                    max={prixMax}
                    marks={marks} />

                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell>
                  <InputLabel id="demo-simple-select-label">Date debut de l'enchere</InputLabel>
                  <div>
                    <TextField type="date" style={{ width: '48%' }} size='small' id="start-date" variant="outlined" value={startDate1} onChange={startDateChange1} />
                    <TextField type="date" style={{ width: '48%' }} size='small' id="end-date" variant="outlined" value={startDate2} onChange={startDateChange2} />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell>
                  <InputLabel id="demo-simple-select-label">Date fin de l'enchere</InputLabel>
                  <div>
                    <TextField type="date" style={{ width: '48%' }} size='small' id="start-date" variant="outlined" value={endDate1} onChange={endDateChange1} />
                    <TextField type="date" style={{ width: '48%' }} size='small' id="end-date" variant="outlined" value={endDate2} onChange={endDateChange2} />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td,&:last-child th': { border: 0 } }}>
                <TableCell>
                  <Button variant="contained" onClick={filtrer}>Filtrer</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <h3>Resultat</h3>
                          
      {
        searchResult.map((search,index) => (
          

          <div class="gallery">
            <a target="_blank" href={link+search.id}>
              { search.images[0].photoPath &&<img src={search.images[0].photoPath} alt="Forest" width="100" height="100"/>}
              { !search.images[0].photoPath &&<img src={require("contact.png")} alt="Forest" width="100" height="100"/>}
            </a>
            {search.description && search.bidTop &&
            <div class="desc"><b><p>{search.title}</p></b><p>{search.description}</p><p>Mise actuelle: {search.bidTop.amount}</p></div>}
            {search.description && !search.bidTop &&
            <div class="desc"><b><p>{search.title}</p></b><p>{search.description}</p><p>Mise actuelle: {search.startingPrice} AR</p></div>}
          </div>
        
        ))
      }
    </>
  )
}
export default AdvancedSearch