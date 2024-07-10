import React from 'react';
import Popover from '@mui/material/Popover';
import CustomTabPanel from './CustomTabPanel';


export default function PopoverPinnedTabs({
  openPinnedTabs,
  pinnedAncorEL,
  handleClosePinnedTabs,
  pinnedTabs,
  setTabIndex,
  tabIndex,
  deletePinnedTabHandler,
}) {
  return (
    <>
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
    </>
  );
}
