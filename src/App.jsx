import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import { tabsData } from './mockData/tabsData';
import sprite from './assets/sprite.svg';
import TabList from './components/TabList';
import PopoverPinnedTabs from './components/PopoverPinnedTabs';
import PopoverHiddenTabs from './components/PopoverHiddenTabs';
import { PINNED_TABS_KEY, TABS_STORAGE_KEY } from './helpers/storageKeys';

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
      const tabId = tab.getAttribute('data-tab-id'); // Getting tab id
      const tabObject = tabsList.find((t) => t.id === tabId); //Find specific tab in tabList array
      if (tab.offsetLeft - 150 + tab.offsetWidth > containerWidth) {
        hiddenTabsArray.push(tabObject);
      }
    });

    setHiddenTabs(hiddenTabsArray);
  }, [tabsContainerWidth, tabsList]);

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
        <PopoverPinnedTabs
          openPinnedTabs={openPinnedTabs}
          pinnedAncorEL={pinnedAncorEL}
          handleClosePinnedTabs={handleClosePinnedTabs}
          pinnedTabs={pinnedTabs}
          setTabIndex={setTabIndex}
          tabIndex={tabIndex}
          deletePinnedTabHandler={deletePinnedTabHandler}
        />
        <TabList
          tabsList={tabsList}
          handleChange={handleChange}
          tabsContainerRef={tabsContainerRef}
          setTabIndex={setTabIndex}
          pinnTabHandler={pinnTabHandler}
          setTabsList={setTabsList}
        />
        <Button
          onClick={handleOpenMenu}
          sx={{ position: 'absolute', top: '90px', right: '0', zIndex: '1' }}
        >
          <svg width="16" height="16">
            <use xlinkHref={sprite + '#vector'}></use>
          </svg>
        </Button>
        <PopoverHiddenTabs
          openUnvisiblePinns={openUnvisiblePinns}
          anchorEl={anchorEl}
          handleCloseMenu={handleCloseMenu}
          hiddenTabs={hiddenTabs}
          setTabIndex={setTabIndex}
          tabIndex={tabIndex}
        />
      </div>
    </>
  );
}
