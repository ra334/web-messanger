const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserModel {
  async createUser(data: any) {
    return prisma.user.create({ data });
  }

  async updateUser(id: any, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: any) {
    return prisma.user.delete({ where: { id } });
  }

  async getUserByEmail(email: any) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export default UserModel
