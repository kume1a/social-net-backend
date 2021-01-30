import Comment from '../models/comment.js';
import Reply from '../models/reply.js';
import User from '../models/user.js';
import CommentCount from '../models/commentCount.js';
import pkg from 'sequelize';
import sequelize from '../models/db.js';

const {QueryTypes} = pkg;

const postComment = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.body.postId;
    const body = req.body.body;

    const now = new Date().getTime();

    const newComment = await Comment.create({
        body: body,
        postId: postId,
        userId: userId,
        createdAt: now,
    });
    await CommentCount.increment('count', {
        where: {postId: postId}
    });

    const user = await User.findByPk(userId);
    const comment = {
        ...newComment.toJSON(),
        userName: user.name,
        userImageUrl: user.imageUrl,
    };
    console.log(comment);

    res.json(comment);
};

const postReply = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const body = req.body.body;

    const now = new Date().getTime();

    const newReply = await Reply.create({
        postId: postId,
        body: body,
        createdAt: now,
        commentId: commentId,
        userId: userId,
    });
    await CommentCount.increment('count', {
        where: {postId: postId}
    });

    const user = await User.findByPk(userId);
    const reply = {
        ...newReply.toJSON(),
        userName: user.name,
        userImageUrl: user.imageUrl,
    };

    res.json(reply);
};

const getComments = async (req, res, next) => {
    const postId = req.params.postId;
    const page = Number.parseInt(req.query.page);
    const limit = Number.parseInt(req.query.limit);

    const comments = await sequelize.query(`
        SELECT comments.*,
               users.name     AS userName,
               users.imageUrl AS userImageUrl
        FROM comments
                 INNER JOIN users ON users.id = comments.userId
        WHERE comments.postId = :postId
        ORDER BY createdAt
        LIMIT :dataOffset, :limit;
    `, {
        type: QueryTypes.SELECT,
        replacements: {
            postId: postId,
            dataOffset: (page - 1) * limit,
            limit: limit,
        }
    });
    const total = await Comment.count({
        where: {postId: postId},
    });

    res.json({
        data: comments ?? [],
        total: total,
        page: page,
        perPage: limit,
    });
};

const getReplies = async (req, res, next) => {
    // const postId = req.params.postId;
    const commentId = req.params.commentId;
    const page = Number.parseInt(req.query.page);
    const limit = Number.parseInt(req.query.limit);

    const replies = await sequelize.query(`
        SELECT
            replies.*,  
            users.name AS userName,
            users.imageUrl AS userImageUrl
        FROM replies 
        INNER JOIN users ON users.id = replies.userId
        WHERE replies.commentId = :commentId
        ORDER BY createdAt
        LIMIT :dataOffset, :limit;
    `, {
        type: QueryTypes.SELECT,
        replacements: {
            commentId: commentId,
            dataOffset: (page - 1) * limit,
            limit: limit
        }
    });
    const total = await Reply.count({
        commentId: commentId,
    });

    res.json({
        data: replies ?? [],
        total: total,
        page: page,
        perPage: limit,
    });
};

export {
    postComment,
    postReply,
    getComments,
    getReplies,
};