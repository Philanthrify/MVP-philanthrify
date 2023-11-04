const axios = require("axios");
const queryParams = {
  symbol: "AAPL",
  interval: "1min",
};

axios({
  method: "get",
  url: "https://api.twelvedata.com/time_series",
  headers: {
    Authorization: "apikey bd21455f84c94ee087f071412261605a",
  },
  params: queryParams,
}).then((response) => {
  console.log(response.data);
});
