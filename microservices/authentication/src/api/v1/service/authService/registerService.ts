import prisma from "../../../../../prisma/client/prismaClient";

export const googleRegister = async (email: string, profile_url: string, name: string, provider_type: string) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: null,
        profile_url,
        name,
        provider_type,
      },
      select: {
        user_id: true
      }
    });
    return newUser
  } catch (error) {
    throw new Error(`Error Create user: ${error}`);
  }
}

export const normalRegister = async (email: string, hashedPassword: string, profile_url: string, name: string, provider_type: string) => {
  try {
    const newUser = prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile_url,
        provider_type,
      }
    });
    return newUser
  } catch (error) {
    throw new Error(`Error Create user: ${error}`);
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
      }
    });

    return user
  } catch (error) {
    throw new Error(`Error fetching user Details: ${error}`);
  }
}