import { memo } from "react";

const InputComponent = ({ autoFocus, disabled, errorMessage, type, labelColor, placeholder, defaultValue, required, min, max, title, id, style, display, onChange, showLabel }) => {
  return (
   display ? <div className="formLayout">
      {showLabel && <label style={labelColor} htmlFor={title}>{title}</label>}

     {errorMessage && <div className="formLayoutError">{errorMessage}</div>}
      <input
        type={type}
        className="formLayoutInput"
        placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          name={title}
        defaultValue={defaultValue}
        onChange={onChange}
        id={title}
        title={title}
        disabled={disabled}
        style={style}
        min={min} max={max}
      />
    </div> : null
  );
};

export default memo(InputComponent);
