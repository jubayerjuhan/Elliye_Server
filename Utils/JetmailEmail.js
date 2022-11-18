const mailjet = require('node-mailjet')
  .connect('2b7673adb30113718bff5521270756b4', 'a751dc56a01fa4afb778dc3e53cccc59')

exports.sendResetPassEmail = (email, message, res) => {
  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "davidjuhan23@gmail.com",
            "Name": "Jubayer"
          },
          "To": [
            {
              "Email": `${email}`,
              "Name": "User"
            }
          ],
          "Subject": "Ecommerce Site Password Reset Mail",
          "TextPart": `${message}`,
        }
      ]
    })
  request
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'We Have Sent A Password Reset Mail To Your Account, Please Check Your Email'
      })
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}

exports.sendAccountCreateEmail = (email, name) => {
  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "davidjuhan23@gmail.com",
            "Name": "Jubayer"
          },
          "To": [
            {
              "Email": `${email}`,
              "Name": `${name}`
            }
          ],
          "Subject": "Welcome To New Ecom Site",
          "TextPart": `Hello ${name}, \n Welcome To Our New Ecom Site\n Shop Good And Happy Coding`,
        }
      ]
    })
  request
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}