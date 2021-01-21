import Post from '../models/post.js';
import sequelize from '../models/db.js';
import pkg from 'sequelize';
import Like from '../models/like.js';
import LikeCount from '../models/likeCount.js';

const {QueryTypes, Op} = pkg;

const postPost = async (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  const header = req.body.header;
  const description = req.body.description;
  const userId = req.userId;

  const now = new Date().getTime();

  const post = await Post.create({
    imageUrl: imageUrl,
    header: header,
    description: description,
    userId: userId,
    createdAt: now,
  });
  await LikeCount.create({
    postId: post.id,
  });

  res.status(201).end();
};

const getPosts = async (req, res, next) => {
  const userId = req.params.userId;
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);

  const posts = await Post.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    where: {userId: userId}
  });

  const total = await Post.count({
    where: {userId: userId}
  });


  res.json({
    data: posts,
    total: total,
    page: page,
    perPage: limit,
  });
};

const getFeedPosts = async (req, res, next) => {
  const userId = req.params.userId;
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);

  const feedPosts = await sequelize.query(`
      SELECT posts.*,
             users.name           AS user_name,
             users.imageUrl       AS user_image_url,
             users.bio            AS user_bio,
             likes.id IS NOT NULL AS is_liked,
             like_counts.count    AS like_count
      FROM posts
               INNER JOIN users ON users.id = posts.userId
               LEFT JOIN likes ON likes.postId = posts.id AND likes.userId = :userId
               INNER JOIN like_counts ON like_counts.postId = posts.id
      WHERE users.id IN (
          SELECT follows.followedId
          FROM follows
                   INNER JOIN users ON follows.followeeId = users.id
          WHERE users.id = :userId
      )
      ORDER BY createdAt DESC LIMIT :dataOffset, :limit;
  `, {
    type: QueryTypes.SELECT,
    replacements: {
      userId: userId,
      dataOffset: (page - 1) * limit,
      limit: limit,
    }
  });

  const total = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM posts
          INNER JOIN users
      ON users.id = posts.userId
      WHERE users.id IN (
          SELECT follows.followedId
          FROM follows
          INNER JOIN users ON follows.followeeId = users.id
          WHERE users.id = :userId
          );
  `, {
    type: QueryTypes.SELECT,
    replacements: {userId: userId}
  });

  res.json({
    data: feedPosts,
    total: total[0]['count'],
    page: page,
    perPage: limit,
  });
};

const getExplorePosts = async (req, res, next) => {
  const userId = req.userId;
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);

  const posts = await Post.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: [
      ['likeCount', 'DESC']
    ],
    where: {
      userId: {[Op.not]: Number.parseInt(userId)},
    }
  });
  const total = await Post.count();

  res.json({
    data: posts,
    total: total,
    page: page,
    perPage: limit,
  });
};

const postLike = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.body.postId;

  await Like.create({
    userId: userId,
    postId: postId,
  })
  await LikeCount.increment('count', {
    by: 1,
    where: {postId: postId},
  });
  res.end();
};

const postDislike = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.body.postId;

  await Like.destroy({
    where: {
      userId: userId,
      postId: postId,
    }
  });
  await LikeCount.decrement('count', {
    by: 1,
    where: {postId: postId},
  });

  res.end();
};

export {
  postPost,
  getPosts,
  getFeedPosts,
  getExplorePosts,
  postLike,
  postDislike,
};