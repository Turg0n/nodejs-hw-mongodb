export const checkUserId = (req, res, next) => {
  const userId= req.user._id;
  if (req.params.userId === userId) {
      next()
  } else {
      res.status(403).json({ success: false, message: 'Access is denied'});
  }
}

export default checkUserId