import axios from "axios";
import { Button, TextInput } from "evergreen-ui";
import React, { useState } from "react";
import { GLOBAL_VAR } from "../../../GlobalVar";
import "./Main.scss";

const JobCreation = (props) => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    title: "",
  });

  const [jobData, setJobData] = useState([]);

  const [pending, setPending] = useState(false);

  const formInputs = [
    { title: "Name", value: form.name, field: "name" },
    { title: "Last name", value: form.lastName, field: "lastName" },
    { title: "Title", value: form.title, field: "title" },
  ];

  const onChange = (value, name) => {
    let temp = { ...form };
    temp[name] = value;
    setForm(temp);
  };

  const checkRequired = () => {
    if (
      form.name.length == 0 ||
      form.lastName.length == 0 ||
      form.title.length == 0
    ) {
      alert("Please fill in all the fields before creating a job");
    } else {
      createJob();
    }
  };

  const createJob = async () => {
    try {
      setPending(true);
      let body = {
        name: form.name,
        lastName: form.lastName,
        title: form.title,
      };
      let { data: JobCreation } = await axios.post(
        `${GLOBAL_VAR.BASEURL}/jobs`,
        body
      );
      console.log(JobCreation);
    } catch (err) {
      console.log(err);
      alert("Oops! Please check your internet conneciton.");
    } finally {
      setPending(false);
      props.setIsShown(false);
    }
  };

  return (
    <div className="FormCont">
      <div className="formInput">
        {formInputs.map((item) => {
          return (
            <TextInput
              key={item.field}
              placeholder={item.title}
              value={item.value}
              onChange={(e) => onChange(e.target.value, item.field)}
              className="inputField"
            />
          );
        })}
        <div className="buttonCenter">
          <Button
            className="buttonPrimary"
            onClick={checkRequired}
            isLoading={pending}
          >
            {pending ? "Creating" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCreation;
