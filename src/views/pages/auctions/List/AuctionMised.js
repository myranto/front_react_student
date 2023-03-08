import { getAuctionMised } from '../../../../database/Api';
import '../../../../css/gallery.css';
import * as React from 'react';
const AuctionMised = () => {
  const [auctions, setAuctions] = React.useState([]);
  const baseUrl = process.env.PUBLIC_URL;

  const link =
  baseUrl+'/auctions/'
  React.useEffect(() => {
    getAuctionMised(localStorage.getItem('id'))
        .then((data) => {
          setAuctions(data)
        })
        .catch((error) => {
        })    
    }, []);


    return(
      <>
      <h3>Liste des enchères misé</h3>
                        
      {
        auctions.map((search,index) => (
          

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
      }</>
    );
}
export default AuctionMised