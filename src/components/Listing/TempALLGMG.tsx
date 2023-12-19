import { useEffect, useState } from "react";
import { getSearchGmgData } from "../Api/getSearchGmgData";
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SearchIcon from '@mui/icons-material/Search';
import './Listing.css';

export const TempALLGMG = () => {
  const [busData, setBusData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response: any = await getSearchGmgData(searchValue);
        const data = await response.json();
        setBusData(data);
      } catch (e) {
        console.error(e);
      }
    };

    
    fetchData();
  }, [searchValue]);

  return (
    <div className="listing">
      
      {busData.length > 0 ? (
        busData.map((shelter: any) => (
          <Paper key={shelter.Id} className="paper" >
            <Link to={`/details/${shelter.id}`} style={{ textDecoration: 'none' }}>
              <div>
                <img
                  src={shelter.Image}
                  alt={shelter.name}
                  style={{ width: '200px', height: '150px' }}
                />
              </div>
              <div className="media-name">
                <Typography><strong>{shelter.Location}</strong></Typography>
              </div>
              <div className="price-tag">
                <LocalOfferIcon className="price-icon" />
                <span className="price">{shelter.Price}</span>
              </div>
              <div>
                <Typography>{shelter.AreaSqFt}</Typography> sq.ft
              </div>
            </Link>
          </Paper>
        ))
      ) : (
          <p>no data available</p>
      )}
    </div>
  );
};
