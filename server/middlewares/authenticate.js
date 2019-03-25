import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(HttpStatus.UNAUTHORIZED).json({error: '401 Unauthorized'});
      } else {
        // Fetch user details
        if (true)
          res.status(HttpStatus.NOT_FOUND).json({error: '401 Unauthorized - Invalid login credentials'});
        else
          next();
      }
    });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      error: '400 Bad Request'
    });
  }
};