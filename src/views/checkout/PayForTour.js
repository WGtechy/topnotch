import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  formattedAmount,
} from "../../utilities-config/numberFormatter";
import { initiateNewPayment } from "../../redux/actions";

import { IoClose } from "react-icons/io5";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";

const currency = {
  symbol: "₦",
  value: 1,
  name: "Naira",
};
const PayForTour = (props) => {
  console.log(22)

  return (
    <Dialog
          parentDialog={true}
          open={open}
          adjustFullscreen={true}
          onClose={handleClose()}
        >
          <AppBar>
            <Toolbar>
              <div onClick={handleClose()} className="modalBack">
                <IoClose className="arrowStyle" />
                <span>Checkout summary</span>
              </div>
            </Toolbar>
          </AppBar>
      
    </Dialog>
    
  );
};

export default PayForTour;
