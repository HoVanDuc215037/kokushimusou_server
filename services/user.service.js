const Survey = require('../models/survey');
const User = require('../models/user');

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.find({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user item by email: ' + error.message);
  }
};

exports.saveSurveyData = async (inputdata) => {
  const inputemail = inputdata.email;
  try {
    const user = await User.findOne({
      email: inputemail,
    });
    if (user) {
      const survey = await Survey.create(inputdata);
      return survey;
    }
  } catch (error) {
    throw new Error('Error fetching user item by email: ' + error.message);
  }
};