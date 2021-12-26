exports.requireLogin = (req, res, next) => {
  console.log("Saved Data \n", req.session);

  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(200).send(false);
  }
};
