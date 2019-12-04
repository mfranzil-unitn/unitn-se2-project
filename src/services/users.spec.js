test('supplying an invalid object should throw an error', async () => {
    const UserService = require('@app/services/users');

    const userObject = {
        user_id: undefined
    }

    await expect(UserService.create(userObject)).rejects.toThrow('Please supply a valid User object');
    await expect(UserService.authenticate(userObject)).rejects.toThrow('Please supply a valid User object');
});

test('supplying undefined should throw an error', async () => {
    const UserService = require('@app/services/users');

    await expect(UserService.create(undefined)).rejects.toThrow('User parameter required');
    await expect(UserService.authenticate(undefined)).rejects.toThrow('User parameter required');
});

test('invalid authentication should throw an error', async () => {
    const UserService = require('@app/services/users');

    await expect(UserService.authenticate({
        user_id: 'non-existant email',
        user_password: 'nonsense password'
    })).rejects.toThrow('Wrong username or password');
});

test('find with no parameters should throw an error', async () => {
    const UserService = require('@app/services/users');

    await expect(UserService.find()).rejects.toThrow('Please supply an array');
    await expect(UserService.find(undefined)).rejects.toThrow('Please supply an array');
});

test('find with an empty array should return an empty array', async () => {
    const UserService = require('@app/services/users');

    let res = await UserService.find([]);
    expect(Array.isArray(res)).toBe(true);
});

test('find with a single query should throw an error', async () => {
    const UserService = require('@app/services/users');

    await expect(UserService.find('non-existant email')).rejects.toThrow('Cannot find User');
});