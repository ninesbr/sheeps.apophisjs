export class ApophisError extends Error {

    private readonly code: string

    constructor(code?: string, message?: string) {
        super(message);
        this.code = code;
        this.name = "ApophisError";
    }

    static Resolve(message?: string): ApophisError {
        const msg = message || "";
        try {
            let parsed = JSON.parse(msg.substring(msg.indexOf("{")));
            return new ApophisError(parsed.code, parsed.message);
        } catch (_) {
            return new ApophisError();
        }
    }
    static Of(err?: any): ApophisError {
        if(err.details && err.details?.startsWith('{')) {
            try {
                let parsed = JSON.parse(err.details);
                return new ApophisError(parsed.code, parsed.message);
            } catch (_) {
                return new ApophisError();
            }
        }
        if (err.code && err.message) {
            return new ApophisError(err.code, err.message);
        }
        return new ApophisError();
    }
}
