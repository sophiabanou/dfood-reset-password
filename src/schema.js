import Joi from "joi";

export const forgotSchema = Joi.object({
  password: Joi.string().min(6).max(128).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be under 128 characters",
  }),
});
