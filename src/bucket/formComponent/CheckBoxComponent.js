const CheckComponent = ({
  labelColor,
  placeholder,
  defaultValue,
  required,
  title,
  id,
  display,
  onChange,
  showLabel,
}) => {
  return display ? (
    <div className="formCheckbox">
      {showLabel && (
        <label style={labelColor} htmlFor={title}>
          {title}
        </label>
      )}

      <input
        type={"checkbox"}
        className="formCheckboxInput"
        placeholder={placeholder}
        required={required}
        name={title}
        defaultChecked={defaultValue}
        onChange={onChange}
        id={title}
        title={title}
      />
    </div>
  ) : null;
};

export default CheckComponent;
