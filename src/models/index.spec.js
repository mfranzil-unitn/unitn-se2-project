test('db must return a valid item with an existant connection', async () => {
    const db = require('@app/models');

    expect(db).toBeDefined();
    expect(db.executeQuery).toBeInstanceOf(Function);
});

test('invalid query must return an error', async () => {
    const db = require('@app/models');

    try {
        await db.executeQuery('SELECT * FROM nonexistantable');
    } catch (error) {
        expect(error).toMatch('error');
    }
});

test('database must be closed properly', async () => {
    const db = require('@app/models');

    let res = await db.close();
    expect(res).toBe(true);
});

