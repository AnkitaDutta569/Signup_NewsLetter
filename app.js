const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
mailchimp.setConfig({
    apiKey: "5d24e1b11627d6e99522b653e7430f8e-us21",
    server: "us21"
  });
const port = 4000;
 //mailchimp
 //go to extras->create api key
 //5d24e1b11627d6e99522b653e7430f8e-us21
 //ID List is now called the Audience List in mailchimp.

// To find the list, follow below steps:

// 1. Go to your Mailchimp Account (https://us13.admin.mailchimp.com/)

// 2. Click Audience on your left-side panel.

// 3. Click All Contacts.

// 4. Click Settings dropdown on the work area.

// 5. Select Audience Name and Defaults.

// 6. Locate the Audience ID and copy it.
 //audience id-c1b4588c9d
app.use(express.static('public'));
//app.use(express.static(__dirname));
 app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});
 app.post('/',function(req,res){
    // var firstname = req.body.fname;
    // var lastname = req.body.lname;
    // var mail = req.body.email;
    // console.log(firstname+lastname+mail);
    const listId = "c1b4588c9d";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };
 
  async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      res.sendFile(__dirname + "/success.html")
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );

  }
 
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
 })
app.listen(process.env.PORT||port, function() {
    
  
     console.log(`Example app listening at http://localhost:${port}`);
});