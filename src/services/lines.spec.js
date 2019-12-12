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

test('getAll without parameters should throw an error', async () => {
    const LineService = require('@app/services/lines');

    await expect(LineService.getAll()).rejects.toThrow('Please specify limit and offset first as integers');
});

