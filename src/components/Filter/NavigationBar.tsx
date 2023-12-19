import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem, Checkbox, SvgIcon } from '@mui/material';
import './NavigationBar.css';

interface Dropdown {
  name: string;
  options: string[];
}

const dropdowns: Dropdown[] = [
  { name: 'mediatype', options: ['busshelter', 'hoarding', 'Billboard'] },
  { name: 'location', options: ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Jaipur'] },
];

const NavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [data, setData] = useState<any>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, dropdownName: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDropdown(dropdownName);
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
      const selectedOptionsForDropdown = selectedOptions[dropdown.name]; // Define selectedOptionsForDropdown here
      if (selectedOptionsForDropdown && selectedOptionsForDropdown.length > 0) {
        formValues[dropdown.name] = selectedOptionsForDropdown;
      }
    });

    const fetchData = async (formValues: any) => {
      try {
        const response = await fetch('http://localhost:3000/dev/getAllFilterGmg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          const data = await response.json();

          setData(data);
          console.log({ data });
        } else {
          console.error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(formValues);
    console.log(formValues);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-bar">
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
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedDropdown === dropdown.name}
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
          </div>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={handleApplyFilter}>
        Apply Filter
      </Button>
    </div>
  );
};

export default NavigationBar;
