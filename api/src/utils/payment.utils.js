"use strict";
require("dotenv").config({
  path: "../../.env",
});
const qs = require("qs");
const axios = require("axios").default;
// axios.defaults.headers.common["Authorization"] =
//   process.env.OM_BASIC_AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

const TOKEN_URL = "https://api.orange.com/oauth/v3/token";
const PAYMENT_URL =
  "https://api.orange.com/orange-money-webpay/dev/v1/webpayment";
const getAccessToken = async (next) => {
  try {
    const { data } = await axios
      .post(
        TOKEN_URL,
        qs.stringify({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            Authorization: process.env.OM_BASIC_AUTH_TOKEN,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .catch((err) => {
        throw err;
      });
    const { token_type, access_token } = data;
    // axios.defaults.headers.common[
    //   "Authorization"
    // ] = `${token_type} ${access_token}`;

    return `${token_type} ${access_token}`;
  } catch (error) {
    throw error;
  }
};

const getPaymentURL = async (orderId, amount) => {
  const token = await getAccessToken();
  // axios.defaults.headers.common["Authorization"] = token;
  // axios.defaults.headers.post["Content-Type"] = "application/json";

  const { data } = await axios
    .post(
      PAYMENT_URL,
      {
        merchant_key: process.env.OM_MERCHANT_KEY,
        currency: "OUV",
        order_id: orderId,
        amount: Number(amount),
        return_url: "https://imo-tech.com/",
        cancel_url: "https://imo-tech.com/",
        notif_url: "https://imo-tech.com/",
        lang: "fr",
        reference: "ABERDEEN WATER TAXI",
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
    .catch((err) => {
      throw err;
    });
  const { payment_url } = data;
  return payment_url;
};

module.exports = {
  getPaymentURL,
};
