import React, { useEffect, useState, MouseEvent } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Button, Menu, MenuItem, Checkbox, SvgIcon, Stack } from "@mui/material";
import "./Listing.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Filter } from "../Listing/TempFIiter";
import { Search } from "./TempSearch";
import { TempALLGMG } from "./TempALLGMG";
import DisplayData from "./DisplayData";
import PaginatedData from "./PaginatedData";
import Footer from "../Footer/Footer";
interface Dropdown {
  name: string;
  options: string[];
}

const dropdowns: Dropdown[] = [
  {
    name: "MediaType", options: ["Bus Shelter", "Hoardings","Hoardings and unipoles "] },
  {
    name: "City",
    options: ["North Delhi","East Delhi",
    "Noida",
    "NH1",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Vijayawada",
    "Baroda",
    "Kolkata"],
  },
];

const Listing: React.FC = () => {
  const [location,setLocation]=useState({});
  const [mediatype,setMediatype]=useState({});
  const [busData, setBusData] = useState<any[]>();
  const [filter_val, setFilter] = useState(false);
  const [search_val, setSearchVal] = useState(false);
  const [filter_value, setfilter_value] = useState<any>();
  const [selectedDropdown, setSelectedDropdown] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notshow, setnotshow] = useState(true);
  const [finalValue, setfinalValue] = useState<any>();
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [checked, setChecked] = useState(false);


  
  const fetchData = async (formValues: any) => {
    try {
      // if (Object.keys(formValues).length === 0) {
      //   const response = await fetch(
      //     "https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getAllGmgData",
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   if (response.ok) {
      //     const data = await response.json();
      //     setBusData(data);
      //   } else {
      //     console.error(`Request failed with status: ${response.status}`);
      //   }
      // } else {
        const response = await fetch(
          "https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getLocationFilter",
          {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
            },
           
          }
        );
        if (response.ok) {
          const data = await response.json();
           
           console.log(data)
        } else {
          console.error(`Request failed with status: ${response.status}`);
        }
      }
    catch (error) {
      console.error(error);
    }
  };
 
      
       

  useEffect(() => {
    fetchData({});
  }, []);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    dropdownName: string
  ) => {
    setSelectedDropdown(dropdownName);
    setAnchorEl(event.currentTarget);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [selectedDropdown]: prevSelectedOptions[selectedDropdown]
        ? [...prevSelectedOptions[selectedDropdown], option]
        : [option],
    }));
  };

  const handleOptionDeselect = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [selectedDropdown]: prevSelectedOptions[selectedDropdown].filter(
        (selectedOption) => selectedOption !== option
      ),
    }));
  };

  const sendsearch = () => {
    setfinalValue(value);
  };
  const handlesearch = (e: any) => {
    setValue(e.target.value);
    setSearchVal(true);
    setFilter(false);
  };
  const handleApplyFilter = (formValue: any) => {
    const formValues: Record<string, string[]> = {};

    dropdowns.forEach((dropdown) => {
      const selectedOptionsForDropdown = selectedOptions[dropdown.name] || [];
      if (selectedOptionsForDropdown.length > 0) {
        formValues[dropdown.name] = selectedOptionsForDropdown;
      }

      setfilter_value(formValues);
      console.log(formValues);
      setFilter(true);
    });
  };
  const delete_b = () => {
    setLoad(true);
    setnotshow(false);
  };
  const handleClose = () => {
    setSelectedDropdown("");
    setAnchorEl(null);
  };

  return (
    <div className="drop">
      <div className="dropdowns">
        
        <div
          className="dropdown-filter"
          style={{ marginLeft:'4px', marginTop: 40 }}
        >
          {dropdowns.map((dropdown, index) => (
            <div key={index}>
              <Button
                variant="outlined"
                color="primary"
                onClick={(event) => handleClick(event, dropdown.name)}
                endIcon={
                  <SvgIcon>
                    <path d="M7 10l5 5 5-5z" />
                  </SvgIcon>
                }
                sx={{ borderColor: "purple", borderRadius: 50 }}
              >
                {dropdown.name}
              </Button>
              <Menu
                className="custom-menu"
                keepMounted
                anchorEl={anchorEl}
                open={selectedDropdown === dropdown.name}
                onClose={handleClose}
                style={{display:"flex",flexDirection:"column"}}
              ><div>
                {dropdown.options.map((option, index) => (
                  <MenuItem key={index} >
                    <Checkbox
                      checked={selectedOptions[dropdown.name]?.includes(option) || false}
                      onChange={() => {
                        if (selectedOptions[dropdown.name]?.includes(option)) {
                          handleOptionDeselect(option);
                        } else {
                          handleOptionSelect(option);
                        }
                      }}
                    />
                    {option}
                  </MenuItem>
                ))}</div>
              </Menu>
            </div>
          ))}
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder=" Search...."
            onChange={handlesearch}
            style={{ fontSize: 15 }}
          />
          <div className="hello">
            <SearchIcon className="search-icon" />
          </div>
        </div>
        <br />
        <div>
          {filter_val ? (
            <Filter formvalue={filter_value} />
          ) : search_val ? (
            <Search value={value} />
          ) : (
            <PaginatedData />
          )}
        </div>
        {/* <div className="listing">
        
        {busData ? (
          busData.slice(0, 12).map((shelter: any) => (
            <Paper key={shelter.id} className="paper">
              <Link to={`/details/${shelter.id}`} style={{ textDecoration: 'none' }}>
                <div>
                  <img
                    src={shelter.image}
                    alt={shelter.name}
                    style={{ width: '200px', height: '150px' }}
                  />
                </div>
                <div className="media-name">
                  <Typography><strong>{shelter.address}</strong></Typography>
                </div>
                <div className="price-tag">
                  <LocalOfferIcon className="price-icon" />
                  <span className="price">{shelter.price}</span>
                </div>
                <div>
                  <Typography>{shelter.sqft}</Typography> sq.ft
                </div>
              </Link>
            </Paper>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>  */}

        {/* {load && <DisplayData busData={busData} />} */}
        {/* {load && <PaginatedData />}
      
      
      {notshow &&
        <div className='buttonLoad'>
          <Button style={{ border: '2px solid blue', backgroundColor: 'blue', color: 'white', width:'175px',height:'40px'}} onClick={delete_b} >Load More...</Button>
        </div>
      } */}
      </div>
      
    </div>
  
  );
};

export default Listing;
