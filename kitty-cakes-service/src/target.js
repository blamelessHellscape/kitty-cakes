const request = require("request");
const pi_addr = "http://192.168.0.1"; //insert actual IP here.

const target = (cat) => {
    request.post({
    headers: {'content-type' : 'application/json'},
    url:     pi_addr,
    body:    {'cat': cat}
  }, function(error, response, body){
    console.log(body);
  });
}

module.exports = {target}