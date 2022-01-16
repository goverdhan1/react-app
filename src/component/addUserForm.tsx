import React, { useState } from "react";
import { IBaseUser } from "./interface";
import validator, { noErrors, FormErrors } from "../validator";

interface IProps {
  onAddUser: (user: IBaseUser) => void;
}
const initUser = { gender: "", name: "", dob: "" };
const AddUserForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, label: "Name" },
      { key: "gender", required: true, label: "Gender" },
      { key: "dob", required: true, label: "DOB" }
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {
          props.onAddUser(formValue);
          setFormValue(initUser);
          return false;
        }
		console.log(errors);
        setErrors(errors);
      }
    );
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>Add Students</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />
          {errors["name"] && errors["name"].length > 0 && (
            <div className="form-error">{errors["name"]}</div>
          )}
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input
            type="text"
            placeholder="please input Gender"
            name="gender"
            value={formValue.gender}
            onChange={onInputChange}
          />
          {errors["gender"] && errors["gender"].length > 0 && (
            <div className="form-error">{errors["gender"]}</div>
          )}
        </div>
        <div className="form-row">
          <label>DOB</label>
          <input
            type="date"
            placeholder="please input DOB"
            name="dob"
            value={formValue.dob}
            onChange={onInputChange}
          />
          {errors["dob"] && errors["dob"].length > 0 && (
            <div className="form-error">{errors["dob"]}</div>
          )}
        </div>
        <div className="form-row">
          <button>Add new user</button>
        </div>
      </form>
    </div>
  );
};
export default AddUserForm;
