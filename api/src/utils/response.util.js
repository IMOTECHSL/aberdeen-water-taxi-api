const moment = require("moment");
class Response {
  constructor(statusCode, status, data) {
    this.timestamp = moment().format();
    this.statusCode = statusCode;
    this.status = status;
    this.data = data;
  }
}

export default Response;
