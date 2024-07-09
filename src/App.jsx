import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useState, useEffect } from 'react';
import { tabsData } from './mockData/tabsData';
import CustomTabPanel from './components/CustomTabPanel';
import sprite from './assets/sprite.svg';
import { SvgIcon } from '@mui/material';
import { Reorder } from 'framer-motion';

const TABS_STORAGE_KEY = 'tabs';

const getStoragedTabs = () => {
  const savedTabs = localStorage.getItem(TABS_STORAGE_KEY);
  return savedTabs ? JSON.parse(savedTabs) : tabsData;
};

export default function App() {
  const [tabsList, setTabsList] = useState(getStoragedTabs);
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabsList));
  }, [tabsList]);

  const handleReorder = (newTablist) => {
    setTabsList(newTablist);
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
          onReorder={handleReorder}
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
          <svg width='16' height='16'>
            <use xlinkHref={ sprite + '#vector' }></use>
          </svg>
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
