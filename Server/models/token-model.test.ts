import tokenModel from './token-model'
import userModel from './user-model'

const user_id = "2";
const token = "test_token";
const token_2 = 'test_token_2'
let token_id = ''
let token_id_2 = ''

describe("tokenModel", () => {
    afterAll(async () => {
        const deleteTestUser = await userModel.deleteUserByID(user_id);

        expect(deleteTestUser).toBeDefined();

        if (deleteTestUser) {
            expect(deleteTestUser.deleteUser.id).toBe(user_id);
            expect(deleteTestUser.deleteUser.nickname).toBe("testUser2");
        }
    });

    beforeAll(async () => {
        const user = await userModel.createUser(
            user_id,
            "testUser2",
            "testPassword2",
            "test2@example.com",
            );
        
        expect(user).toBeDefined()

        if (user) {
            expect(user.id).toBe(user_id)
        }
    })

    it("should create a token", async () => {
        const createdToken = await tokenModel.createToken(user_id, token);

        expect(createdToken).toBeDefined();

        if (createdToken) {
            token_id = createdToken.id
            expect(createdToken.user_id).toBe(user_id);
            expect(createdToken.token).toBe(token);
        }
    });

    it("should delete a token", async () => {
        const deleteToken = await tokenModel.deleteToken(
            user_id,
            token_id,
        );

        expect(deleteToken).toBeTruthy();
    });

    it("should search token by user id", async () => {
        await tokenModel.createToken(user_id, token);
        await tokenModel.createToken(user_id, token_2);

        const tokens = await tokenModel.searchTokensByUserID(user_id);

        expect(tokens).toHaveLength(2);

        if (tokens) {
            token_id_2 = tokens[0].id
            expect(tokens[0].user_id).toBe(user_id);
            expect(tokens[1].user_id).toBe(user_id);
        }
    });

    it('should search a token by user_id', async () => {
        const foundToken = await tokenModel.searchTokenByUserID(user_id);

        expect(foundToken).toBeTruthy();

        if (foundToken) {
            expect(foundToken[0].user_id).toBe(user_id);
        }
    })

    it('should search a token by ID', async () => {
        const foundToken = await tokenModel.searchTokenByID(token_id_2);

        expect(foundToken).toBeTruthy();

        if (foundToken) {
            expect(foundToken[0].id).toBe(token_id_2);
        }
    })
});
