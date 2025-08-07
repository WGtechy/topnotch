import React, { useCallback, useEffect, useState } from "react";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import {
  appBarStyle,
  arrowStyle,
  toolStyle,
} from "../../utilities-config/style";
import { IoClose } from "react-icons/io5";

const featuresData = [
  {
    feature: { name: "Toilet", active: true },
    subFeatures: [
      {
        name: { name: "Utils", active: true },
        subFeatureItem: [
          { name: "Tissues", active: true },
          { name: "Brooms", active: true },
          { name: "Handwash", active: true },
        ],
      },
      {
        name: { name: "Bathroom", active: true },
        subFeatureItem: [
          { name: "Soap", active: true },
          { name: "Towel", active: true },
        ],
      },
    ],
  },
  {
    feature: { name: "Thjkoilet", active: true },
    subFeatures: [
      {
        name: { name: "Ujktils", active: true },
        subFeatureItem: [
          { name: "Tissjkues", active: true },
          { name: "Brjklooms", active: true },
          { name: "Hajkndwash", active: true },
        ],
      },
      {
        name: { name: "Bathjkroom", active: true },
        subFeatureItem: [
          { name: "Sjkloap", active: true },
          { name: "Tojkwel", active: true },
        ],
      },
    ],
  },
];

const AllPropertiesFeatures = ({ open, handleClose, features, update }) => {
  const [selections, setSelections] = useState(featuresData);
  useEffect(() => {
    setSelections(featuresData);
  }, []);

  const switchSubItems = (data) => {
    if (!!data?.length) {
      let arr = [];
      for (let item of data) {
        arr = [...arr, { name: item.name, active: false }];
      }
      return arr;
    }
  };

  const handleRemoveItem = useCallback(
    ({ item, target, feature, active, subFeature }) =>
      () => {
        if (target === "feature") {
          // switch off all sub features and its items
          setSelections((init) => {
            if (!!init?.length) {
              let foundFeature = init.find((x) => x.feature.name === item);
              let subFeatures = [];
              if (!!foundFeature?.subFeatures?.length) {
                for (let _sub of foundFeature.subFeatures) {
                  subFeatures = [
                    ...subFeatures,
                    {
                      name: { name: _sub.name.name, active: false },
                      subFeatureItem: switchSubItems(_sub.subFeatureItem),
                    },
                  ];
                }
              }
              let newObj = {
                feature: { name: foundFeature.feature.name, active },
                subFeatures,
              };
              let arr = [];
              for (let x of init) {
                if (x.feature.name === item) {
                  arr = [...arr, newObj];
                } else {
                  arr = [...arr, x];
                }
              }
              return arr;
            }
          });
        } else if (target === "subFeature") {
          setSelections((init) => {
            let foundFeature = init.find((x) => x.feature.name === feature);
            let subFeatures = [];

            if (!!foundFeature?.subFeatures?.length) {
              for (let _sub of foundFeature.subFeatures) {
                if (_sub.name.name === item) {
                  subFeatures = [
                    ...subFeatures,
                    {
                      name: { name: _sub.name.name, active },
                      subFeatureItem: switchSubItems(_sub.subFeatureItem),
                    },
                  ];
                } else {
                  subFeatures = [...subFeatures, _sub];
                }
              }
            }

            let newObj = {
              feature: {
                name: foundFeature.feature.name,
                active: foundFeature.feature.active,
              },
              subFeatures,
            };
            let arr = [];
            for (let x of init) {
              if (x.feature.name === feature) {
                arr = [...arr, newObj];
              } else {
                arr = [...arr, x];
              }
            }

            return arr;
          });
        } else if (target === "subFeatureItem") {
          setSelections((init) => {
            let foundFeature = init.find((x) => x.feature.name === feature);
            let subFeatures = [];
            if (!!foundFeature?.subFeatures?.length) {
              for (let _sub of foundFeature.subFeatures) {
                let subFeatureItem = [];
                if (_sub.name.name === subFeature) {
                  if (!!_sub?.subFeatureItem?.length) {
                    for (let _subItem of _sub.subFeatureItem) {
                      if (_subItem.name === item) {
                        subFeatureItem = [
                          ...subFeatureItem,
                          { name: _subItem.name, active },
                        ];
                      } else {
                        subFeatureItem = [...subFeatureItem, _subItem];
                      }
                    }
                  }

                  subFeatures = [
                    ...subFeatures,
                    {
                      name: { name: _sub.name.name, active: _sub.name.active },
                      subFeatureItem,
                    },
                  ];
                } else {
                  subFeatures = [...subFeatures, _sub];
                }
              }
            }

            let newObj = {
              feature: {
                name: foundFeature.feature.name,
                active: foundFeature.feature.active,
              },
              subFeatures,
            };
            let arr = [];
            for (let x of init) {
              if (x.feature.name === feature) {
                arr = [...arr, newObj];
              } else {
                arr = [...arr, x];
              }
            }

            return arr;
          });
        }
      },
    []
  );

  return (
    <Dialog
      parentDialog={false}
      open={open}
      adjustFullscreen={true}
      onClose={handleClose}
    >
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolStyle}>
          <div onClick={handleClose} className="modalBack">
            <IoClose style={arrowStyle} />
            <span className="headerRightSection">Features </span>
          </div>
        </Toolbar>
      </AppBar>
      <div className="featuresContainer">
        {selections.map((item, i) => (
          <div className="featuresContainerItem" key={i}>
            <div className="featuresContainerItemParent">
              <div className="featuresContainerItemParentLeft">
                {item.feature?.name}
              </div>
              <div
                className={
                  item?.feature?.active
                    ? "featuresContainerItemParentRight activeFeature"
                    : "featuresContainerItemParentRight inactiveFeature"
                }
                onClick={handleRemoveItem({
                  item: item.feature.name,
                  target: "feature",
                  active: !item.feature.active,
                })}
              >
                {item.feature?.active ? "Included" : "Not included"}
              </div>
            </div>
            {item.feature.active &&
              !!item?.subFeatures?.length &&
              item?.subFeatures.map((sub, i) => (
                <div className="featuresContainerItemSub" key={i}>
                  <div className="featuresContainerItemSubContainer">
                    <div className="featuresContainerItemSubContainerLeft">
                      {sub.name.name}
                    </div>
                    <div
                      className={
                        sub?.name?.active
                          ? "featuresContainerItemSubContainerRight activeFeature"
                          : "featuresContainerItemSubContainerRight inactiveFeature"
                      }
                      onClick={handleRemoveItem({
                        item: sub.name.name,
                        target: "subFeature",
                        feature: item.feature.name,
                        active: !sub.name.active,
                      })}
                    >
                      {sub.name.active ? "Included" : "Not included"}
                    </div>
                  </div>
                  {item.feature.active &&
                    sub.name.active &&
                    !!sub?.subFeatureItem?.length &&
                    sub?.subFeatureItem.map((subItem, i) => (
                      <div className="featuresContainerItemSubItem" key={i}>
                        <div className="featuresContainerItemSubItemLeft">
                          {subItem.name}
                        </div>
                        <div
                          className={
                            subItem.active
                              ? "featuresContainerItemSubItemRight activeFeature"
                              : "featuresContainerItemSubItemRight inactiveFeature"
                          }
                          onClick={handleRemoveItem({
                            item: subItem.name,
                            subFeature: sub.name.name,
                            target: "subFeatureItem",
                            feature: item.feature.name,
                            active: !subItem.active,
                          })}
                        >
                          {subItem.active ? "Included" : "Not included"}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </Dialog>
  );
};
export default AllPropertiesFeatures;
