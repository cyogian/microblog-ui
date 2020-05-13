import React, { Component } from "react";
import { Modal, Button, Input, Message } from "semantic-ui-react";
import {
  updateEmailReset,
  updateEmailResend,
  updateEmailVerify,
  updateEmailVerifyReset,
  updateEmailResendReset,
} from "../../../../store/actions/profileActions";
import { connect } from "react-redux";

import classes from "./VerifyUpdate.module.css";

class VerifyUpdate extends Component {
  state = {
    open: true,
    otp: {
      value: "",
      valid: false,
    },
  };
  componentDidMount() {
    this.props.onResetResend();
    this.props.onResetVerify();
  }
  onOTPChange = (e) => {
    let { value } = this.state.otp;
    let targetValue = e.target.value.trim();
    let valid = false;
    if (
      !isNaN(targetValue) &&
      isFinite(targetValue) &&
      targetValue.length <= 6
    ) {
      value = targetValue;
      if (targetValue.length === 6) {
        valid = true;
      }
    }
    this.setState({
      otp: { value, valid },
    });
  };
  onVerify = () => {
    this.props.onVerify(
      this.props.data.tempId,
      this.state.otp.value,
      this.props.token
    );
  };
  onResend = () => {
    this.props.onResend(this.props.data.tempId, this.props.token);
  };
  close = () => {
    this.props.onResetUpdateEmail();
  };
  render() {
    const { open, otp } = this.state;
    const {
      data,
      verifyLoading,
      resendLoading,
      verifyError,
      resendError,
    } = this.props;

    return (
      <Modal
        open={open}
        onClose={this.close}
        size="small"
        className={classes.VerifyUpdate}
      >
        <Modal.Header>Verify Email</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              A six digit OTP has been sent to your email address{" "}
              <strong>{data.email}</strong>. Enter the OTP below & click on
              "Verify" to change your email address.
            </p>
            <p>
              <strong>Note:</strong> If you have not received the email yet,
              click on "Resend OTP".
            </p>
            <p style={{ textAlign: "center" }}>
              <Input
                onChange={this.onOTPChange}
                type="text"
                value={otp.value}
              />
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            size="mini"
            icon="check"
            content="Verify"
            loading={verifyLoading}
            disabled={!otp.valid || verifyLoading || resendLoading}
            onClick={this.onVerify}
          />
          <Button
            secondary
            size="mini"
            icon="redo"
            content="Resend OTP"
            loading={resendLoading}
            disabled={verifyLoading || resendLoading}
            onClick={this.onResend}
          />
          {!verifyLoading && verifyError ? (
            <Message error>{verifyError}</Message>
          ) : null}
          {!resendLoading && resendError ? (
            <Message error>{resendError}</Message>
          ) : null}
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    verifyLoading: state.updateEmailVerify.loading,
    resendLoading: state.updateEmailResend.loading,
    verifyError: state.updateEmailVerify.error,
    resendError: state.updateEmailResend.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onResetUpdateEmail: () => dispatch(updateEmailReset()),
    onResend: (tempId, token) => dispatch(updateEmailResend(tempId, token)),
    onVerify: (tempId, otp, token) =>
      dispatch(updateEmailVerify(tempId, otp, token)),
    onResetResend: () => dispatch(updateEmailResendReset()),
    onResetVerify: () => dispatch(updateEmailVerifyReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyUpdate);
