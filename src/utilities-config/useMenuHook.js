import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { menuList } from "../redux/actions";
import { useLocation } from "react-router-dom";

export default function useMenuHook({
  pathname,
  accountId,
  cAccountId,
  fellowship,
  fellowshipLower,
  fullName,
  cAccountData,
}) {
  const item = useLocation().search.split("=")[1];
  const slug = useLocation().pathname.split("/")[3];
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (accountId && pathname) {
      if (pathname.includes("dashboard")) {
        dispatch(
          menuList({
            id: accountId,
            data: "dashboard",
            item: "",
            slug,
            cid: cAccountId,
            fellowship,
            fellowshipLower,
          })
        );
        setMenu(true);
      }

      // else if (pathname.includes("/my-department")) {
      //   dispatch(
      //     menuList({
      //       id: item,
      //       data: "my-department",
      //       item: "",
      //       slug,
      //       cid: cAccountId,
      //       fellowship,
      //       fellowshipLower,
      //       cAccountData,
      //     })
      //   );
      //   setMenu(true);
      // }
      // else if (
      //   pathname.includes("/my-units/u") ||
      //   pathname.includes("my-units/services/")
      // ) {
      //   dispatch(
      //     menuList({
      //       id: item,
      //       data: "fellowship",
      //       item: "",
      //       fullName,
      //       slug,
      //       cid: cAccountId,
      //       fellowship,
      //       fellowshipLower,
      //     })
      //   );
      //   setMenu(true);
      // }
      else {
        setMenu(false);
      }
    }
  }, [
    pathname,
    accountId,
    cAccountData,
    fullName,
    dispatch,
    cAccountId,
    fellowship,
    fellowshipLower,
    item,
    slug,
  ]);

  return menu;
}
