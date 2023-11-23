 const mailjet = require('node-mailjet').apiConnect(
    "64735f8de1569261081db264d8e48871",
    "a51ae21724ee5a149faa09db3b490863"
  );
 module.exports =  function(email,otp,callback){
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'aagupta@ssipmt.com',
              Name: 'Achiever-marketing',
            },
            To: [
              {
                Email: email,
                Name: "Not Required",
              },
            ],
            Subject: 'Email Verification',
            TextPart: 'Verify your email to continue!',
            HTMLPart:
              `<h3>Wow Wow Market Welcomes You!</h3><br>
              <h2>Your one time Verification code is<h2>
              <center><b>${otp}</b></center>
              <a href="http://localhost:3000/">Home</a> `
              ,
          },
        ],
      })
      request
        .then(result => {
          console.log(result.body)
          callback(null,result.body);
        })
        .catch(err => {
          console.log(err.statusCode)
          callback(err,null);
        })
  }
 