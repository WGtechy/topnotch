
const TextAreaComponent = ({ type, cols, rows, placeholder, defaultValue, required, title, id, style, display, onChange }) => {

  
    return (
     display ? <div className="formLayout">
        <label htmlFor={title}>{title}</label>
  
        <textarea
          defaultValue={defaultValue}
          className="formLayoutTextArea"
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        name={title}
        id={title}
        title={title}
          style={style}
          cols={cols}
          rows={rows}
        />
      </div> : null
    );
  };
  
  

export default TextAreaComponent