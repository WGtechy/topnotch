import { useDispatch } from "react-redux";
import { signOut } from "../redux/actions/auth.actions";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const TheHeaderDropdown = ({
  accountId,
  openHeaderDrop,
  handleToggle,
  history,
  pathname,
  token,
}) => {
  const dispatch = useDispatch();


  const signOutHandler = () => {
    history.push("/");
    dispatch(signOut({ accountId, token }));
  };

 const menu = [
  // {
  //   route: fellowship,
  //   to: "/my-units",
  //   display: unitSystem && cAccountId && displayUnit ? true : false,
  //   icon: IoPeopleCircle,
  // },
 ]

  return (
    <div
      className={
        openHeaderDrop
          ? "popover profMenu openPopover drop"
          : "popover profMenu closePopover drop"
      }
    >
      <div className="profMenuContent">
        
            {menu.map(
              (item, i) =>
                item.display && (
                  <Link
                    className={
                      pathname === item.to ? "activeMenu menuItem" : "menuItem"
                    }
                    to={item.to}
                    onClick={handleToggle}
                    key={i}
                  >
                    {item.route}
                  </Link>
                )
            )}
        <a className="signOut" href={"/"} onClick={signOutHandler}>
          <IoLogOutOutline className="icon" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default TheHeaderDropdown;
