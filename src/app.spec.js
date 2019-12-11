test('app.js should return an instance of the application', async () => {
    const app = await require('@app/app')();
    expect(app).toBeDefined();
    expect(app.get).toBeInstanceOf(Function);
});
