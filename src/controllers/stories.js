import Story from '../models/story.js';
import pkg from 'sequelize';
import sequelize from '../models/db.js';

const {QueryTypes} = pkg;

const postStory = async (req, res, next) => {
  const userId = req.userId;
  const imageUrl = req.body.imageUrl;

  const story = await Story.create({
    userId: userId,
    imageUrl: imageUrl,
    createdAt: Date.now(),
  });

  res.status(201).json(story.toJSON());
};

const getUserStories = async (req, res, next) => {
  const userId = req.params.userId;

  const stories = await Story.findAll({
    where: {userId: userId},
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  res.json(stories);
};

const getFeedStories = async (req, res, next) => {
  const userId = req.userId;
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);
  const currentTimeLastDay = Date.now() - 86_400_000;

  const storyAuthors = await sequelize.query(`
    SELECT DISTINCT
        users.id AS id,
        users.name AS name,
        users.imageUrl AS imageUrl
      FROM stories
        INNER JOIN users ON users.id = stories.userId
    WHERE users.id IN (
      SELECT follows.followedId
      FROM follows
        INNER JOIN users ON follows.followeeId = users.id
        WHERE users.id = :userId
      )
    AND stories.createdAt > :currentTimeLastDay
    -- ORDER BY createdAt DESC 
    LIMIT :dataOffset, :limit;
  `, {
    replacements: {
      userId: userId,
      dataOffset: (page - 1) * limit,
      limit: limit,
      currentTimeLastDay: currentTimeLastDay
    },
    type: QueryTypes.SELECT,
  });

  const total = await Story.count({
    where: {userId: userId}
  });

  res.json({
    data: storyAuthors,
    total: total,
    page: page,
    perPage: limit,
  });
};

export {
  postStory,
  getUserStories,
  getFeedStories,
};