const Survey = require('../models/survey');
const User = require('../models/user');
const Favorite = require('../models/favorite');

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

exports.processUserLikePost = async (data) => {
  try {
    const favourite = await Favorite.create(data);
    return favourite;
  } catch (error) {
    throw new Error('Error create Favorite: ' + error.message);
  }
}

exports.getFavoritePostOfAnUser = async (userId) => {
  try {
    const favourites = await Favorite.find({ userId }).populate({ path: 'postId' });
    if (!favourites) {
      throw new Error('User does not like any post');
    }
    return favourites.map(favourites => favourites.postId);
  } catch (error) {
    console.error('Error in userServices:', error);
    throw new Error('Error fetching favorite post of user: ' + error.message);
  }
}

exports.getUser = async () => {
  try {
    const users = await User.find(); // Fetch all users
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}