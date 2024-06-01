import React from "react";

function SubMenu({ activeTab, setActiveTab, listMenu, className = "" }) {
  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      {listMenu?.map((i) => (
        <TabItem
          key={i?.id}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          subMenuItem={i}
        />
      ))}
    </div>
  );
}

export default SubMenu;

function TabItem({ activeTab, setActiveTab, subMenuItem }) {
  const handleClickItem = () => {
    setActiveTab(subMenuItem);
  };

  return (
    <div
      onClick={handleClickItem}
      className={`cursor-pointer smooth-transform hover:bg-[#ccc] text-center px-6 text-base py-2 rounded-sm border ${
        subMenuItem?.id === activeTab?.id
          ? "bg-primary text-white hover:!bg-primary"
          : "text-black"
      }`}
    >
      {subMenuItem.name}
    </div>
  );
}
