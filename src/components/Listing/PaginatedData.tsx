import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './Listing.css';
import { CircularProgress, Container } from '@mui/material';
import { CircularProgressClassKey } from '@mui/material';

interface DataItem {
    id: string;
    address: string;
    
}

function PaginatedData() {
    const [page, setPage] = useState<number>(1);
    const [busData, setBusData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

    const pageSize = 12;

    const fetchData = async (currentPage: number) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getAllGmgByPaging?page=${currentPage}&pageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const jsonData: DataItem[] = await response.json();
            if (currentPage === 1) {
                setBusData(jsonData); 
                setInitialLoadComplete(true);
            } else {
                setBusData((prevData) => [...prevData, ...jsonData]);
            }
            setPage(currentPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, []); 

    const handleLoadMore = () => {
        fetchData(page);
    };

    return (
        <Container>
            <div className="listing" >
                {initialLoadComplete ? (
                    busData.map((shelter: any) => (
                        <Paper key={shelter.id} className="paper" >
                            <Link to={`/details/${shelter.Id}`} style={{ textDecoration: 'none' }}>
                                <div className='imageWrapper'>
                                    <img 
                                        src={shelter.Image}
                                        className='imagePage'
                                        alt={shelter.name}
                                        style={{ width: '280px', height: '150px',borderRadius:'10px'  }}
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
                    ))
                ) : (
                    <div className='loading'>Loading <CircularProgress/></div>
                )}
            </div>
            {loading && initialLoadComplete && <div>Loading more data...</div>}
            {!loading && initialLoadComplete && (
                <div className='buttonLoad'>
                    <button onClick={handleLoadMore} disabled={loading} className='button1'>
                        Load More...
                    </button>
                </div>
            )}
        </Container>
    );
}

export default PaginatedData;
