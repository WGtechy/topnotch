import { forwardRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dialogModal } from "../../redux/actions";

const Dialog = forwardRef((props, ref) => {
  const { adjustFullscreen, open, onClose, className, parentDialog, scroll } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    if (!scroll && parentDialog) {
      dispatch(dialogModal({open}))
    
    }
  }, [open, parentDialog, dispatch, scroll]);

  return (
    <div
      className={open ? className ? `${className} dialog openDialog` : "dialog openDialog" : "dialog closeDialog"}
      id="dialog"
      ref={ref}
    >
      {adjustFullscreen && (
        <div className="dialogEmpty" onClick={onClose}></div>
      )}
      <div
        className={
          adjustFullscreen
            ? "dialogContent dialogContentReponsive"
            : "dialogContent"
        }
      >
        {open && props.children}
      </div>
    </div>
  );
});

export default Dialog;
