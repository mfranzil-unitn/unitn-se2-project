class HTTPError extends Error {
    constructor(status, message) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.message = message;
    }
}

module.export = {
    HTTPError
};

