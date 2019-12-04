import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../Hoc/auxillery";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentDidUpdate() {
    console.log("odersummary will update");
  }
  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.cancelModal}
        ></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show
              ? "translateY(-10vh)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0.05"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
