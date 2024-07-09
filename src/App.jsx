import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useState, useEffect, useRef } from 'react';
import { tabsData } from './mockData/tabsData';
import CustomTabPanel from './components/CustomTabPanel';
import sprite from './assets/sprite.svg';
import { SvgIcon } from '@mui/material';
import { Reorder } from 'framer-motion';

const TABS_STORAGE_KEY = 'tabs';
const PINNED_TABS_KEY = 'pinned_tabs';

const getStoragedTabs = () => {
  const savedTabs = localStorage.getItem(TABS_STORAGE_KEY);
  return savedTabs ? JSON.parse(savedTabs) : tabsData;
};

const getPittedTabs = () => {
  const pinnedTabs = localStorage.getItem(PINNED_TABS_KEY);
  return pinnedTabs ? JSON.parse(pinnedTabs) : [];
};

export default function App() {
  const [tabsList, setTabsList] = useState(getStoragedTabs);
  const [hiddenTabs, setHiddenTabs] = useState([]);
  const [pinnedTabs, setPinnedTabs] = useState(getPittedTabs);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pinnedAncorEL, setPinnedAncorEL] = useState(null);
  const [tabsContainerWidth, setTabsContainerWidth] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    window.localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabsList));
  }, [tabsList]);

  useEffect(() => {
    const containerResize = () => {
      const width = document.getElementById('tabs').clientWidth;
      setTabsContainerWidth(width);
    };
    containerResize();
    window.addEventListener('resize', containerResize);
    return () => {
      window.removeEventListener('resize', containerResize);
    };
  }, [tabsContainerWidth]);

  //defining hidden tabs
  useEffect(() => {
    if (!tabsContainerWidth || !tabsContainerRef.current) return;

    const tabsContainer = tabsContainerRef.current;
    const containerWidth = tabsContainerWidth;

    const tabs = tabsContainer.querySelectorAll('.tab-item');

    const hiddenTabsArray = [];

    tabs.forEach((tab) => {
      console.log(" tab.oddset:", tab.offsetLeft)
      console.log('tab.offsetWidth', tab.offsetWidth);
      const tabId = tab.getAttribute('data-tab-id'); // Getting tab id
      const tabObject = tabsList.find((t) => t.id === tabId); //Find specific tab in tabList array
      if (tab.offsetLeft - 100 + tab.offsetWidth > containerWidth) {
        hiddenTabsArray.push(tabObject);
      }
    });

    setHiddenTabs(hiddenTabsArray);
  }, [tabsContainerWidth, tabsList]);

  const handleReorder = (newTablist) => {
    setTabsList(newTablist);
  };

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenPinnedTabs = (event) => {
    setPinnedAncorEL(event.currentTarget);
  };

  const handleClosePinnedTabs = () => {
    setPinnedAncorEL(null);
  };

  const pinnTabHandler = (tab) => {
    setPinnedTabs((prevTabs) => {
      const updatedPinns = [...prevTabs, tab];
      localStorage.setItem(PINNED_TABS_KEY, JSON.stringify(updatedPinns));
      return updatedPinns;
    });
    setTabsList((prev) => prev.filter((t) => t.id !== tab.id));
  };

  const deletePinnedTabHandler = (tab) => {
    setPinnedTabs((prev) => {
      const updatedPinns = prev.filter((t) => t.id !== tab.id);
      localStorage.setItem(PINNED_TABS_KEY, JSON.stringify(updatedPinns));
      return updatedPinns;
    });

    setTabsList((prev) => [tab, ...prev]);
  };

  const openUnvisiblePinns = Boolean(anchorEl);
  const openPinnedTabs = Boolean(pinnedAncorEL);
  return (
    <>
      <div className="container">
        <Button
          onClick={handleOpenPinnedTabs}
          sx={{ position: 'absolute', top: '100px', left: '0', zIndex: '1' }}
        >
          <svg width="16" height="16">
            <use xlinkHref={sprite + '#storage'}></use>
          </svg>
        </Button>
        <Popover
          open={openPinnedTabs}
          anchorEl={pinnedAncorEL}
          onClose={handleClosePinnedTabs}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {pinnedTabs.length === 0 && <CustomTabPanel>No pinns</CustomTabPanel>}
          {pinnedTabs.map((item) => (
            <CustomTabPanel
              onClick={() => setTabIndex(item.id)}
              key={item.id}
              value={tabIndex}
              index={tabIndex}
            >
              <div className="pinned-tab-wrapp">
                <p>{item.label}</p>
                <p
                  className="delete-pinn"
                  onClick={() => deletePinnedTabHandler(item)}
                >
                  X
                </p>
              </div>
            </CustomTabPanel>
          ))}
        </Popover>
        <Reorder.Group
          id="tabs"
          axis="x"
          values={tabsList}
          onChange={handleChange}
          onReorder={handleReorder}
          className="tab-list"
          ref={tabsContainerRef}
        >
          {tabsList.map((item) => (
            <Reorder.Item
              onClick={() => setTabIndex(item.id)}
              data-tab-id={item.id}
              whileDrag={{
                backgroundColor: '#7F858D',
                color: '#ffffff',

                boxShadow: 'rgba(0,0,0,0.12) 0px 1px 3px ',
              }}
              value={item}
              className="tab-item"
              key={item.id}
              id={item.id}
            >
              <p>{item.label}</p>
              <span className="tooltip" onClick={() => pinnTabHandler(item)}>
                <svg width="16" height="16">
                  <use xlinkHref={sprite + '#pinn'}></use>
                </svg>
                Pinn tab
              </span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <Button
          onClick={handleOpenMenu}
          sx={{ position: 'absolute', top: '90px', right: '0', zIndex: '1' }}
        >
          <svg width="16" height="16">
            <use xlinkHref={sprite + '#vector'}></use>
          </svg>
        </Button>
        <Popover
          open={openUnvisiblePinns}
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
          {hiddenTabs.map((tab) => (
            <CustomTabPanel
              onClick={() => setTabIndex(tab.id)}
              key={tab.id}
              value={tabIndex}
              index={tabIndex}
            >
              {tab.label}
            </CustomTabPanel>
          ))}
        </Popover>
        {tabsData.map((data) => (
          <CustomTabPanel key={data.id} value={tabIndex} index={data.id}>
            {data.label}
          </CustomTabPanel>
        ))}
      </div>
    </>
  );
}
