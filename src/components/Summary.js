import React, {useState, useEffect} from 'react';
import {Row, Col} from 'antd';
import API from '../api/index';

const Summary = () => {
  const [summaryData, setSummary] = useState([]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      API.getStockPrice()
        .then(res => {
          let summary = summaryData;
          const summaryList = res.map(stock => {
            return {
              code: stock.code,
              startingPrice: stock.price,
              highestPrice: stock.price,
              lowestPrice: stock.price,
              currentPrice: stock.price,
            };
          });
          summaryList.sort((a, b) => {
            return a.stock > b.stock;
          });
          if (summary.length !== 0) {
            for (let i=0; i<summary.length;i++) {
              if (summary[i].highestPrice < summaryList[i].highestPrice) {
                summary[i].highestPrice = summaryList[i].highestPrice;
              }
              if (summary[i].lowestPrice > summaryList[i].lowestPrice) {
                summary[i].lowestPrice = summaryList[i].lowestPrice;
              }
              summary[i].currentPrice = summaryList[i].currentPrice;
            }
          } else {
            summary = summaryList;
          }
          setSummary(summary);
          setTime(Date.now());
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, [summaryData]);

  return (
    <div className="summary">
      <h1>Summary</h1>
      <div className="summary-container">
      <Row className="summary-row">
        <Col className="summary-content" span={4}>Stock</Col>
        <Col className="summary-content" span={5}>Starting</Col>
        <Col className="summary-content" span={5}>Highest</Col>
        <Col className="summary-content" span={5}>Lowest</Col>
        <Col className="summary-content" span={5}>Current</Col>
      </Row>
      {summaryData.map(stock => 
        <Row className="summary-row">
          <Col className="summary-content" span={4}>{stock.code}</Col>
          <Col className="summary-content" span={5}>{stock.startingPrice}</Col>
          <Col className="summary-content" span={5}>{stock.highestPrice}</Col>
          <Col className="summary-content" span={5}>{stock.lowestPrice}</Col>
          <Col className="summary-content" span={5}>{stock.currentPrice}</Col>
        </Row>
      )}
      </div>
    </div>
  );
};

export default Summary;