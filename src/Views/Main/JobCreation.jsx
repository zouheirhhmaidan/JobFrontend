import { Alert, Button, TextInput } from "evergreen-ui";
import React, { useState } from "react";
import "./Main.scss";
import axios from "axios";
import { GLOBAL_VAR } from "../../../GlobalVar";
const JobCreation = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    title: "",
    description: "",
  });

  const [jobData, setJobData] = useState([]);

  const [pending, setPending] = useState(false);

  const formInputs = [
    { title: "Name", value: form.name, field: "name" },
    { title: "Last name", value: form.lastName, field: "lastName" },
    { title: "Title", value: form.title, field: "title" },
    {
      title: "Description",
      value: form.description,
      field: "description",
    },
  ];

  const onChange = (value, name) => {
    let temp = { ...form };
    temp[name] = value;
    setForm(temp);
  };

  const getJobById = async (id) => {
    try {
      let { data: results } = await axios.get(
        `${GLOBAL_VAR.BASEURL}/jobs/${id}`
      );

      if (Object.keys(results).length > 0) {
        setJobData(results);
      } else {
        throw Error;
      }
    } catch (err) {
      alert("Oops! Something went wrong, please contact your admin.");
    }
  };

  const checkRequired = () => {
    if (
      form.description.length == 0 ||
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
        description: form.description,
      };
      //   const { data: pending } = await axios.get(
      //     "https://api.unsplash.com/photos/random?query=food&pages=1",
      //     {
      //       headers: {
      //         Authorization: `Client-ID ${GLOBAL_VAR.ACCESS_KEY}`,
      //       },
      //     }
      //   );
      let pending = { links: { self: "https://hnasdbfjna" } };
      let { data: JobCreation } = await axios.post(
        `${GLOBAL_VAR.BASEURL}/jobs`,
        {
          ...body,
          image: pending.links.self,
        }
      );

      if (JobCreation?.id) {
        getJobById(JobCreation.id);
      } else {
        throw Error;
      }
    } catch (err) {
      console.log(err);
      alert("Oops! Please check your internet conneciton.");
    } finally {
      setPending(false);
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
            style={{ backgroundColor: "#1591ea", color: "white" }}
          >
            {pending ? "Creating" : "Create"}
          </Button>
        </div>
        {pending && <p className="pendingText">Your job is pending...</p>}
      </div>
    </div>
  );
};

export default JobCreation;
