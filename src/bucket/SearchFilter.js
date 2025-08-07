import React from "react";
import SelectComponent from "./formComponent/SelectComponent";
import InputComponent from "./formComponent/InputComponent";
import CheckComponent from "./formComponent/CheckBoxComponent";

const SearchFilter = ({ open, formElements, handleSearch }) => {

    return (
        <div className={open ? "filterSlide openFilter" : "filterSlide closeFilter"} >
          {formElements.map((item, i) => (
            <div key={i} className="filterSlideItem">
          {    item?.display && item?.element === 'select' ?
           
              <div className='formLayout'>
       <label htmlFor={item.name} >{item.name}</label>
       <select
          className="formLayoutSelect"
          required={false }
        placeholder={item?.placeholder}
        id={item?.name}
        onChange={item.handler}
        defaultValue={item?.defaultValue}
      >
        {item.options.length > 0 ? (
          <>
            <option hidden value={item?.defaultValue}>
              {item?.defaultValue}
            </option>
            {item?.options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </>
        ) : (
          <>
            <option value={item?.defaultValue}>{item?.name}</option>
            <option value={item?.defaultValue}>No items yet</option>
          </>
        )}
      </select>


      {/* <select
          className="formLayoutSelect"
          required={false}
          placeholder={item.name}
          id={item.name}
          onChange={e=>handleCountry(e)}
        >
          {!!item.data?.length ? (
            <>
              {item.data.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value={item.defaultValue}>{item.name}</option>
              {item?.includeNoItemsYet && <option value={item.defaultValue}>No items yet</option>}
            </>
          )}
        </select> */}
  </div> 
              : item?.element === 'input' ?
              <InputComponent
                type={item?.type}
                placeholder={item.name}
                id={item.name}
                title={item.name}
                display={true}
                showLabel={true}
                onChange={item.handler}
                min={0}
                max={10}
              /> 
              : item?.element === 'checkbox' &&
              <CheckComponent
                type={item?.type}
                placeholder={item.name}
                id={item.name}
                title={item.name}
                display={true}
                showLabel={item?.showLabel}
                onChange={item.handler}
              />}
            </div>
          ))}
          <div className="cardDisplayFormOptionsBtns">

          <div className="cardDisplayFormOptionsBtnsSubmit" onClick={handleSearch}>Search</div>
          </div>
        </div>
  );
};

export default SearchFilter;
