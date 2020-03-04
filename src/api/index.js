export default class API {
  static getStockPrice = () => {
    return new Promise((resolve, reject) => {
      fetch("https://join.reckon.com/stock-pricing").then(response => {
        response
          .json()
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  };
}
