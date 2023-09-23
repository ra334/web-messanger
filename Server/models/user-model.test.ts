import userModel from './user-model'
const fs = require("fs");

describe("userModel", () => {
    afterAll(async () => {
        const deleteTestUser = await userModel.deleteUserByID("1");

        expect(deleteTestUser).toBeDefined();

        if(deleteTestUser) {
            expect(deleteTestUser.deleteUser.id).toBe("1");
            expect(deleteTestUser.deleteUser.nickname).toBe("testUser");
        }
    });

    it("should create a user", async () => {
        const user = await userModel.createUser(
            "1",
            "testUser",
            "testPassword",
            "test@example.com",
        );

        expect(user).toBeDefined();
        if (user) {
            expect(user.id).toBe("1");
            expect(user.nickname).toBe("testUser");
            expect(user.password).toBe("testPassword");
            expect(user.email).toBe("test@example.com");
        }
    });

    it("should update user role", async () => {
        const updateUserRole = await userModel.updateRole("admin", "1");

        expect(updateUserRole).toBeDefined();

        if (updateUserRole) {
            expect(updateUserRole.role).toBe("admin");
        }
    });

    it("should search user by email", async () => {
        const user = await userModel.searchUserByEmail("test@example.com");

        expect(user).toBeDefined();

        if (user) {
            expect(user.id).toBe("1");
            expect(user.email).toBe("test@example.com");
        }
    });

    it("should search user by nickname", async () => {
        const user = await userModel.searchUserByNickname("testUser");

        expect(user).toBeDefined();

        if (user) {
            expect(user.id).toBe("1");
            expect(user.nickname).toBe("testUser");
        }
    });
});