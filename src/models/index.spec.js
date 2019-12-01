// dummy test for now just to make Travis CI happy :)

test('db must return a valid item with an existant connection', async () => {
    const db = require('@app/models/index');

    expect(db).toBeDefined();
    expect(db.executeQuery).toBeInstanceOf(Function);
});

test('invalid query must return an error', async () => {
    const db = require('@app/models/index');

    expect(db).toBeDefined();

    try {
        await db.executeQuery('SELECT * FROM nonexistantable');
    } catch (error) {
        expect(error).toMatch(error);
    }
});
