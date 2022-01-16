import React, { useState, useEffect } from "react";
import { IUser } from "./interface";

interface IProps {
  user: IUser;
  onUpdateUser: (id: number, user: IUser) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditUserForm(props: IProps) {
  const [user, setUser] = useState(props.user);
  useEffect(() => setUser(props.user), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.gender || !user.name) {
      console.log("em");
      return false;
    }
    props.onUpdateUser(user.id, user);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>Edit Students</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={user.name}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input
            type="text"
            placeholder="please input gender"
            name="gender"
            value={user.gender}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>DOB</label>
          <input
            type="date"
            placeholder="please input dob"
            name="dob"
            value={user.dob}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <button>Update</button>
          <button onClick={() => props.setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
