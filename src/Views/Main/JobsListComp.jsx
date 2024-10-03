import { Pane } from "evergreen-ui";
import React, { useState } from "react";

const JobCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Pane
      elevation={3}
      float="left"
      width={300}
      height={300}
      margin={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="JobCard"
    >
      <div className="jobName">
        <p className="jobNameText">{item.name}</p>
        <p className="jobNameText">{item.lastName}</p>
      </div>
      <p className="jobTitleText">{item.title}</p>
      {item.status === "pending" ? (
        <p className="loadingText">Image {item.status}...</p>
      ) : (
        <>
          {!imageLoaded && <p className="loadingText">Loading image...</p>}
          <img
            src={item.image}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            className="jobImage"
            alt="job"
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </>
      )}
    </Pane>
  );
};

const JobsListComp = ({ data }) => {
  return (
    <div>
      {data.length > 0 &&
        data.map((item) => <JobCard key={item.id} item={item} />)}
    </div>
  );
};

export default JobsListComp;
