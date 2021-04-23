const fireBaseAdmin = require('firebase-admin');
const httpStatusCodes = require('http-status-codes');

const users = require('../../resources/user/user.entity');

const authorize = async (req, res, next) => {
  const tokenParam = _getTokenFromHeader(req);

  if (tokenParam) {
    const authorizedUser = tokenParam.scheme == 'bearer'
      ? await _authorizeUser(tokenParam.token)
      : await _authorizeFakeUser(tokenParam.token);
    if (authorizedUser) {
      req.user = authorizedUser;
      if (req.body) {
        req.body.userId = authorizedUser.uid;
      }
      next();
      return;
    }
  }

  return res.status(httpStatusCodes.UNAUTHORIZED).json({
    error: 'Token missing',
  });
};

_authorizeFakeUser = async (token) => {
  let applicationUser = await users.findOne({ uid: token });
  if (!applicationUser) {
    applicationUser = await users.create({
      uid: token,
      email: token,
    });
  }
  return applicationUser;
}

_authorizeUser = async (token) => {
  try {
    const fireBaseUser = await fireBaseAdmin.auth().verifyIdToken(token);

    let applicationUser = await users.findOne({ uid: fireBaseUser.sub });

    if (!applicationUser) {
      applicationUser = await users.create({
        uid: fireBaseUser.sub,
        email: fireBaseUser.email,
      });
    }

    applicationUser.isEmailVerified = fireBaseUser.email_verified;

    return applicationUser;
  } catch (err) {
    return null;
  }
}

_getTokenFromHeader = (req) => {
  if (!req.headers.authorization) { return null; }
  const authorization = req.headers.authorization.split(' ')[0];
  if (!authorization) { return null; }
  switch (authorization) {
    case 'fake':
      return {
        'scheme': 'fake',
        'token': req.headers.authorization.split(' ')[1]
      }
    case 'bearer':
      return {
        'scheme': 'bearer',
        'token': req.headers.authorization.split(' ')[1]
      }
    default:
      return null;
  }
}


module.exports = authorize;
