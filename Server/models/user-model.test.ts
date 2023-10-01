import userModel from "./user-model";

describe("userModel", () => {
    const userID = "11";
    const userNickname = "testUser";

    it("should create a user", async () => {
        const user = await userModel.createUser(
            userID,
            userNickname,
            "testPassword",
            "test@example.com",
        );

        expect(user).toBeDefined();
        expect(user.id).toBe(userID);
        expect(user.nickname).toBe(userNickname);
        expect(user.password).toBe("testPassword");
        expect(user.email).toBe("test@example.com");
    });

    it("should update user role", async () => {
        const updatedUser = await userModel.updateRole("admin", userID);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.role).toBe("admin");
    });

    it("should search user by email", async () => {
        const user = await userModel.searchUserByEmail("test@example.com");

        expect(user).toBeDefined();
        expect(user?.id).toBe(userID);
        expect(user?.email).toBe("test@example.com");
    });

    it("should search user by nickname", async () => {
        const user = await userModel.searchUserByNickname(userNickname);

        expect(user).toBeDefined();
        expect(user?.id).toBe(userID);
        expect(user?.nickname).toBe(userNickname);
    });

    it("should delete a user", async () => {
        const deletedUser = await userModel.deleteUserByID(userID);

        expect(deletedUser).toBeDefined();
        expect(deletedUser.nickname).toBe(userNickname);
        expect(deletedUser.id).toBe(userID);
    });
});