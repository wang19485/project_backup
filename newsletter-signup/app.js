const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  mailchimp.setConfig({
    apiKey: 'df7f4cd96e028392a6865a13f867113d-us14',
    server: 'us14',
  });
  const listId = "5cc2b9eeeb";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };


  // const jsonData = JSON.stringify(data);
  // https.request(url, options, function(response))
  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });

      res.sendFile(__dirname + "/success.html");
      //res.send(response);
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${
        response.id}.`
      );
    } catch (e) {
        const data = JSON.parse(e.response.text)
        console.log("Error title: " + data.title +
        "\nError code: " + data.status +
        "\nError detail: " + data.detail
        );

        //res.send(data);
        //const jdata = JSON.stringify(e.response);
        //console.log(e.response);
        // e.response.on("data",function(data){
        //   const jdata = JSON.stringify(data);
        //   console.log(jdata);
        // });
        res.sendFile(__dirname + "/failure.html");
    }
  }
  run();
});


app.post("/failure",function(req, res){
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

//API df7f4cd96e028392a6865a13f867113d-us14

//list id 5cc2b9eeeb
