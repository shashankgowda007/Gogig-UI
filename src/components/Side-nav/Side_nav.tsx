import React, { useEffect, useState, MouseEvent } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button, Menu, MenuItem, Checkbox, SvgIcon } from '@mui/material';
import '../Listing/Listing.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

interface Dropdown {
  name: string;
  options: string[];
}

const dropdowns: Dropdown[] = [
  { name: 'mediatype', options: ['busshelter', 'hoardings'] },
  { name: 'location', options: ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Jaipur'] },
];

const Side_nav: React.FC = () => {
  const [busData, setBusData] = useState<any[]>();
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const fetchData = async (formValues: any) => {
    try {
      if (Object.keys(formValues).length === 0) {
        const response = await fetch('http://localhost:3000/dev/getAllGmgData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBusData(data);
        } else {
          console.error(`Request failed with status: ${response.status}`);
        }
      }
      else {
        const response = await fetch('http://localhost:3000/dev/getAllFilterGmg ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
        if (response.ok) {
          const data = await response.json();
          setBusData(data);
        } else {
          console.error(`Request failed with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, dropdownName: string) => {
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

  const handleApplyFilter = () => {
    const formValues: Record<string, string[]> = {};

    dropdowns.forEach((dropdown) => {
      const selectedOptionsForDropdown = selectedOptions[dropdown.name] || [];
      if (selectedOptionsForDropdown.length > 0) {
        formValues[dropdown.name] = selectedOptionsForDropdown;
      }
    });

    fetchData(formValues);
  };

  const handleClose = () => {
    setSelectedDropdown('');
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="dropdowns">
        {dropdowns.map((dropdown, index) => (
          <div key={index}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => handleClick(event, dropdown.name)}
              endIcon={<SvgIcon><path d="M7 10l5 5 5-5z" /></SvgIcon>}
              sx={{ borderColor: 'purple', borderRadius: 50 }}
            >
              {dropdown.name}
            </Button>
            <Menu
              className="custom-menu"
              keepMounted
              anchorEl={anchorEl}
              open={selectedDropdown === dropdown.name}
              onClose={handleClose}
            >
              {dropdown.options.map((option, index) => (
                <MenuItem key={index}>
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
              ))}
            </Menu>
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <SearchIcon className="search-icon" />
            </div>
          </div>
        ))}
        <div>
          <Button variant="contained" color="primary" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </div>
      </div>
      )
    </div>)
}
export default  Side_nav;  