// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }
  let status = err.status || 500;

  if(err.message === 'jwt must be provided'){
    status = 401;
  }

  if(err.message.includes('duplicate key')) {
    err.message = 'Duplicate entry detected, action reverted.';
    status = 409;
  }
  res.status(status);

  res.send({
    status,
    message: err.message
  });
};
