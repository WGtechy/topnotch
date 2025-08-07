import React, { useCallback, useState } from "react";
import { IoTrash } from "react-icons/io5";
import InputComponent from "./InputComponent";

const LocationTemplate = ({ selections, setSelections, display }) => {
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newNeighborhood, setNewNeighborhood] = useState("");
  const [data, setData] = useState(null);
  const [target, setTarget] = useState("");

  const [template, setTemplate] = useState(false);
  // const handleRemoveItem = useCallback(
  //   ({item, target, country, city}) => () => {
  //     if(target === 'country'){
  //       setSelections(init=> init.filter(x=> x.country !== item))
  //     } else if(target === 'city'){
  //       let searchedCountry = selections.find(x=>x.name === country);
  //       let newCities = searchedCountry.cities.filter(x=>x.name !== item);
  //       let update = {
  //         country: searchedCountry.name,
  //         cities: newCities
  //       }
  //       setSelections(prev=>{
  //         let newObj = prev.filter(x=>x.name !== country);
  //         return [...newObj, update]
  //       })
  //     } else if(target === 'neighboor'){
  //       let searchedCountry = selections.find(x=>x.name === country);
  //       let newCities = searchedCountry.cities.filter(x=>x.name !== city);
  //       let newNeighborhood = newCities.neighborhood.filter(x=>x.name !== item);

  //       let update = {
  //         country: searchedCountry.name,
  //         cities: [
  //           ...newCities,
  //           {
  //             name: city,
  //             neighborhood: newNeighborhood
  //           }
  //         ]
  //       }
  //       setSelections(prev=>{
  //         let newObj = prev.filter(x=>x.name !== country);
  //         return [...newObj, update]
  //       })

  //     }
  //   },
  //   [setSelections, selections]
  // );

  const handleRemoveItem = useCallback(
    ({ item, target, country, city }) =>
      () => {
        if (target === "country") {
          setSelections((init) => init.filter((x) => x.country !== item));
        } else if (target === "city") {
          let searchedCountry = selections.find((x) => x.country === country);
          let newCities = searchedCountry.cities.filter((x) => x.name !== item);
          let update = {
            country: searchedCountry.country,
            cities: newCities,
          };
          setSelections((prev) => {
            let newObj = prev.filter((x) => x.country !== country);
            return [...newObj, update];
          });
        } else if (target === "neighborhood") {
          let searchedCountry = selections.find((x) => x.country === country);
          let searchedCity = searchedCountry.cities.find(
            (x) => x.name === city
          );
          let remainingSearchedCity = searchedCountry.cities.filter(
            (x) => x.name !== city
          );
          let remainingNeighborhood = searchedCity.neighborhood.filter(
            (x) => x !== item
          );
          let update = {
            country: searchedCountry.country,
            cities: [
              ...remainingSearchedCity,
              {
                name: searchedCity.name,
                neighborhood: remainingNeighborhood,
              },
            ],
          };

          setSelections((prev) =>
            prev.map((item) => (item.country === country ? update : item))
          );
        }
      },
    [setSelections, selections]
  );
  const handleNew = useCallback(
    ({ tag, item }) =>
      () => {
        if (item) {
          setData(item);
        }
        if (tag) {
          setTarget(tag);
        }
        setTemplate(true);
      },
    []
  );

  const handleClear = () => {
    setNewCity("");
    setNewCountry("");
    setNewNeighborhood("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!!selections?.length) {
      if (target === "country") {
        let check = selections.find((x) => x.country === newCountry);
        if (check) {
          handleClear();
          return;
        } else {
          setSelections((prev) => [
            ...prev,
            {
              country: newCountry,
              cities: [],
            },
          ]);
          handleClear();
        }
        setTarget("");
        setData(null);
      } else if (target === "city") {
        let checkCountry = selections.find((x) => x.country === data?.country);
        if (checkCountry) {
          if (!!checkCountry?.cities?.length) {
            let checkCity = checkCountry.cities.find((x) => x.name === newCity);
            if (checkCity?.name === newCity) {
              return;
            } else {
              let newCityObj = {
                name: newCity,
                neighborhood: [],
              };
              let updateData = {
                country: data.country,
                cities: [...checkCountry.cities, newCityObj],
              };
              setSelections((prev) => {
                let newObj = prev.filter((x) => x.country !== data.country);
                return [...newObj, updateData];
              });
            }
            handleClear();
          } else {
            let newCityObj = {
              name: newCity,
              neighborhood: [],
            };
            let updateData = {
              country: data.country,
              cities: [newCityObj],
            };
            setSelections((prev) => {
              let newObj2 = prev.filter((x) => x.country !== data.country);
              return [...newObj2, updateData];
            });
          }
          handleClear();
        }
      } else {
        let checkCountry = selections.find((x) => x.country === data.country);
        if (checkCountry) {
          if (!!checkCountry?.cities?.length) {
            let checkCity = checkCountry.cities.find(
              (x) => x.name === data.city
            );
            if (checkCity) {
              if (!!checkCity.neighborhood?.length) {
                let checkNeighborhood = checkCity.neighborhood.find(
                  (x) => x === data.neighborhood
                );

                if (checkNeighborhood) {
                  return;
                } else {
                  let init = checkCountry.cities.find(
                    (x) => x.name === data.city
                  );
                  if (init?.name) {
                    let updateCities = {
                      name: data.city,
                      neighborhood: [...init.neighborhood, newNeighborhood],
                    };
                    let newExistingCities = checkCountry.cities.filter(
                      (x) => x.name !== data.city
                    );
                    let updateAll = {
                      country: data.country,
                      cities: [...newExistingCities, updateCities],
                    };
                    setSelections((prev) => {
                      let newObj = prev.filter(
                        (x) => x.country !== data.country
                      );
                      return [...newObj, updateAll];
                    });
                  }
                }
              } else {
                let init = checkCountry.cities.find(
                  (x) => x.name === data.city
                );
                if (init?.name) {
                  let updateCities = {
                    name: data.city,
                    neighborhood: [newNeighborhood],
                  };
                  let newExistingCities = checkCountry.cities.filter(
                    (x) => x.name !== data.city
                  );
                  let updateAll = {
                    country: data.country,
                    cities: [...newExistingCities, updateCities],
                  };
                  setSelections((prev) => {
                    let newObj = prev.filter((x) => x.country !== data.country);
                    return [...newObj, updateAll];
                  });
                }
              }
            }
          } else {
          }
        }
      }
    } else {
      setSelections([
        {
          country: newCountry,
          cities: [],
        },
      ]);
      setNewCity("");
      setNewCountry("");
      setNewNeighborhood("");
    }
    setTemplate(false);
  };

  return display ? (
    <div className="location ">
      <div className="locationData">
        {!!selections?.length &&
          selections.map((item, i) => (
            <div className="locationDataItem" key={i}>
              <div className="locationDataItemContainer">
                <div className="locationDataItemContainerHeader">
                  <span className="locationDataItemContainerHeaderName">
                    {" "}
                    {item.country}
                  </span>
                  <span
                    className="locationDataItemContainerHeaderIcon"
                    onClick={handleRemoveItem({
                      item: item.country,
                      target: "country",
                    })}
                  >
                    <IoTrash />
                  </span>
                </div>
                <div className="locationDataItemContainerContainer">
                  {!!item?.cities?.length &&
                    // display all cities
                    item.cities.map((city, i) => (
                      <div
                        className="locationDataItemContainerContainerItem"
                        key={i}
                      >
                        <div className="locationDataItemContainerContainerItemHeader">
                          <span className="locationDataItemContainerContainerItemHeaderName">
                            {" "}
                            {city.name}
                          </span>
                          <span
                            className="locationDataItemContainerContainerItemHeaderIcon"
                            onClick={handleRemoveItem({
                              item: city.name,
                              target: "city",
                              country: item.country,
                            })}
                          >
                            {" "}
                            <IoTrash />
                          </span>
                        </div>
                        <div className="locationDataItemContainerContainerItemContainer">
                          {!!city.neighborhood?.length &&
                            city.neighborhood.map((neigh, i) => (
                              <div
                                className="locationDataItemContainerContainerItemContainerItem"
                                key={i}
                              >
                                <span className="locationDataItemContainerContainerItemContainerItemName">
                                  {neigh}
                                </span>
                                <span
                                  className="locationDataItemContainerContainerItemContainerItemIcon"
                                  onClick={handleRemoveItem({
                                    item: neigh,
                                    city: city.name,
                                    target: "neighborhood",
                                    country: item.country,
                                  })}
                                >
                                  <IoTrash />
                                </span>
                              </div>
                            ))}

                          {target === "neighborhood" ? (
                            <form
                              onSubmit={handleSave}
                              className="locationDataForm"
                            >
                              <div className="locationDataFormItem">
                                <div className="locationDataFormItemTitle">
                                  {" "}
                                  Neighborhood{" "}
                                </div>
                                <InputComponent
                                  display={true}
                                  type="text"
                                  required={true}
                                  autoFocus={true}
                                  placeholder="New neighborhood name"
                                  onChange={(e) =>
                                    setNewNeighborhood(e.target.value)
                                  }
                                />
                              </div>

                              {newNeighborhood ? (
                                <div
                                  className="locationDataFormSubmit"
                                  onClick={handleSave}
                                >
                                  Submit
                                </div>
                              ) : null}
                            </form>
                          ) : (
                            <div
                              className="locationDataItemContainerContainerItemContainerNew"
                              onClick={handleNew({
                                tag: "neighborhood",
                                item: {
                                  country: item.country,
                                  city: city.name,
                                },
                              })}
                            >
                              Add new neighborhood
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {target === "city" ? (
                    <form onSubmit={handleSave} className="locationDataForm">
                      <div className="locationDataFormItem">
                        <div className="locationDataFormItemTitle">City </div>
                        <InputComponent
                          display={true}
                          type="text"
                          required={true}
                          autoFocus={true}
                          placeholder="New city name"
                          onChange={(e) => setNewCity(e.target.value)}
                        />
                      </div>

                      {newCountry || newCity || newNeighborhood ? (
                        <div
                          className="locationDataFormSubmit"
                          onClick={handleSave}
                        >
                          Submit
                        </div>
                      ) : null}
                    </form>
                  ) : (
                    <div
                      className="locationDataItemContainerContainerNew"
                      onClick={handleNew({
                        tag: "city",
                        item: {
                          country: item.country,
                          cities: item?.cities,
                        },
                      })}
                    >
                      Add new city
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {target === "country" ? (
          <form
            onSubmit={
              newCountry || newCity || newNeighborhood ? handleSave : null
            }
            className="locationDataForm"
          >
            {target === "country" && (
              <div className="locationDataFormItem">
                <div className="locationDataFormItemTitle">Country </div>
                <InputComponent
                  display={true}
                  type="text"
                  required={true}
                  autoFocus={true}
                  placeholder="New country name"
                  onChange={(e) => setNewCountry(e.target.value)}
                />
              </div>
            )}
            {newCountry && (
              <div className="locationDataFormSubmit" onClick={handleSave}>
                Submit
              </div>
            )}
          </form>
        ) : (
          <div
            className="locationDataNew"
            onClick={handleNew({ tag: "country" })}
          >
            Add new country{" "}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default LocationTemplate;
