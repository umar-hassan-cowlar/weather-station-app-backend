const Joi = require("joi");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      return res.status(400).json({ message: "Failed", error: message });
    }
    next();
  };
};

module.exports = validationMiddleware;
