import prisma from "../../../../../prisma/client/prismaClient";

export const login = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return user
  } catch (error) {
    throw new Error(`Error fetching user Details: ${error}`);
  }
}