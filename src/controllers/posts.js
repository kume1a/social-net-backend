import Post from '../models/post.js';

const postPost = async (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  const header = req.body.header;
  const description = req.body.description;
  const userId = req.userId;

  await Post.create({
    imageUrl: imageUrl,
    header: header,
    description: description,
    userId: userId,
  });

  res.status(201).end();
};

export {postPost};