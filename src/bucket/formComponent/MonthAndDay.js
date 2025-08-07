
import { memo, useCallback, useRef, useState } from "react";

const reqStyle = {
  color: "#e55353",
};

const MonthAndDay = ({
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
    defaultValue
    ? new Date(defaultValue).getTime()
    : new Date(defaultValue).getTime() - new Date().getTimezoneOffset() * 60_000
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
    <div key={index} className="inputContainer">
      <label
        className={
          focus === index
            ? "inputContainer__label filled"
            : "inputContainer__label"
        }
        htmlFor={name || label}
      >
        <div>
          {name || label} {required && <span style={reqStyle}>*</span>}
        </div>
      </label>

      <input
        ref={inputRef}
        placeholder={label || name}
        type="datetime-local"
        
        required={required}
        defaultValue={ defaultValue}
        // defaultValue = {new Date().tISOStoring().slice(0, 10)}
        autoComplete="off"
        disabled={disabled}
        onChange={(e) => handleChangeInput(e)}
        title={title}
        id={label || name}
        name={name || label}
        className="dateInput"
        onBlur={(e) => execute(e, defaultValue, index)}
        // min = {new Date().tISOStoring().slice(0, 10)}
        // max = {new Date().tISOStoring().slice(0, 10)}

      />
    </div>
  ) : null;
};

export default memo(MonthAndDay);

//   return (
//     display || display === undefined ?  <div style={dateStyle} className="dateContainer" key={index}>
//         <LocalizationProvider dateAdapter={DateAdapter}>
//           <MobileDatePicker
//             label={`${label} ${required ? "*": ""}`}
//             views={["month", "day"]}
//             value={value}                        minDate={minDate || null}
//             maxDate={maxDate || null}

//             required={required && [undefined, true].includes(display) ? true : false}
//             onChange={(d) => onChange(d)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </LocalizationProvider>

//         <IOSLocalProvider dateAdapter={DateAdapter}>
//           <ISOMobile
//             label={`${label} ${required ? "*": ""}`}
//             views={["month", "day"]}
//             value={value}
//             required={required}                        minDate={minDate || null}
//             maxDate={maxDate || null}

//             onChange={(d) => onChange(d)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </IOSLocalProvider>
//       </div> : null
//     )

// }
