import React, { memo, useEffect, useState } from "react";
import Image from "./Image";

const pictureStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
};
const nameStyle = {
  fontSize: ".8rem",
};

function colorIndex(name) {
  const background = [
    "#140973",
    "#ced2d8",
    "#2eb85c",
    "#39f",
    "#f9b115",
    "#e55353",
    "#636f83",
    "#121212",
    "#15c7ac",
    "#779711",
    "#f1c40f",
    "#3498db",
    "#07bc0c",
    "#e74c3c",
    "#5856d6",
    "#ff2d55",
    "#4cd964",
  ];
  const content = !!name?.length && name.slice(0, 1).toUpperCase();
  let index = 0;
  if (["B", "J"].includes(content)) {
    index = 0;
  } else if (["K"].includes(content)) {
    index = 1;
  } else if (["A"].includes(content)) {
    index = 2;
  } else if (["V"].includes(content)) {
    index = 3;
  } else if (["W"].includes(content)) {
    index = 4;
  } else if (["C", "P", "Q"].includes(content)) {
    index = 5;
  } else if (["D", "Y", "Z"].includes(content)) {
    index = 6;
  } else if (["L", "M", "N"].includes(content)) {
    index = 7;
  } else if (["F"].includes(content)) {
    index = 8;
  } else if (["G"].includes(content)) {
    index = 9;
  } else if (["H"].includes(content)) {
    index = 10;
  } else if (["I"].includes(content)) {
    index = 11;
  } else if (["R", "S", "U"].includes(content)) {
    index = 12;
  } else if (["T"].includes(content)) {
    index = 13;
  } else if (["O"].includes(content)) {
    index = 14;
  } else if (["E"].includes(content)) {
    index = 15;
  }
  return background[index];
}
const TheAvartar = (props) => {
  const {
    firstName,
    surname,
    unitName,
    imageURL,
    style,
    getName,
    click,
    onMouseOver,
  } = props;
  let [color, setColor] = useState("");
  let colorSelect = "";

  let firstLetter, secondLetter, content;
  if (firstName && surname) {
    firstLetter = firstName.substring(0, 1);
    secondLetter = surname.substring(0, 1);
    content = firstLetter.concat(secondLetter).toUpperCase();
    colorSelect = firstName.substring(0, 1);
  }

  if (unitName) {
    firstLetter = unitName.substring(0, 2);
    content = firstLetter.toUpperCase();
    colorSelect = unitName.substring(0, 1);
  }
  useEffect(() => {
    setColor(colorIndex(firstName || unitName));
  }, [firstName, unitName]);

  const avatarStyle = {
    background: color,
    height: style?.height,
    width: style?.width,
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="avatar"
      style={avatarStyle}
      onClick={click}
      onMouseOver={onMouseOver ? onMouseOver : null}
      datacontent={
        getName &&
        `${firstName && firstName} ${surname && surname} ${
          unitName && unitName
        }`
      }
    >
      {!imageURL && content ? (
        <div style={nameStyle}>{content}</div>
      ) : (
        imageURL && (
          <Image
            src={imageURL}
            alt={firstName || unitName}
            pictureStyle={pictureStyle}
          />
        )
      )}
    </div>
  );
};

export default memo(TheAvartar);
