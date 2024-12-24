const Post = require('../models/post');

exports.getPost = async () => {
  try {
    const posts = await Post.find(); // Fetch all posts
    return posts;
  } catch (error) {
    throw new Error('Error fetching posts: ' + error.message);
  }
}

exports.createPost = async (data) => {
  try {
    const posts = await Post.create(data); // Fetch all posts
    return posts;
  } catch (error) {
    throw new Error('Error create post: ' + error.message);
  }
}