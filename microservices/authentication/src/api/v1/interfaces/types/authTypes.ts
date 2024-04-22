import { z } from "zod";
import { VerifyActivationTokenSchema, changePasswordSchemma, forgetPasswordSchema, loginSchema, refreshTokenSchema, registerSchema, resetPasswordSchema, userSchema, verifyEmailSchema } from "../../validations/authZod";

export type IUser = z.infer<typeof userSchema>

export type IRegister = z.infer<typeof registerSchema>

export type ILogin = z.infer<typeof loginSchema>

export type IRefresh = z.infer<typeof refreshTokenSchema>

export type IVerifyActivationToken = z.infer<typeof VerifyActivationTokenSchema>

export type IVerifyEmail = z.infer<typeof verifyEmailSchema>

export type IForget = z.infer<typeof forgetPasswordSchema>

export type IChangePassword = z.infer<typeof changePasswordSchemma>

export type IReset = z.infer<typeof resetPasswordSchema>