import React from "react";

const DropDownSelect = ({ items, click, open, style, type }) => {
  return type === "flex" ? (
    <ul
      className={
        open
          ? "openDropFlex dropdownSelect dropDisplayFlex"
          : "closeDrop dropdownSelect dropDisplayFlex"
      }
      style={style}
    >
      {items.map((item, i) => (
        <li onClick={click(item)} className="dropdownSelectItem" key={i}>
          {item?.symbol && <span>{item.symbol}</span>} {item.name}{" "}
        </li>
      ))}
    </ul>
  ) : (
    <ul
      className={open ? "openDrop dropdownSelect" : "closeDrop dropdownSelect"}
      style={style}
    >
      {items.map((item, i) => (
        <li onClick={click(item)} className="dropdownSelectItem" key={i}>
          {item?.symbol && <span>{item.symbol}</span>} {item.name}{" "}
        </li>
      ))}
    </ul>
  );
};

export default DropDownSelect;
