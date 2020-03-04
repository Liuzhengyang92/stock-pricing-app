import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row} from 'antd';
import { getTimeString} from '../utils/index';
import LogButton from './LogButton';
import API from '../api/index';
import * as actionTypes from '../redux/actionTypes';

class Log extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      buttonText: "Pause",
      time: 0
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    } else {
      this.timer = setInterval(() => {
        API.getStockPrice()
          .then(res => {
            const newList = this.props.stockList;
            newList.push({ timestamp: Date.now(), data: res });
            this.props.updateStockList(newList);
            this.setState({ time: Date.now() });
          })
          .catch(err => {
            console.log('error: ', err);
          });
      },2000);
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      API.getStockPrice()
        .then(res => {
          const newList = this.props.stockList;
          newList.push({ timestamp: Date.now(), data: res });
          this.props.updateStockList(newList);
          this.setState({ time: Date.now() });
        })
        .catch(err => {
          console.log('error: ', err);
        });
      },
      2000);
  }

  render() {
    const { stockList } = this.props;
    stockList.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return (
      <div className="log">
        <div>
          <Row className="log-header">
            <h1>Log</h1>
            <LogButton style={{ float: "right", width: 100, height: 30, borderRadius: 5 }} changeButton={this.onClick}>{this.state.buttonText}</LogButton>
          </Row>
        </div>
        <div className="log-container">
          {stockList.map(record => 
            <div className="stock-container" style={{ width: "100%" }}>
              <p>Updates for {getTimeString(record.timestamp)}</p>
              {record.data.map(stock => {
                return (
                  <p>{stock.code}: {stock.price}</p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stockList: state.app.stockList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStockList: (stockList) => dispatch({ type: actionTypes.UPDATE_STOCK_LIST, payload: {stockList}})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Log);