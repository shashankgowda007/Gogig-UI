import React from 'react';
import './Footer.css';
import gmglogo from '../../assets/gmglogo.png';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Typography ,Container, backdropClasses} from '@mui/material';

const Footer: React.FC = () => {
  return (
    
    <div className="footer" >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={5} className="left-section">
          <div className='left_img'>
            <img
              src={gmglogo}
              alt="GMG Logo"
              height="150px"
              style={{ width: '100%', maxWidth: '150px' }}
            />
          </div>
          <div className="social-icons" >
            <IconButton color="primary">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="primary">
              <InstagramIcon />
            </IconButton>
            <IconButton color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary">
              <YouTubeIcon />
            </IconButton>
            <IconButton color="primary">
              <WhatsAppIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className="middle-section">
          <Typography>
            <span className="bold">Services</span>
          </Typography>
          <p className='p1'>ATL Marketing Activities</p>
          <p className='p1'>BTL Marketing</p>
          <p className='p1'>Transit Advertising</p>
          <p className='p1'>Residential Branding</p>
          <p className='p1'>Fabrication and Mounting</p>
          <p className='p1'>Digital Services</p>
        </Grid>
        <Grid item xs={12} md={4} className="right-section">
          <Typography>
            <span className="bold">Get in Touch</span>
          </Typography>
          <p className='icon'>
            <RoomIcon />
            
              Rukmini Knowledge Park, Kattigenahalli,
               {/* SH 104, Srinivasa Nagar, Bengaluru, Karnataka 560064 */}
           
          </p>
          <p className='icon'>
            <PhoneIcon /> +91-9999999999
          </p>
          <p className='icon'>
            <EmailIcon /> contact@gingermediagroup.com
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
