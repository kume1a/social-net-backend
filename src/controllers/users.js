import User from '../models/user.js';
import Follow from '../models/follow.js';
import pkg from 'sequelize';
import Post from '../models/post.js';

const {Op} = pkg;

const getUser = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findByPk(userId, {
    attributes: ['id', 'name', 'imageUrl']
  });
  res.json(user.toJSON());
};

const getFollowStatus = async (req, res, next) => {
  const followeeId = req.userId;
  const followedId = req.params.userId;

  const follows = await getIfUserFollows(followeeId, followedId);
  res.json(JSON.stringify(follows));
};

const postSwitchFollowStatus = async (req, res, next) => {
  const followeeId = req.userId;
  const followedId = req.params.userId;

  const follows = await getIfUserFollows(followeeId, followedId);

  if (follows) {
    await Follow.destroy({
      where: {
        [Op.and]: [
          {followeeId: followeeId},
          {followedId: followedId}
        ],
      }
    });
  } else {
    await Follow.create({
      followeeId: followeeId,
      followedId: followedId,
    });
  }

  res.end();
};

const getIfUserFollows = async (followeeId, followedId) => {
  const followRow = await Follow.findOne({
    where: {
      [Op.and]: [
        {followeeId: followeeId},
        {followedId: followedId}
      ],
    }
  });

  return followRow != null;
};

const getUserMeta = async (req, res, next) => {
    const userId = req.params.userId;

    const followerCount = await Follow.count({
      where: {followedId: userId}
    });
    const followingCount = await Follow.count({
      where: {followeeId: userId}
    });
    const postCount = await Post.count({
      where: {userId: userId}
    });

    res.json({
      followingCount: followingCount,
      followerCount: followerCount,
      postCount: postCount,
    })
};

export {
  getUser,
  getFollowStatus,
  postSwitchFollowStatus,
  getUserMeta
};