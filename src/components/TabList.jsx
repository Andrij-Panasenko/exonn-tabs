import React from 'react';
import { Reorder } from 'framer-motion';
import sprite from '../assets/sprite.svg';

export default function TabList({
  tabsList,
  handleChange,
  tabsContainerRef,
  setTabIndex,
  pinnTabHandler,
  setTabsList,
}) {
  const handleReorder = (newTablist) => {
    setTabsList(newTablist);
  };

  return (
    <>
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
    </>
  );
}
