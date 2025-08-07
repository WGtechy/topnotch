

const SelectComponent = ({name, titleColor, showLabel, title, includeNoItemsYet, required, placeholder, options, defaultValue, handleChangeSelect, display}) => {

 
  return (
    display ? <div className='formLayout'>
      {showLabel && <label htmlFor={title} style={titleColor}>{title}</label>}
      <select
          className="formLayoutSelect"
          required={required}
          placeholder={placeholder}
          id={name}
          onChange={(e) => handleChangeSelect(e)
          }
          defaultValue={defaultValue}
        >
          {!!options?.length ? (
            <>
              {options.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value={defaultValue}>{name}</option>
              {includeNoItemsYet && <option value={defaultValue}>No items yet</option>}
            </>
          )}
        </select>
  </div> : null
  )
}

export default SelectComponent