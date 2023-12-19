import React, { useEffect, useState } from "react";
import { getFilterGmgData } from "../Api/getFilterGmgData";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button, Menu, MenuItem, Checkbox, SvgIcon } from '@mui/material';
import './Listing.css';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';

export const Filter = ({ formvalue }: { formvalue: { MediaType: string[], City: string[] } }) => {
  interface Dropdown {
    name: string;
    options: string[];
  }
  // const dropdowns: Dropdown[] = [
  //   { name: 'MediaType', options: ['Bus Shelter', 'Hoardings'] },
  //   { name: 'address', options: ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Jaipur'] },
  // ];
  const [busData, setBusData] = useState<any[]>([]);
  // const { formValue } = useParams();

  const [selectedDropdown, setSelectedDropdown] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState('');
  const [displayedDataCount, setDisplayedDataCount] = useState(12); // Initially display 12 items
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false); 

  // Check if MediaType or address has no value and set them to empty square brackets
  if (!formvalue.MediaType || formvalue.MediaType.length === 0) {
    formvalue.MediaType = [];
  }
  if (!formvalue.City || formvalue.City.length === 0) {
    formvalue.City = [];
  }

  useEffect(() => {
    (async () => {
      try {
        console.log(formvalue);
        const { MediaType,City } = formvalue;
        console.log(MediaType,City);
        setLoading(true);
        const response: any = await getFilterGmgData({ MediaType, City });
        const data = await response.json();
        setBusData(data);
      } catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
    }
    })();
  }, [formvalue]);

  const handleLoadMore = () => {
    if (Array.isArray(busData)) {
      const newDisplayedDataCount = displayedDataCount + 12; // Load another 12 items
      if (newDisplayedDataCount <= busData.length) {
        setDisplayedDataCount(newDisplayedDataCount);
      }
    }
  };

  return (
    <div className="listing">
      {busData ? Array.isArray(busData) && busData.slice(0, displayedDataCount).map((shelter: any, index) => (
        <Paper key={shelter.Id} className="paper">
          <Link to={`/details/${shelter.Id}`} style={{ textDecoration: 'none' }}>
            <div className="imageWrapper">
              <img
              className="imagePage"
                src={shelter.Image}
                alt={shelter.name}
                style={{ width: '280px', height: '150px' ,borderRadius:'10px'}}
              />
            </div>
            <div className="media-name">
              <Typography><strong>{shelter.Location}</strong></Typography>
            </div>
            <div className="price-tag" style={{marginLeft:'80px'}}>
              <LocalOfferIcon className="price-icon" />
              <span className="price">{shelter.Price}</span>
            </div>
            <div>
              <Typography style={{marginLeft:"99px"}}>{shelter.AreaSqFt} sq.ft</Typography>
            </div>
          </Link>
        </Paper>
      )):<p>No data Available</p>}
      {loading && <div className="loading">Loading more data...</div>}
            {displayedDataCount < busData.length && !loading && (
                <div className="buttonLoad">
                    <button onClick={handleLoadMore} disabled={loading} className="button1">
                        Load More...
                    </button>
                </div>
            )}
    </div>
  );
};
