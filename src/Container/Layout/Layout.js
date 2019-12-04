import React, { Component } from "react";
import Aux from "../../Hoc/auxillery";
import classes from "./Layout.css";
import Toolbar from "../../Components/Navigations/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigations/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawerclosed: false
  };
  sideDrawerClosedHandler = () => {
    this.setState({ sideDrawerclosed: false });
  };
  openDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { sideDrawerclosed: !prevState.sideDrawerclosed };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar openDrawerToggle={this.openDrawerToggleHandler} />
        <SideDrawer
          closedSD={this.sideDrawerClosedHandler}
          OpenSD={this.state.sideDrawerclosed}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
