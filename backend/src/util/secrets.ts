import logger from "./logger";

export const ENVIRONMENT = process.env.NODE_ENV;

logger.debug(ENVIRONMENT);

export const MONGODB_URI = process.env["MONGODB_URI"];

logger.debug(MONGODB_URI);

if (!MONGODB_URI) {

    logger.error("No mongo connection string. Set MONGODB_URI environment variable.");

    process.exit(1);
}
