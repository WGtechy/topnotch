import { IoTrash } from "react-icons/io5";
import { useRef } from "react";

const MultipleSelect = ({
  name,
  data,
  display,
  selectedItems,
  setSelectedItems,
  newItems,
  setNewItems,
}) => {
  const options = ["Select multiple categories", ...data]
  const select = useRef('')

  const handleSelect = (item) => {
    select.current = item
    if(item !== "Select multiple categories"){
    setSelectedItems((prev) =>{
      if(prev.includes(item)){
        return prev.filter(y=> y !== item)

      } else {
       return [...prev, item]
      }
    } 
       )};
  };
  const handleDelete = (del) => {
    setSelectedItems((item) => {
      return item.filter((x) => del !== x);
    });
  };

  const handleDeleteNew = (del) => {
    setNewItems((item) => {
      return item.filter((x) => del !== x);
    });
  };

  return display ? (
    <div className="formLayout multiSelect">
      <label className="formLayoutTitle">{name}</label>
      <div className="multiSelectContainer">
      {!!options?.length && (
      <div className="multiSelectContainerContent">
      <div className="multiSelectContainerContentTitle"></div>
      <select
          className="formLayoutSelect"
          placeholder={'Choose selection'}
          id={name}
          onChange={(e) => handleSelect(e.target.value) }
        >
          {!!options?.length ? (
           options.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))
          ) : (
              <option value={'Select'}>{'Select'}</option>
          )}
        </select>
          </div>)}

        <div className="multiSelectContainerSelected">
          {!!selectedItems?.length &&
            selectedItems?.map((item, i) => (
              <div className="multiSelectContainerSelectedItem" key={i}>
                {" "}
                {item}{" "}
                <span
                  className="multiSelectContainerSelectedItemDelete"
                  onClick={() => handleDelete(item)}
                >
                  <IoTrash />
                </span>{" "}
              </div>
            ))}

          {!!newItems?.length &&
            newItems?.map((item, i) => (
              <div className="multiSelectContainerSelectedItem" key={i}>
                {" "}
                {item}{" "}
                <span
                  className="multiSelectContainerSelectedItemDelete"
                  onClick={() => handleDeleteNew(item)}
                >
                  <IoTrash />
                </span>{" "}
              </div>
            ))}
        </div>

        
      </div>
    </div>
  ) : null;
};

export default MultipleSelect;
