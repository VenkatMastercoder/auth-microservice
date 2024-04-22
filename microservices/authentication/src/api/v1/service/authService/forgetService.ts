import prisma from "../../../../../prisma/client/prismaClient";

export const forget = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        user_id: true,
      },
    });
    return user
  } catch (error) {
    throw new Error(`Error fetching user Details: ${error}`);
  }
}