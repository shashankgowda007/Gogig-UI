import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const DisplayData = ({ busData }: { busData: any }) => {
    return (
        <div className="listing">
            {busData ? (
                Object.keys(busData).map((id) => (
                    <Paper key={id} className="paper">
                        <Link to={`/details/${id}`} style={{ textDecoration: 'none' }}>
                            <div>
                                <img
                                    src={busData[id].Image}
                                    alt={busData[id].City}
                                    style={{ width: '200px', height: '150px' }}
                                />
                            </div>
                            <div className="media-name">
                                <Typography>
                                    <strong>{busData[id].Location}</strong>
                                </Typography>
                            </div>
                            <div className="price-tag">
                                <LocalOfferIcon className="price-icon" />
                                <span className="price">{busData[id].Price}</span>
                            </div>
                            <div>
                                <Typography>{busData[id].AreaSqFt}</Typography> sq.ft
                            </div>
                        </Link>
                    </Paper>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default DisplayData;
