const { expect } = require('chai')
const {validatePhoneNumber, validateEmail} = require('../models/user.js')

describe("Tests for: validatephonenumber function", () => {
    it("should return true for valid phone number"), () => {
        const validPhoneNumber = "1234567890"
        const result = validatePhoneNumber(validPhoneNumber)
        expect(result).to.be.true
    }

    it("should return false if phone number does not have 10 characters"), () => {
        const invalidPhoneNumber = "123456789"
        const result = validatePhoneNumber(invalidPhoneNumber)
        expect(result).to.be.true
    }

    it("shoud return false if phone number has letters in it as well as numbers"), () => {
        const invalidPhoneNumber = "123eba789"
        const result = validatePhoneNumber(invalidPhoneNumber)
        expect(result).to.be.false
    }
})

it("should return true if email is valid", () => {
    const validEmail = "test@email.com"
    const result = validateEmail(validEmail)
    expect(result).to.be.true
})