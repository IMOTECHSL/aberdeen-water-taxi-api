"use strict";
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(
  "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"
);
const messageOptions = {};

const verificationEmail = (user = {}) => {
  let message = {
    to: user.email,
    from: {
      name: "ABERDEEN WATER TAXI",
      email: "chinedum.eke@imo-tech.com",
    },
    subject: "ACCOUNT CREATED SUCCESSFULLT",
    text: "Account Created Successfully",
    html: `<h1>Dear ${user.fullname}</h1> </br> 
    <p>Your Account has been created successfully.</p>
    <p>Please use the code below to verify your account</p>
    <p>Verification Code: <strong>${user.token}</strong></p>`,
  };

  sendGrid
    .send(message)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const registrationEmail = (req, token) => {
  let message = {
    to: "rolandeke49@gmail.com",
    from: {
      name: "ABERDEEN WATER TAXI",
      email: "chinedum.eke@imo-tech.com",
    },
    subject: "Reservation Successful",
    text: "Ticket Reservation was successful",
    html: "<h1>Reservation Successful</h1> </br> <h4>Reservation ID: <span>829734234234</span></h4>",
  };

  sendGrid
    .send(message)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const reservationCompleteEmail = async (data = {}) => {
  let message = {
    to: data.email,
    from: {
      name: "ABERDEEN WATER TAXI",
      email: "chinedum.eke@imo-tech.com",
    },
    subject: "Reservation Successful",
    text: "Ticket Reservation was successful",
    html: `<h1>Reservation Successful</h1> </br> 
    <p>Dear ${data.passengerName}</p> <br>
   <p>Thank you for using Aberdeen Water Taxi. Your reservation was successful. Find below your reservation details:</p>
   <ul>
   <li>Order ID: ${data.uuid}</li>
    <li>Travel Date:${data.travelDate}</li>
    <li>Travel Time: ${data.travelTime}</li>
    <li>Travel Type: ${data.travelType}</li>
    <li>Airline:${data.airline}</li>
    <li>From:${data.fromLocation}</li>
    <li>Airline:${data.toLocation}</li>
    <li>Taxi:${data.boat}</li>
    <li> <img src="http://172.19.143.50:3000/${data.qrCode}" width=150 height=150 />
         </li>
   </ul>
   <h2>Note:</h2>
   <p>All OUTBOUND passengers must ensure that they are at the terminal an hour before their departure time,  as this would help them to be on time at the airport for check-ini</p>
    `,
  };

  sendGrid
    .send(message)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  verificationEmail,
  registrationEmail,
  reservationCompleteEmail,
};

// http://172.19.143.50:3000/images/qr/976aaebd-7ac1-441f-8b13-8671f59adb30.png
