import React from 'react';
import Popover from '@mui/material/Popover';
import CustomTabPanel from './CustomTabPanel';
import { tabsData } from '../mockData/tabsData';

export default function PopoverHiddenTabs({
  openUnvisiblePinns,
  anchorEl,
  handleCloseMenu,
  hiddenTabs,
  setTabIndex,
  tabIndex,
}) {
  return (
    <>
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
    </>
  );
}
