const roleMiddleware = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    console.log(req.user);
    
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export default roleMiddleware;
