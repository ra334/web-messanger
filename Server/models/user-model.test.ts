import userModel from "./user-model";
import fs from 'fs';

describe("userModel", () => {
    const userID = "11";
    const userNickname = "testUser";
    const currentDate = new Date();
    const IMGpath = 'assets/test.png';
    const IMGbuffer = fs.readFileSync(IMGpath);

    describe("User Creation", () => {
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
    });

    describe("User Updates", () => {
        it("should update user role", async () => {
            const updatedUser = await userModel.updateRole("admin", userID);

            expect(updatedUser).toBeDefined();
            expect(updatedUser.role).toBe("admin");
        });

        it("should update last login", async () => {
            const updatedUser = await userModel.updateLastLogin(currentDate, userID);

            expect(updatedUser.id).toBe(userID);
            expect(updatedUser.last_login).toEqual(currentDate);
        });

        it("should update user status", async () => {
            const updatedUser = await userModel.updateStatus('Offline', userID);

            expect(updatedUser.id).toBe(userID);
            expect(updatedUser.account_status).toBe('Offline');
        });

        it("should update profile picture", async () => {
            const updatedUser = await userModel.updateProfilePicture(IMGpath, userID);

            expect(updatedUser.id).toBe(userID);
            expect(updatedUser.profile_picture).toEqual(IMGbuffer);
        });
    });

    describe("User Search and Deletion", () => {
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
});