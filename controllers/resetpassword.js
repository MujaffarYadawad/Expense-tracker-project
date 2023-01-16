const uuid = require('uuid');
const sgMail = require("@sendgrid/mail");


const User = require('../models/signup')
const ForgotPassword = require('../models/forgotpassword');

exports.forgotPassword = async (req, res, next) => {
  try {
    const {email} = req.body;
    console.log('email->', email)
    const user = await User.findOne({where: {email: email}})
    //console.log(user);
      if (user) {
        const id = uuid.v4();
        console.log('id-->',id)
        // user.createForgotpassword({ id, active: true })
        // .catch((err) => {
        //   console.log(err)
        //   throw new Error(err);
        // });
        const resetData = await ForgotPassword.create({
          id: id,
          active: true,
          userId: user.id,
        });
        if (resetData) {
          try {
            console.log("data entered in reset password table successfully");
          } catch (err) {
            console.log(err);
          }
        }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
          to: email, // Change to your recipient
          from: "mujaffaryadawad587313@gmail.com", // Change to your verified sender
          subject: "Sending with SendGrid is Fun",
          text: "and easy to do anywhere, even with Node.js",
          html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
        };
       // console.log('msg-->', msg)

        sgMail
          .send(msg)
          .then((response) => {
            // console.log(response[0].statusCode)
            // console.log(response[0].headers)
            return res
              .status(response[0].statusCode)
              .json({
                message: "Link to reset password sent to your mail ",
                sucess: true,
              });
          })
          .catch((error) => {
            throw new Error(error);
          });

        //send mail
      } else {
        throw new Error("User doesnt exist");
      }

  } catch (err) {
    console.log(err)


  }
}

 