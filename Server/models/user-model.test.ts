import userModel from './user-model'
const fs = require("fs");

const userID = '11'
const userNickname = 'testUser'

describe("userModel", () => {
    
    it("should create a user", async () => {
        const user = await userModel.createUser(
            userID,
            userNickname,
            "testPassword",
            "test@example.com",
        );

        if (user) {
            expect(user.id).toBe(userID);
            expect(user.nickname).toBe(userNickname);
            expect(user.password).toBe("testPassword");
            expect(user.email).toBe("test@example.com");
        }
    });

    it("should update user role", async () => {
        const updateUserRole = await userModel.updateRole("admin", userID);

        expect(updateUserRole).toBeDefined();

        if (updateUserRole) {
            expect(updateUserRole.role).toBe("admin");
        }
    });

    it("should search user by email", async () => {
        const user = await userModel.searchUserByEmail("test@example.com");

        expect(user).toBeDefined();

        if (user) {
            expect(user.id).toBe(userID);
            expect(user.email).toBe("test@example.com");
        }
    });

    it("should search user by nickname", async () => {
        const user = await userModel.searchUserByNickname(userNickname);

        expect(user).toBeDefined();

        if (user) {
            expect(user.id).toBe(userID);
            expect(user.nickname).toBe(userNickname);
        }
    });

    it('should delete an user', async () => {
        const user = await userModel.deleteUserByID(userID)

        expect(user.nickname).toBe(userNickname)
        expect(user.id).toBe(userID)
    })
});