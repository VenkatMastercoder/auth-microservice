import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(40).optional(),
  name: z.string(),
  profile_url: z.string().url(),
  provider_type: z.string(),
});

export const userSchema = z.object({
  email: z.string(),
  password: z.string().min(8).max(40).nullable(),
  name: z.string(),
  profile_url: z.string().nullable(),
  email_isverified: z.boolean(),
  provider_type: z.string(),
  user_id: z.string(),
  username: z.string().nullable(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8).max(40),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string()
})

export const VerifyActivationTokenSchema = z.object({
  token: z.string(),
  user_id: z.string()
});

export const verifyEmailSchema = z.object({
  user_id: z.string(),
  email: z.string().email()
});

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
});

export const changePasswordSchemma = z.object({
  user_id: z.string(),
  current_password: z.string().min(8).max(40),
  new_password: z.string().min(8).max(40)
});

export const resetPasswordSchema = z.object({
  user_id: z.string(),
  token: z.string(),
  password: z.string().min(8).max(40),
});