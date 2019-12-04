test('placing an invalid object should throw an error', async () => {
    const LineService = require('@app/services/lines');

    const lineObject = {
        line_user_id: undefined
    }

    await expect(LineService.place(lineObject)).rejects.toThrow('Please supply a valid Line object');
});

test('placing undefined should throw an error', async () => {
    const LineService = require('@app/services/lines');

    await expect(LineService.place(undefined)).rejects.toThrow('Line parameter required');
});

test('getAll should return an array of objects', async () => {
    const LineService = require('@app/services/lines');

    let res = await LineService.getAll();
    expect(Array.isArray(res)).toBe(true);
});

