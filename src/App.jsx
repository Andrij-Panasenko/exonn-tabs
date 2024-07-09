import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useState, useEffect, useRef } from 'react';
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
  const [hiddenTabs, setHiddenTabs] = useState([]);
  const [pinnedTabs, setPinnedTabs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pinnedAncorEL, setPinnedAncorEL] = useState(null);
  const [tabsContainerWidth, setTabsContainerWidth] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  console.log('🚀 ~ App ~ tabIndex:', tabIndex);
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
  // useEffect(() => {
  //   if (!tabsContainerWidth && tabsContainerRef) return;

  //   const tabsContainer = tabsContainerRef.current;
  //   const containerWidth = tabsContainerWidth;

  //   const tabs = tabsContainer.querySelectorAll('.tab-item');

  //   const hiddenTabsArray = [];

  //   tabs.forEach((tab) => {
  //     if (tab.offsetLeft + tab.offsetWidth > containerWidth) {
  //       hiddenTabsArray.push(tab.textContent);
  //     }
  //   });

  //   setHiddenTabs(hiddenTabsArray);
  // }, [tabsContainerWidth]);

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
    console.log('🚀 ~ pinnTabHandler ~ tab:', tab);
    // setPinnedTabs(prevTabs => [...prevTabs, tab])
    // setTabsList(prev => prev.filrer(t=> t.id !== tab.id))
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
          <CustomTabPanel value={tabIndex} index={tabIndex}>
            pinned tab1
          </CustomTabPanel>
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
              <span class="tooltip" onClick={() => pinnTabHandler(item)}>
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
          {/* {hiddenTabs.map((tab) => (
            <div key={tab}>{tab}</div>
          ))} */}
          <CustomTabPanel value={tabIndex} index={tabIndex}>
            tab1
          </CustomTabPanel>
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

//  const handleChange = (event, newValue) => {
//    setTabIndex(newValue);
//  };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// return (
//   <div className="container" style={{ overflowX: 'auto' }}>
//     <Box
//       sx={{
//         width: '100%',
//         overflow: 'scroll',
//       }}
//     >
//       <Box
//         sx={{ borderBottom: 1, borderColor: 'divider' }}
//         style={{ position: 'relative', display: 'flex', gap: '10px' }}
//       >
//         <Tabs
//           value={tabIndex}
//           onChange={handleChange}
//           aria-label="tablist"
//           variant="scrollable"
//           scrollButtons="auto"
//         >
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#dashboard'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Dashboard"
//             {...a11yProps(0)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#banking'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Banking"
//             {...a11yProps(1)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#telephone'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Telefonie"
//             {...a11yProps(2)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#accounting'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Accounting"
//             {...a11yProps(3)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#shop'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Verkauf"
//             {...a11yProps(4)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#statistic'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Statistik"
//             {...a11yProps(5)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#mail'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Post Office"
//             {...a11yProps(6)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#admin'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Administration"
//             {...a11yProps(7)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#help'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Help"
//             {...a11yProps(8)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#cube'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Warenbestand"
//             {...a11yProps(9)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#list'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Auswahllisten"
//             {...a11yProps(10)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#shopping-cart'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Einkauf"
//             {...a11yProps(11)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#bills'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Rechn"
//             {...a11yProps(12)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#storage'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Lagerverwaltung"
//             {...a11yProps(13)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#shop'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Verkauf"
//             {...a11yProps(14)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#mail'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Post Office"
//             {...a11yProps(15)}
//           />
//           <Tab
//             icon={
//               <SvgIcon
//                 style={{ width: '16px', height: '16px', marginRight: 10 }}
//               >
//                 <use href={sprite + '#telephone'}></use>
//               </SvgIcon>
//             }
//             iconPosition="start"
//             label="Telefonie"
//             {...a11yProps(16)}
//           />
//         </Tabs>
//         <Button
//           onClick={handleOpenMenu}
//           // sx={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
//         >
//           <SvgIcon style={{ width: '16px', height: '16px', margin: 0 }}>
//             <use href={sprite + '#vector'}></use>
//           </SvgIcon>
//         </Button>
//         <Popover
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleCloseMenu}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//         >
//           <CustomTabPanel value={tabIndex} index={tabIndex}>
//             tab1
//           </CustomTabPanel>
//         </Popover>
//       </Box>
//       {tabsData.map((data) => (
//         <CustomTabPanel key={data.id} value={tabIndex} index={data.id}>
//           {data.label}
//         </CustomTabPanel>
//       ))}
//     </Box>
//   </div>
// );

// return (
//   <div
//     className="container"
//     style={{ position: 'relative', overflowX: 'auto' }}
//   >
//     <Box sx={{ width: '100%', overflow: 'scroll' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs
//           value={tabIndex}
//           onChange={handleChange}
//           aria-label="tablist"
//           variant="scrollable"
//           scrollButtons="auto"
//         >
//           {tabsData.map((data, index) => (
//             <Tab
//               key={data.id}
//               icon={
//                 <SvgIcon
//                   style={{ width: '16px', height: '16px', marginRight: 10 }}
//                 >
//                   <use href={sprite + `#${data.icon}`} />
//                 </SvgIcon>
//               }
//               iconPosition="start"
//               label={data.label}
//               {...a11yProps(index)}
//             />
//           ))}
//         </Tabs>
//       </Box>
//     </Box>
{
  /* <Button
  onClick={handleOpenMenu}
  sx={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
>
  Додаткові
</Button> */
}
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={handleCloseMenu}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//     >
//       <Box sx={{ p: 2 }}>
//         {tabsData.slice(tabsData.length - 5).map((data, index) => (
//           <Button
//             key={data.id}
//             onClick={() => {
//               setTabIndex(tabsData.length - 5 + index);
//               handleCloseMenu();
//             }}
//             sx={{ display: 'block', width: '100%', textTransform: 'none' }}
//           >
//             {data.label}
//           </Button>
//         ))}
//       </Box>
//     </Popover>
//     <CustomTabPanel value={tabIndex} index={tabIndex}>
//       {tabsData[tabIndex].content}
//     </CustomTabPanel>
//   </div>
// );
