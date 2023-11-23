const mailjet = require('node-mailjet').apiConnect(
    "64735f8de1569261081db264d8e48871",
    "a51ae21724ee5a149faa09db3b490863"
  );
 module.exports =  function(email,callback){
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
            Subject: 'Forgot password',
            TextPart: 'Change your Password',
            HTMLPart:
              `<h3>Wow Wow Market Here!</h3><br>
              <h2>Click on the link Below to Change Your Password<h2>
              <a href="http://localhost:3000/forgotchangepassword">Change My Password</a>`
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
 