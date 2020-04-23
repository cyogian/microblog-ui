import React from "react";
import PropTypes from "prop-types";
import { TextArea } from "semantic-ui-react";

import classes from "./ControlledInput.module.css";

const ControlledInput = (props) => {
  const { value, maxLength, minLength, placeHolder } = props;
  const negative = value.length > maxLength ? classes.Negative : null;
  const positive =
    value.length >= minLength && !negative ? classes.Positive : null;
  const textClass = `${classes.Text} ${negative}`;
  return (
    <div className={classes.ControlledInput}>
      <TextArea
        className={textClass}
        onInput={props.onInput}
        value={value}
        placeholder={placeHolder}
        rows={5}
      />
      <div className={`${classes.Length} ${negative} ${positive}`}>
        {value.length} / {props.maxLength}
      </div>
    </div>
  );
};

ControlledInput.propTypes = {
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  onInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
};

ControlledInput.defaultProps = {
  minLength: 1,
  maxLength: 180,
};

export default ControlledInput;
