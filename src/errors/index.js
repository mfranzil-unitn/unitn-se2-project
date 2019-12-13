class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = parseInt(code);
      }
}

Object.defineProperty(HTTPError.prototype, 'name', {
    enumerable: false,
    configurable: true,
    value: 'HTTPError',
    writable: true,
});

module.exports = {
    HTTPError
}

