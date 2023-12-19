import React, { useEffect, useState } from "react";
import { getSearchGmgData } from "../Api/getSearchGmgData";
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './Listing.css';

export const Search = (value: any) => {
    const [busData, setBusData] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayedDataCount, setDisplayedDataCount] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);

            const response: any = await getSearchGmgData(value.value);
            console.log(response)
            const data = await response.json();

            if (Array.isArray(data)) {
                setBusData(data);
            } else {
                console.error("API response is not an array:", data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        if (searchValue === "") {
            
            fetchData();
        } else {
            
            fetchData();
        }
    }, [searchValue, value]);

    useEffect(() => {
        
        if (busData.length > 0) {
            setDisplayedDataCount(Math.min(10, busData.length));
        }
    }, [busData]);

    const handleLoadMore = () => {
        
        const newDisplayedDataCount = displayedDataCount + 10;
        if (newDisplayedDataCount < busData.length) {
            setDisplayedDataCount(newDisplayedDataCount);
        } else {
            setDisplayedDataCount(busData.length);
        }
    };

    return (
        <div className="listing">
            
            {busData && busData.slice(0, displayedDataCount).map((shelter: any) => (
                <Paper key={shelter.Id} className="paper">
                    <Link to={`/details/${shelter.Id}`} style={{ textDecoration: 'none' }}>
                        <div className="imageWrapper">
                            <img
                                src={shelter.Image}
                                className="imagePage"
                                alt={shelter.name}
                                style={{ width: '280px', height: '160px' ,borderRadius:'10px'}}
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
            ))}
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
