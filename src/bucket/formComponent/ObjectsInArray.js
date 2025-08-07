import React, { useCallback, useState } from "react";
import { IoTrash } from "react-icons/io5";
import InputComponent from "./InputComponent";

const ObjectsInArray = ({ selections, setSelections, display }) => {
  const [newFeature, setNewFeature] = useState(null);
  const [newSubFeature, setNewSubFeature] = useState(null);
  const [newSubFeatureItem, setNewSubFeatureItem] = useState(null);
  const [data, setData] = useState(null);
  const [target, setTarget] = useState("");
  const [template, setTemplate] = useState(false);
  const handleRemoveItem = useCallback(
    ({ item, target, feature, subFeature }) =>
      () => {
        if (target === "feature") {
          setSelections((init) => init.filter((x) => x.feature.name !== item));
        } else if (target === "subFeature") {
          let searchedFeature = selections.find(
            (x) => x.feature.name === feature
          );
          let newSubFeatures = searchedFeature.subFeatures.filter(
            (x) => x.name.name !== item
          );
          let update = {
            feature: { name: searchedFeature.feature.name, active: false },
            subFeatures: newSubFeatures,
          };
          setSelections((prev) => {
            let newObj = prev.filter((x) => x.feature.name !== feature);
            return [...newObj, update];
          });
        } else if (target === "subFeatureItem") {
          let searchedFeature = selections.find(
            (x) => x.feature.name === feature
          );
          let searchedSubFeature = searchedFeature.subFeatures.find(
            (x) => x.name.name === subFeature
          );
          let remainingSearchedSubFeature = searchedFeature.subFeatures.filter(
            (x) => x.name.name !== subFeature
          );
          let remainingSubFeatureItems =
            searchedSubFeature.subFeatureItem.filter((x) => x.name !== item);
          let update = {
            feature: { name: searchedFeature.name, active: false },
            subFeatures: [
              ...remainingSearchedSubFeature,
              {
                name: { name: searchedSubFeature.name.name, active: false },
                subFeatureItem: remainingSubFeatureItems,
              },
            ],
          };

          setSelections((prev) =>
            prev.map((item) => (item.feature.name === feature ? update : item))
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
    setNewSubFeature(null);
    setNewFeature(null);
    setNewSubFeatureItem(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!!selections?.length) {
      if (target === "feature") {
        let check = selections.find((x) => x.feature === newFeature);
        if (check) {
          handleClear();
          return;
        } else {
          setSelections((prev) => [
            ...prev,
            {
              feature: newFeature,
              subFeatures: [],
            },
          ]);
          handleClear();
        }
        setTarget("");
        setData(null);
      } else if (target === "subFeature") {
        let checkFeature = selections.find((x) => x.feature === data?.feature);
        if (checkFeature) {
          if (!!checkFeature?.subFeatures?.length) {
            let checkSubFeature = checkFeature.subFeatures.find(
              (x) => x.name === newSubFeature
            );
            if (checkSubFeature?.name === newSubFeature) {
              return;
            } else {
              let newSubFeatureObj = {
                name: newSubFeature,
                subFeatureItem: [],
              };
              let updateData = {
                feature: data.feature,
                subFeatures: [...checkFeature.subFeatures, newSubFeatureObj],
              };
              setSelections((prev) => {
                let newObj = prev.filter((x) => x.feature !== data.feature);
                return [...newObj, updateData];
              });
            }
            handleClear();
          } else {
            let newSubFeatureObj = {
              name: newSubFeature,
              subFeatureItem: [],
            };
            let updateData = {
              feature: data.feature,
              subFeatures: [newSubFeatureObj],
            };
            setSelections((prev) => {
              let newObj2 = prev.filter((x) => x.feature !== data.feature);
              return [...newObj2, updateData];
            });
          }
          handleClear();
        }
      } else {
        let checkFeature = selections.find((x) => x.feature === data.feature);
        if (checkFeature) {
          if (!!checkFeature?.subFeatures?.length) {
            let checkSubFeature = checkFeature.subFeatures.find(
              (x) => x.name === data.subFeature
            );
            if (checkSubFeature) {
              if (!!checkSubFeature.subFeatureItem?.length) {
                let checkSubFeatureItem = checkSubFeature.subFeatureItem.find(
                  (x) => x === data.subFeatureItem
                );

                if (checkSubFeatureItem) {
                  return;
                } else {
                  let init = checkFeature.subFeatures.find(
                    (x) => x.name === data.subFeature
                  );
                  if (init?.name) {
                    let updateSubFeatures = {
                      name: data.subFeature,
                      subFeatureItem: [
                        ...init.subFeatureItem,
                        newSubFeatureItem,
                      ],
                    };
                    let newExistingSubFeatures =
                      checkFeature.subFeatures.filter(
                        (x) => x.name !== data.subFeature
                      );
                    let updateAll = {
                      feature: data.feature,
                      subFeatures: [
                        ...newExistingSubFeatures,
                        updateSubFeatures,
                      ],
                    };
                    setSelections((prev) => {
                      let newObj = prev.filter(
                        (x) => x.feature !== data.feature
                      );
                      return [...newObj, updateAll];
                    });
                  }
                }
              } else {
                let init = checkFeature.subFeatures.find(
                  (x) => x.name === data.subFeature
                );
                if (init?.name) {
                  let updateSubFeatures = {
                    name: data.subFeature,
                    subFeatureItem: [newSubFeatureItem],
                  };
                  let newExistingSubFeatures = checkFeature.subFeatures.filter(
                    (x) => x.name !== data.subFeature
                  );
                  let updateAll = {
                    feature: data.feature,
                    subFeatures: [...newExistingSubFeatures, updateSubFeatures],
                  };
                  setSelections((prev) => {
                    let newObj = prev.filter((x) => x.feature !== data.feature);
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
          feature: newFeature,
          subFeatures: [],
        },
      ]);
      setNewSubFeature(null);
      setNewFeature(null);
      setNewSubFeatureItem(null);
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
                    {item.feature.name}
                  </span>
                  <span
                    className="locationDataItemContainerHeaderIcon"
                    onClick={handleRemoveItem({
                      item: item.feature.name,
                      target: "feature",
                    })}
                  >
                    <IoTrash />
                  </span>
                </div>
                <div className="locationDataItemContainerContainer">
                  {!!item?.subFeatures?.length &&
                    // display all subFeatures
                    item.subFeatures.map((subFeature, i) => (
                      <div
                        className="locationDataItemContainerContainerItem"
                        key={i}
                      >
                        <div className="locationDataItemContainerContainerItemHeader">
                          <span className="locationDataItemContainerContainerItemHeaderName">
                            {" "}
                            {subFeature.name.name}
                          </span>
                          <span
                            className="locationDataItemContainerContainerItemHeaderIcon"
                            onClick={handleRemoveItem({
                              item: subFeature.name.name,
                              target: "subFeature",
                              feature: item.feature.name,
                            })}
                          >
                            {" "}
                            <IoTrash />
                          </span>
                        </div>
                        <div className="locationDataItemContainerContainerItemContainer">
                          {!!subFeature.subFeatureItem?.length &&
                            subFeature.subFeatureItem.map((subItem, i) => (
                              <div
                                className="locationDataItemContainerContainerItemContainerItem"
                                key={i}
                              >
                                <span className="locationDataItemContainerContainerItemContainerItemName">
                                  {subItem.name}
                                </span>
                                <span
                                  className="locationDataItemContainerContainerItemContainerItemIcon"
                                  onClick={handleRemoveItem({
                                    item: subItem.name,
                                    subFeature: subFeature.name.name,
                                    target: "subFeatureItem",
                                    feature: item.feature.name,
                                  })}
                                >
                                  <IoTrash />
                                </span>
                              </div>
                            ))}
                          {template && target === "subFeatureItem" ? (
                            <form
                              onSubmit={
                                newFeature || newSubFeature || newSubFeatureItem
                                  ? handleSave
                                  : null
                              }
                              className="locationDataForm"
                            >
                              <div className="locationDataFormItem">
                                <div className="locationDataFormItemTitle">
                                  Sub feature item
                                </div>
                                <InputComponent
                                  display={true}
                                  type="text"
                                  autoFocus={true}
                                  required={true}
                                  placeholder="New sub feature item name"
                                  onChange={(e) =>
                                    setNewSubFeatureItem({
                                      name: e.target.value,
                                      active: false,
                                    })
                                  }
                                />
                              </div>
                              {newSubFeatureItem ? (
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
                                tag: "subFeatureItem",
                                item: {
                                  feature: item.feature,
                                  subFeature: subFeature.name,
                                },
                              })}
                            >
                              Add new Sub feature list
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {template && target === "subFeature" ? (
                    <form
                      onSubmit={
                        newFeature || newSubFeature || newSubFeatureItem
                          ? handleSave
                          : null
                      }
                      className="locationDataForm"
                    >
                      <div className="locationDataFormItem">
                        <div className="locationDataFormItemTitle">
                          Sub feature
                        </div>
                        <InputComponent
                          display={true}
                          type="text"
                          autoFocus={true}
                          required={true}
                          placeholder="New sub feature "
                          onChange={(e) =>
                            setNewSubFeature({
                              name: e.target.value,
                              active: false,
                            })
                          }
                        />
                      </div>
                      {newSubFeature ? (
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
                        tag: "subFeature",
                        item: {
                          feature: item.feature,
                          subFeatures: item?.subFeatures,
                        },
                      })}
                    >
                      Add new sub feature
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {template && target === "feature" ? (
          <form
            onSubmit={
              newFeature || newSubFeature || newSubFeatureItem
                ? handleSave
                : null
            }
            className="locationDataForm"
          >
            <div className="locationDataFormItem">
              <div className="locationDataFormItemTitle">Feature </div>
              <InputComponent
                display={true}
                type="text"
                required={true}
                autoFocus={true}
                placeholder="New feature name"
                onChange={(e) =>
                  setNewFeature({ name: e.target.value, active: false })
                }
              />
            </div>

            {newFeature ? (
              <div className="locationDataFormSubmit" onClick={handleSave}>
                Submit
              </div>
            ) : null}
          </form>
        ) : (
          <div
            className="locationDataNew"
            onClick={handleNew({ tag: "feature" })}
          >
            Add new feature{" "}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default ObjectsInArray;
