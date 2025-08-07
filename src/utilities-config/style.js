const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const background = "#4d0552";
const color = "#e3e3e3";
const arrowStyle = {
  fontSize: "1.4rem",
  cursor: "pointer",
};

const appBarStyle = {
  position: "fixed",
  background,
  color,
  boxShadow: "0px 0px 0px !important",
  padding: "0 5px",
};

const toolStyle = {
  display: "flex",
  flexDirection: "row",
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: "space-between",
};

export { arrowStyle, appBarStyle, toolStyle };
