import { Button, Dialog } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import JobCreation from "./JobCreation";
import "./Main.scss";

import axios from "axios";
import { GLOBAL_VAR } from "../../../GlobalVar";
import JobsListComp from "./JobsListComp";
const JobsList = () => {
  const [isShown, setIsShown] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getJobs();
  }, [isShown]);

  const getJobs = async () => {
    try {
      const { data: jobs } = await axios.get(`${GLOBAL_VAR.BASEURL}/jobs`);
      if (jobs.length > 0) {
        setData(jobs);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mainPage">
      <div className="rowBetween">
        <h1>
          Welcome, here is the list of jobs created by our clients{" "}
          <span style={{ color: GLOBAL_VAR.BLUE_COLOR }}>
            ( {data.length} ){" "}
          </span>
        </h1>
        <Button className="buttonPrimary" onClick={() => setIsShown(true)}>
          Create a Job
        </Button>
      </div>
      <Dialog
        isShown={isShown}
        title={<p className="dialogTitle">Create a job</p>}
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
      >
        <JobCreation setIsShown={setIsShown} />
      </Dialog>
      <JobsListComp data={data} />
    </div>
  );
};

export default JobsList;
