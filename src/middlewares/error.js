import EErros from "../services/errors/enums.js";
import { logger } from "../utils/logger.js";

export default (error, req, res, next) => {
    logger.debug(error.cause)

    switch (error.code) {
        case EErros.INVALID_TYPES_ERROR:
            res
                .status(400)
                .send({ status: "error", error: error.name, cause: error.cause });
            break;

        case EErros.DATABASE_ERROR:
            res
                .status(400)
                .send({ status: "error", error: error.name, cause: error.cause });
            break;


        case EErros.FAIL_LOGIN_AUTH:
            res
                .status(401)
                .send({ status: "error", error: error.name, cause: error.cause });
            break;
        case EErros.FORBIDDEN_ERROR:
            res
                .status(403)
                .send({ status: "error", error: error.name, cause: error.cause });
            break;
        case EErros.PAGE_NOT_FOUND:
            res
                .status(404)
                .send({ status: "error", error: error.name, cause: error.cause });
            break;


        default:
            res
                .status(500)
                .send({ status: "error", error: "Unhandled server error" });
            break;
    }
};