/**
 * Validate Body, Query and Params of a request
 * @function
 * @name validateData
 * @param {object} schema - Joi Validation Schema
 */
export const validateData = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    res.status(400);
    next(err);
  } else {
    next();
  }
};
