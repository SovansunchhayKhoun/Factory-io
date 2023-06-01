import {Dropdown, Spinner} from "flowbite-react";
import {Link, useNavigate, useNavigation} from "react-router-dom";
import React, {useState} from "react";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import {AccordionDetails} from "@mui/material";
import AdminPopUp from "../../Modals/AdminPopUp.jsx";

export const ProfileDropdown = ({user, arrowIcon}) => {
  const {onLogout, isLoading, setIsLoading} = useAuthContext()
  const [modalOpen, setModalOpen] = useState(false);
  const Content = () => {
    return (
      <>
        <div className={`bg-white w-[400px] h-[400px] flex justify-center items-center`}>
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />
        </div>
      </>
    )
  }

  let navigate = useNavigate();

  return (
    <>
      {user?.acc_type !== 0 && <Dropdown arrowIcon={arrowIcon} inline label={
        <img alt="" className={`md:w-9 md:h-9 w-7 h-7 rounded-3xl shadow-2xl`} src={`https://robohash.org/${user.username}`}/>
      } style={{background: "none"}}>
        <Dropdown.Header>
          {user?.username}
        </Dropdown.Header>
        <Dropdown.Item>
          <Link className="h-full border w-full" to={`/user/${user?.id}`}>
            Account
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <button onClick={(event) => {
            event.stopPropagation();
            setModalOpen(true);
            onLogout(event)
            navigate('/')
            setTimeout(() => {
              setModalOpen(false);
            }, 2500)
          }}>
            Sign out
            <AdminPopUp content={<Content/>} setModalOpen={setModalOpen} modalOpen={modalOpen} id={100}/>
          </button>
        </Dropdown.Item>
      </Dropdown>}
    </>
  );
};
