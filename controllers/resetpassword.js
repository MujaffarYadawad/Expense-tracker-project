const uuid = require("uuid");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");

const User = require("../models/signup");
const ForgotPassword = require("../models/forgotpassword");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("email->", email);
    const user = await User.findOne({ where: { email: email } });
    //console.log(user);
    if (user) {
      const id = uuid.v4();
      console.log("id-->", id);
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
        html: `<a href="http://43.207.54.88:3000/password/resetpassword/${id}">Reset password</a>`,
      };
      console.log("msg-->", msg);

      sgMail
        .send(msg)
        .then((response) => {
          // console.log(response[0].statusCode)
          // console.log(response[0].headers)
          return res.status(response[0].statusCode).json({
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
    console.log(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const id = req.params.id;
  const request = await ForgotPassword.findOne({ where: { id } });
  if (request) {
    request.update({ active: false });
    res.send(`<html>
                        <form action="/password/updatepassword/${id}" method="get">
                            <label for="newpassword">Enter New password</label>
                            <input name="newpassword" type="password" required></input>
                            <button>reset password</button>
                        </form>
                    </html>`);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const newPassword = req.query.newpassword;
    // console.log('new password-->', newPassword);
    const id = req.params.rid;
    // console.log('id-->', id)
    const request = await ForgotPassword.findAll({ where: { id: id } });
    // console.log('req-->',request);
    const user = await User.findAll({ where: { id: request[0].userId } });
    //  console.log('user-->',user);
    if (user) {
      const saltRounds = 10;
      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        await User.update(
          { password: hash },
          { where: { id: request[0].userId } }
        );
        res
          .status(201)
          .json({ message: "Successfuly update the new password" });
      });
    } else {
      return res.status(404).json({ error: "No User Exist", success: false });
    }
  } catch (error) {
    console.log(error);
  }
};
