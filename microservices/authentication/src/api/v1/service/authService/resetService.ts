import prisma from "../../../../../prisma/client/prismaClient";

export const reset = async (user_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id },
      select: {
        user_id: true,
        password: true,
        email: true,
      }
    });
    return user
  } catch (error) {
    throw new Error(`Error fetching user Details: ${error}`);
  }
}

export const updatedPassword = async (user_id: string, hashedPassword: string) => {
  try {
    const updateData = prisma.user.update({
      where: { user_id },
      data: {
        password: hashedPassword
      }
    })
    return updateData
  } catch (error) {
    throw new Error(`Error Updating user: ${error}`);
  }
}