import jwt from 'jsonwebtoken';
import secret from './secret.js';

const authCheck = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    console.log(`auth_check: token = ${token}`);
    const decodedToken = jwt.verify(token, secret);

    console.log(decodedToken);
    if (!decodedToken) {
      next({statusCode: 401, error: new Error('unauthorized')});
    }
    res.userId = decodedToken.userId;
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      next({statusCode: 401, error: new Error('token expired')});
    } else if (e instanceof jwt.JsonWebTokenError) {
      next({statusCode: 401, error: new Error('unauthorized')});
    } else {
      next({statusCode: 500, error: new Error('unknown error')});
    }
  }
}
export default authCheck;