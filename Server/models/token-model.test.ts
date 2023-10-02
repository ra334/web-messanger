import tokenModel from './token-model';
import userModel from './user-model';

describe('Token Model Tests', () => {
  let token_1ID: string = '';
  let token_2ID: string = '';
  let token_3ID: string = '';

  beforeAll(async () => {
    await userModel.createUser('1', 'test', 'test', 'test@test.com');
  });

  afterAll(async () => {
    await userModel.deleteUserByID('1');
  });

  const createTokens = async () => {
    const token1 = await tokenModel.createToken('1', 'token1');
    const token2 = await tokenModel.createToken('1', 'token2');
    const token3 = await tokenModel.createToken('1', 'token3');
    return [token1, token2, token3];
  };

  const verifyToken = (token: any, expectedToken: string, userID: string) => {
    expect(token?.user_id).toBe(userID);
    expect(token?.token).toBe(expectedToken);
  };

  describe('Token Creation', () => {
    it('should create tokens', async () => {
      const tokens = await createTokens();
      tokens.forEach((token: any, index) => {
        verifyToken(token, `token${index + 1}`, '1');
      });
    });
  });

  describe('Token Retrieval', () => {
    it('should search tokens by user id', async () => {
      const token = await tokenModel.getTokensByUserID('1');

      expect(token).toHaveLength(3);

      if (token) {
        expect(token[0].user_id).toBe('1');
        expect(token[0].token).toBe('token1');
        token_1ID = token[0].id;
        token_2ID = token[1].id;
        token_3ID = token[2].id;
      }
    });

    it('should get token by id', async () => {
      const token = await tokenModel.getTokenByID(token_1ID);

      expect(token?.id).toBe(token_1ID);
      expect(token?.token).toBe('token1');
    });
  });

  describe('Token Deletion', () => {
    it('should delete a token by id', async () => {
      const token = await tokenModel.deleteToken(token_3ID);

      expect(token?.id).toBe(token_3ID);
      expect(token?.token).toBe('token3');
    });

    it('should delete tokens by user id', async () => {
      const tokens = await tokenModel.deleteTokens('1');

      expect(tokens?.count).toBe(2);
    });
  });
});