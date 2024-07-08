import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { tabsData } from './mockData/tabsData';
import CustomTabPanel from './components/CustomTabPanel';
import sprite from './assets/sprite.svg';
import { SvgIcon } from '@mui/material';
import { Reorder } from 'framer-motion';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function App() {
  const [tabsList, setTabsList] = useState(tabsData);
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div className="container">
        <Reorder.Group
          axis="x"
          values={tabsList}
          onReorder={setTabsList}
          className="tab-list"
        >
          {tabsList.map((item) => (
            <Reorder.Item
              whileDrag={{
                backgroundColor: '#7F858D',
                color: '#ffffff',

                boxShadow: 'rgba(0,0,0,0.12) 0px 1px 3px ',
              }}
              value={item}
              className="tab-item"
              key={item.id}
            >
              {item.label}
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <Button
          onClick={handleOpenMenu}
          sx={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
        >
          Додаткові
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CustomTabPanel value={tabIndex} index={tabIndex}>
            tab1
          </CustomTabPanel>
        </Popover>
      </div>
    </>
  );
}
