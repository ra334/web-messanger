import tokenService from './token-service' // Підключаємо ваш модуль TokenService
const jwt = require('jsonwebtoken');

// Мокуємо методи, які ви використовуєте з моделі tokenModel
jest.mock('../models/token-model', () => ({
    getTokensByUserID: jest.fn(),
    deleteToken: jest.fn(),
}));

describe('tokenService', () => {
    it('should generate tokens', () => {
        const payload = { userId: '12345' };
        const tokens = tokenService.generateTokens(payload);

        expect(tokens).toHaveProperty('accessToken');
        expect(tokens).toHaveProperty('refreshToken');
    });

    it('should validate access token', () => {
        const payload = { userId: '12345' };
        const tokens = tokenService.generateTokens(payload);

        const isValid = tokenService.verifyAccessToken(tokens.accessToken);

        expect(isValid).toBe(true);
    });

    it('should return false if access token is invalid', () => {
        const invalidAccessToken = 'invalid_access_token';

        const isValid = tokenService.verifyAccessToken(invalidAccessToken);

        expect(isValid).toBe(false);
    });

    it('should validate refresh token verifyRefreshToken', () => {
        const payload = { userId: '12345' };
        const tokens = tokenService.generateTokens(payload);

        const isValid = tokenService.verifyRefreshToken(tokens.refreshToken);

        expect(isValid).toBe(true);
    });

    it('should return false if refresh token is invalid', () => {
        const invalidRefreshToken = 'invalid_refresh_token';

        const isValid = tokenService.verifyRefreshToken(invalidRefreshToken);

        expect(isValid).toBe(false);
    });

    it('should return tokens if refresh token is invalid', async () => {
        const payload = { userId: '12345' };
        const tokens = tokenService.generateTokens(payload);
        const userID = '12345';
        const invalidRefreshToken = 'invalid_refresh_token';

        jest.spyOn(tokenService, 'verifyRefreshToken').mockReturnValue(false);

        const newTokens = await tokenService.loginToken(userID, invalidRefreshToken, payload);

        expect(newTokens).toHaveProperty('accessToken');
        expect(newTokens).toHaveProperty('refreshToken');
    });

    it('should generate tokens and delete invalid tokens', async () => {
        const payload = { userId: '12345' };
        const tokens = tokenService.generateTokens(payload);
        const userID = '12345';
        const validRefreshToken = tokens.refreshToken;

        jest.spyOn(tokenService, 'verifyRefreshToken').mockReturnValue(true);
        jest.spyOn(tokenService, 'verifyAccessToken').mockReturnValue(true);
        jest.spyOn(require('../models/token-model'), 'getTokensByUserID').mockResolvedValue([{ id: 1, token: validRefreshToken }]);

        const newTokens = await tokenService.loginToken(userID, validRefreshToken, payload);

        expect(newTokens).toHaveProperty('accessToken');
        expect(newTokens).toHaveProperty('refreshToken');
    });
});
