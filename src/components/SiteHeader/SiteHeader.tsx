import React from 'react';
import './SiteHeader.css';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getAllFilterGmg } from '../../clients/applyFiilter';
import gmglogo from "../../assets/gmglogo.png";
import { Button, Container } from '@mui/material';
import { busurl } from "../../clients/baseurls";
// import Button from '@mui/material';
import { Link } from 'react-router-dom';


const SiteHeader: React.FC = () => {
  const [value, setValue] = useState('');
  const url = `${busurl}/searchGMG?search={value}`;
  return (
    
    <header className="site-header" style={{position:'fixed',backgroundColor:'white',width:'100%',zIndex:99,justifyContent:"space-between",padding:"25px"}}>
      <Link to={"./"}><div className="logo" ><img src={gmglogo} alt="Ginger Media" style={{ width: '130px' }} />
        
      </div></Link>
     <div className='list'>
        <ul>
          <Link to={"./"} style={{textDecoration:"none"}}><li>HOME</li></Link>
         
          
         
        </ul>

     </div>
    </header>
   
    
  );
};

export default SiteHeader;
