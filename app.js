// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
      var firstName = req.body.fName;
      var lastName = req.body.lName;
      var email = req.body.email;

      var data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      };

      var jsonData = JSON.stringify(data);

      var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/0717489cb7",
        method: "POST",
        headers: {
          "Authorization": "anystring 0d82829c4940c054a9c8d465ef94e9aa-us20"
        },
        body:jsonData
      };

      request(options, function(error, response, body) {
          if (error) {
            res.sendFile(__dirname + "/failure.html");
            // console.log(error);
          } else {
            if (response.statusCode === 200) {
              res.sendFile(__dirname + "/success.html");
              // console.log(response.statusCode);
            } else {
              res.sendFile(__dirname + "/failure.html");
            }
          }
        });
      });


    app.post("/failure", function(req, res) {
      res.redirect("/");
    });

    app.listen(process.env.PORT || 3000, function() {
      console.log("Server is running on port 3000");
    });

    //API Key
    // 0d82829c4940c054a9c8d465ef94e9aa-us20
    //List ID
    // 0717489cb7
