
const db = require('../_helpers/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const privateKey = process.env.privateKey;

module.exports = {
    register,
    authenticate
};
async function authenticate(email, password){
    // Validate if user exist in our database
    const user = await db.User.findOne({ email });
    if(!user)
        throw ({ status: 404, code: 'USER_NOT_EXISTS', message: 'E-mail address does not exist.' });
    if (bcrypt.compareSync(password, user.password)) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id},
          privateKey.toString(),
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
        await user.save();
        return user;
      }
    else
        throw ({ status: 401, code: 'LOGIN_INVALID', message: 'Invalid authentication credentials.' });
}
async function register(params){
    if (await db.User.findOne({ email: params.email })) {
        return;
    }
    let encryptedPassword = await bcrypt.hash(params.password, 10);
    const user = await db.User.create({
        first_name: params.first_name,
        last_name: params.last_name,
        email: params.email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
    //create token
    const token = jwt.sign(
        { user_id: user._id},
        privateKey,
        {
          expiresIn: "2h",
        }
      );
      // save user token
    user.token = token;
    await user.save();
    return(user)
}