import {Dropdown} from "flowbite-react";
import {Link} from "react-router-dom";
import React from "react";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import AxiosClient from "../../../axios-client.js";

export const ProfileDropdown = ({user, arrowIcon}) => {

  const {onLogout} = useAuthContext()
    return (
        <>
          {user?.acc_type !== 0 && <Dropdown arrowIcon={arrowIcon} inline label={
            <img className={`md:w-9 md:h-9 w-7 h-7 rounded-3xl shadow-2xl`} src={`https://robohash.org/${user.username}`}/>
          } style={{background: "none"}}>
            <Dropdown.Header>
              {user?.username}
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={`/user/${user?.id}`}>
                Account
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <button onClick={onLogout}>
                Sign out
              </button>
            </Dropdown.Item>
          </Dropdown>}
        </>
    );
};
