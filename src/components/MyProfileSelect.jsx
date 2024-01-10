import { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const MyProfileSelect = (props) => {
  const navigate = useNavigate();

  return (
    <DropdownButton
      variant="dark"
      id="dropdown-basic-button"
      title={
        <div className="navProfileImage">
          <Image
            className="object-fit-cover border-0 rounded h-100 w-100"
            src={props.profilePicture4 ? props.profilePicture4 : "assets/avatar.png"}
            alt="avatar"
            rounded
          />
        </div>
      }
      drop="start"
      data-bs-theme="dark"
    >
      <Dropdown.Item>
        <i className="bi bi-people-fill me-2 "></i>Cambia Profilo
      </Dropdown.Item>
      <Dropdown.Item>
        <i className="bi bi-person-plus me-2"></i>Aggiungi Profilo
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => {
          navigate("/Profile");
        }}
      >
        <i className="bi bi-gear-wide me-2"></i>Impostazioni
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default MyProfileSelect;
