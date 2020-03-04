import React, { Component } from 'react';
import { Button } from 'antd';

class LogButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Pause Log'
    };
    this.clickButton = this.clickButton.bind(this);
  }

  clickButton = () => {
    this.state.buttonText === "Pause Log" ?
    this.setState({
      buttonText: "Resume Log"
    }) : this.setState({buttonText: "Pause Log"});
    this.props.changeButton();
  }

  render() {
    return (
      <div>
        <Button style={{
          float: "right", width: 150, height: 30, borderRadius: 10, borderColor: "black", fontFamily: "Courier New", fontWeight: 600, fontSize: 12 }} onClick={this.clickButton}>
          {this.state.buttonText}
        </Button>
      </div>
    );
  }
}

export default LogButton;