
import { memo, useCallback, useRef, useState } from "react";

const reqStyle = {
  color: "#e55353",
};

const TimeComponent = ({
  minDate,
  maxDate,
  onChange,
  label,
  display,
  required,
  index,
  defaultValue,
  name,
  disabled,
  title,
}) => {
  const inputRef = useRef(null);

  const [focus, setFocus] = useState(false);

  const handleChangeInput = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  let time = defaultValue
    ? new Date().getTime(defaultValue)
    : new Date().getTime();
  const dateTimeLocalNow = new Date(
    time - new Date().getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 16);

  const execute = (e, defaultValue, index) => {
    if (e.target.value !== "" || defaultValue) {
      setFocus(index);
    } else {
      setFocus(null);
    }
  };

  return display || display === undefined ? (
    <div key={index} className="time">
      <label
        className="timeLabel"
        htmlFor={name || label}
      >
        <div>
          {name || label} {required && <span style={reqStyle}>*</span>}
        </div>
      </label>

      <input
        ref={inputRef}
        placeholder={label || name}
        type="time"
        required={required}
        defaultValue={dateTimeLocalNow}
        autoComplete="off"
        disabled={disabled}
        onChange={(e) => handleChangeInput(e)}
        title={title}
        id={label || name}
        name={name || label}
        className="timeInput"
        onBlur={(e) => execute(e, defaultValue, index)}
        min={minDate}
        max={maxDate}
      />
    </div>
  ) : null;
};

export default memo(TimeComponent);