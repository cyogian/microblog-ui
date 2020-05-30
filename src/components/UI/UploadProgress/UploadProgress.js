import React from "react";
import PropTypes from "prop-types";

import classes from "./UploadProgress.module.css";

const UploadProgress = (props) => {
  const progress = `${props.progress}%`;
  return (
    <div className={classes.UploadProgress}>
      <span style={{ color: props.progress >= 55 ? "white" : "black" }}>
        {progress}
      </span>
      <div className={classes.Progress} style={{ width: progress }}></div>
    </div>
  );
};

UploadProgress.propTypes = {
  progress: PropTypes.number,
};

UploadProgress.defaultProps = {
  progress: 0,
};

export default UploadProgress;
