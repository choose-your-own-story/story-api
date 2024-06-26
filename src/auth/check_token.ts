import express, {NextFunction} from 'express';

import jwt from 'jsonwebtoken';


function checkToken(req: express.Request, res: express.Response, next: NextFunction): any {

  console.log('validando con secret');
  const secret = 'fake-secret';
  console.log(secret);

  if (req.originalUrl.startsWith('/api/payment/seller/add')) {
    next();
    return;
  }

  // Express headers are auto converted to lowercase
  console.log(req.headers);
  console.log(req.headers.authorization);

  let token: string | undefined = req.headers.authorization;

  console.log(token);

  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied',
    });

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    }

    req.decoded = decoded;
    next();
  });
}

export default checkToken;
