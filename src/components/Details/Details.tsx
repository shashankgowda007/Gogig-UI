import React, { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import Box, { Stack } from "@mui/material"
import { Paper, Typography,Grid, Container } from "@mui/material";
import Image from "@mui/icons-material/Image";
import image from './light.png';

import hoarding from './hoarding.png'
import LightbulbIcon from "@mui/icons-material/Lightbulb";
const Details: React.FC = () => {
  const { shelterId } = useParams<{ shelterId?: string }>();
  const [data, setData] = useState<any>(null);

  console.log({ shelterId });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getById/${shelterId}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData[0]);
          console.log("Fetched data:", jsonData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [shelterId]);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    
    <Container className="hoarding" >
      {data && (
        <>
         
          <div>
            <h1 className="heading_main">
              {data.MediaType}
              {data.Location}
            </h1>
          </div>
          <Paper>
          <Paper
            style={{
              backgroundColor: "#ff6702",
              display: "flex",
              alignItems: "center",
              // borderTopLeftRadius:'8px',
              // borderTopRightRadius:'8px',
              padding: "13px 10px 10px",
            }}
            className="section1"
          >
            <div className="image">
              <img
                src={data.Image}
                className="main_img"
                alt="Bus with hoarding"
                style={{ width: "250px", height: "180px" ,borderRadius:"10px"}}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                marginLeft: "82px",
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
              }}
            >
              
              <div style={{marginRight:"5px"}} className="s2">
                <div style={{ display:"flex",height:"55px"}}>
                  <div className="image_div">
                    <img className="img" src={hoarding} alt="hoardings"  height={"35px"} /></div>
                <div>
                <p className="name1">{data.MediaType}</p>
                    <p className="name_media">MEDIATYPE</p></div>
                  </div>
                <div style={{ display: "flex" }} >
                <div className="image_div">
                  <img className="img2" src={image} alt="lighting"  height={"35px"}  /></div>
                  <div>
                    <p className="name1">data_Illumination</p>
                    <p className="name_light">LIGHTING</p></div>
                    
                </div>
                
              </div>
             

              
                
                
             
            </div>
            <div className="line"></div>
            <div style={{ color: "white", paddingLeft: "35px" ,display:"flex"}}>
              <Typography className="paragrph_head">
                <strong style={{marginLeft:"25px"}}>
                  {data.MediaType} Ads in {data.Location}
                </strong>{" "}
                <div className="paragraph">
                will build brand awareness and recall among potential customers.
                These are out-of-home advertising tools targeting people who are
                waiting for their buses to arrive, commuting on the road, or
                just passing by. {data.MediaType} are displayed repeatedly, and
                due to their frequency, ads in bus shelters are a good
                  cost-effective option for wide reach</div>
              </Typography>
            </div>
            
            
          </Paper>
          
          {/* {/* <div className="keyInsight">
             <h5 className="heading2">Key Insight</h5>
            <ul className="orderkeyInsight">
            
              <h2 className="styleline"></h2> <li >Landmark <h4>{data.Location.slice(0,10) }....</h4></li>
              <h2 className="styleline"></h2><li>Id <h4>{ data.Id.slice(-4)}</h4></li>
              <h2 className="styleline"></h2><li className="qli">Quantity <h4>{1}</h4></li>
            </ul>
          </div> */}
          <Stack>
          <Stack
                       direction={{ xs: 'row', sm: 'column' }}
                     spacing={{ xs: 1, sm: 2, md: 4 }} sx={{marginTop:"25px",marginLeft:"25px",display:"flex"}}>
             <Typography variant="h4">Key Insight</Typography>
             </Stack>
             <Stack >
             <ul className="orderkeyInsight">
            
            <h2 className="styleline"></h2> <li >Landmark <h4>{data.Location.slice(0,10) }....</h4></li>
            <h2 className="styleline"></h2><li>Id <h4>{ data.Id.slice(-4)}</h4></li>
            <h2 className="styleline2"></h2><li className="qli">Quantity <h4>{1}</h4></li></ul>
             </Stack>
                 
          </Stack>
          </Paper> 

          

          
          {
           
            <Grid container spacing={5} >
            <Grid item xs={12} sm={12} md={12}>
              <div className="description">
                <div className="d1">
                  <Typography variant="h4"  className="heading">
                    {data.Heading1}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description1}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading2}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description2}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading3}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description3}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading4}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description4}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading5}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description5}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading6}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description6}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading7}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description7}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading8}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description8}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading9}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description9}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h4" component="h1" className="heading">
                    {data.Heading10}
                  </Typography>
                  <Typography variant="h6" className="pf">
                    {data.Description10}
                  </Typography>
                </div>
              </div>
            </Grid>
            
          </Grid>}
      

        </>
      )}
      
    </Container>
  );
};

export default Details;
