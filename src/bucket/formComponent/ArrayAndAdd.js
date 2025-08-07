import React, { useCallback, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

const ArrayAndAdd = ({
  name,
  initial,
  setInitial,
}) => {
  const [value, setValue] = useState("")
  const [ openInput, setOpenInput] = useState(false)
      const handleDisplayInput = useCallback(
        () => setOpenInput((prev) => !prev),
        [setOpenInput]
      );
   
    const handleInsert = (e) => {
      e.preventDefault()
        if(initial.includes(value)){
            return
        } else{
            setInitial((prev) => [value, ...prev]);
            setOpenInput(false)
        }
        }

      const handleRemove = useCallback(
        (value) => () => {
          setInitial((prev) => prev.filter((x) => x !== value));
        },
        [setInitial]
      );
      const handleCloseForm = ()=>setOpenInput(prev=>!prev)
 return (
    <div className="appProfileCardItems">
      {/* <sup className="detailItemName">{name}</sup> */}

      <div className="appProfileCardItemsValues">
        {!!initial?.length &&
          initial.map((value, i) => (
            <div className="appProfileCardItemsValuesItem" key={i}>
              <span className="appProfileCardItemsValuesName">{value}</span>{" "}
              <span
                className="appProfileCardItemsValuesItemTrash"
                onClick={handleRemove ? handleRemove(value) : null}
              >
                <IoTrash />
              </span>{" "}
            </div>
          ))}
        {!openInput && (
          <div
            className="appProfileCardItemsValuesAdd"
            onClick={handleDisplayInput}
          >
            {" "}
            <span> </span> New {name}{" "}
          </div>
        )}

      </div>

      {openInput && (
        <form className="appProfileCardItemsInputBox" onSubmit={handleInsert}>
          <input
            type="text"
            className="appProfileCardItemsInputBoxText"
            placeholder="Type here"
            autoFocus={true}
            onChange={e=>setValue(e.target.value)}
          />
          <div className="appProfileCardItemsInputBoxControl">
            {value && (
              <button
                className="appProfileCardItemsInputBoxControlAdd"
                onClick={handleInsert}
              >
                Add
              </button>
            )}
            <div
              className="appProfileCardItemsInputBoxControlClose"
              onClick={handleCloseForm}
            >
              <IoClose />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ArrayAndAdd;
