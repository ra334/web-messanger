import hashPass from './hash-password'
const bcrypt = require('bcrypt')

describe("hashPass", () => {
    const password = 'helloWold@'

    it("should hash a password", () => {
        const hashedPassword = hashPass(password)

        expect(typeof password).toBe('string')
        expect(hashPass.length).toBeGreaterThan(0)

        expect(bcrypt.compareSync(password, hashedPassword)).toBe(true)
    })
})