import axios from "axios";

export default class API {
  // static getStockPrice = () => {
  //   return new Promise((resolve, reject) => {
  //     const url = 'https://join.reckon.com/stock-pricing';
  //     const options = {
  //       method: "GET",
  //       url
  //     };

  //     axios(options)
  //       .then(res => resolve(res))
  //       .catch(err => reject(err));
  //   });
  // };
  static getStockPrice = () => {
    return new Promise((resolve, reject) => {
      fetch('https://join.reckon.com/stock-pricing').then((response) => {
        response.json().then((data) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    });
  }
}