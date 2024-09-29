import React, { useState } from "react";
import "./Main.scss";
import { Dialog } from "evergreen-ui";
import JobCreation from "./JobCreation";
const JobsList = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="mainPage">
      <div className="rowBetween">
        <h1>Welcome, here is the list in all jobs created by our clients </h1>
        <button className="buttonPrimary" onClick={() => setIsShown(true)}>
          Create a Job
        </button>
      </div>
      <Dialog
        isShown={isShown}
        title={<p className="dialogTitle">Create a job</p>}
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
      >
        <JobCreation />
      </Dialog>
    </div>
  );
};

export default JobsList;
