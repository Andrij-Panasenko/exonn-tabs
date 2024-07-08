// import './main.css';
// import style from '../src/styles/main.css'
// console.log("🚀 ~ style:", style)
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
    <div className="container"
      // style={{ overflowX: 'auto' }}
    >
      <Box sx={{
        width: '100%',
        // overflow: 'scroll'
      }}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          style={{ position: 'relative', display: 'flex', gap: '10px' }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="tablist"
            // variant="scrollable"
            // scrollButtons="auto"
          >
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#dashboard'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Dashboard"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#banking'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Banking"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#telephone'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Telefonie"
              {...a11yProps(2)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#accounting'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Accounting"
              {...a11yProps(3)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#shop'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Verkauf"
              {...a11yProps(4)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#statistic'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Statistik"
              {...a11yProps(5)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#mail'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Post Office"
              {...a11yProps(6)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#admin'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Administration"
              {...a11yProps(7)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#help'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Help"
              {...a11yProps(8)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#cube'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Warenbestand"
              {...a11yProps(9)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#list'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Auswahllisten"
              {...a11yProps(10)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#shopping-cart'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Einkauf"
              {...a11yProps(11)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#bills'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Rechn"
              {...a11yProps(12)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#storage'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Lagerverwaltung"
              {...a11yProps(13)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#shop'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Verkauf"
              {...a11yProps(14)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#mail'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Post Office"
              {...a11yProps(15)}
            />
            <Tab
              icon={
                <SvgIcon
                  style={{ width: '16px', height: '16px', marginRight: 10 }}
                >
                  <use href={sprite + '#telephone'}></use>
                </SvgIcon>
              }
              iconPosition="start"
              label="Telefonie"
              {...a11yProps(16)}
            />
          </Tabs>
          <Button
            onClick={handleOpenMenu}
            // sx={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
          >
            <SvgIcon style={{ width: '16px', height: '16px', margin: 0 }}>
              <use href={sprite + '#vector'}></use>
            </SvgIcon>
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
        </Box>
        {tabsData.map((data) => (
          <CustomTabPanel key={data.id} value={tabIndex} index={data.id}>
            {data.label}
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
}
