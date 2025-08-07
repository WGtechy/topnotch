import React, { useCallback, useRef, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import TextAreaComponent from "./TextAreaComponent";
import InputComponent from "./InputComponent";

const AddObjectToArray = ({
  name,
  initial,
  setInitial,
}) => {

  const [ openInput,  setOpenInput ] = useState(false)
  const [ visible,  setVisible ] = useState(false)
      const handleDisplayInput = useCallback(
        () => setOpenInput((prev) => !prev),
        [setOpenInput]
      );
      const title = useRef("")
      const description = useRef("")
   
    const handleInsert = (e) => {
      e.preventDefault()
            setInitial((prev) => [{title: title.current, description: description.current}, ...prev]);
            title.current = "";
            description.current = ""
            setOpenInput(false)        
        }

      const handleRemove = useCallback(
        (value) => () => {
          setInitial((prev) => prev.filter((x) => x?.title !== value.title));
        },
        [setInitial]
      );
      const handleCloseForm = ()=>setOpenInput(prev=>!prev)
     const  handleVisibility = ()=>setVisible(prev=>!prev) 
 return (
    <div className="appProfileCardItems">
      {/* <sup className="detailItemName">{name}</sup> */}

      <div className="appProfileCardItemsValues">
        {!openInput && (
          <div
            className="appProfileCardItemsValuesAdd"
            onClick={handleDisplayInput}
          >  New {name}{" "}
          </div>
        )}

        {!!initial?.length && (
          <div
            className="appProfileCardItemsValuesAdd"
            onClick={handleVisibility}
          >  {visible ? "Hide content" : `Show ${initial.length} item${initial.length > 1 ? 's':''}`}
          </div>
        )}

        {!!initial?.length && visible &&
          initial.map((value, i) => (
          value?.description &&  <div className="appProfileCardItemsValuesItem" key={i} >
            <div className="appProfileCardItemsValuesItemContent" >
              <div className="appProfileCardItemsValuesItemContentName">{ value?.title}</div>{" "}
              <div className="appProfileCardItemsValuesItemContentDescription">{value.description}</div>{" "}
            </div>
              <div
                className="appProfileCardItemsValuesItemTrash"
                onClick={handleRemove ? handleRemove(value) : null}
              >
                <IoTrash />
              </div>{" "}
            </div>
          ))}
      </div>

      {openInput ? (
        <form className="appProfileCardItemsObject" onSubmit={handleInsert}>
          <InputComponent 
             type={"text"}
            className="appProfileCardItemsObjectInput"
        placeholder="Title"
          display={true}
          required={true}
          name={"Title-"}
        defaultValue={""}
        onChange={e=>title.current = e.target.value}
        id={"Title-"}
        title={"Title"}

          />
          <TextAreaComponent 
            defaultValue={""}
          placeholder={"Description"}
            className="appProfileCardItemsObjectTextarea"
          required={true}
          display={true}
          onChange={e=>description.current = e.target.value}
        name={'Decription'}
        id={'Decription'}
        title={"Descriptions"}
          />
          <div className="appProfileCardItemsObjectControl">
              <button
                className="appProfileCardItemsObjectControlAdd"
                onClick={handleInsert}
              >
                Add
              </button>
            <div
              className="appProfileCardItemsObjectControlClose"
              onClick={handleCloseForm}
            >
             Close
            </div>
          </div>
        </form>
      ) : ''}
    </div>
  );
};

export default AddObjectToArray;
