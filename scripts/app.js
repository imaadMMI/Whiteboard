import { getArgument } from "./utils.js";
import startServer from "./server-connection.js";

const ENV_MODES = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
};

const commandLineArgs = getArgument();

if (
  !commandLineArgs.mode ||
  ![ENV_MODES.PRODUCTION, ENV_MODES.DEVELOPMENT].includes(commandLineArgs.mode)
) {
  throw new Error("--mode can only be 'development' or 'production'");
}

const environmentMode = commandLineArgs.mode;
const isProductionMode = environmentMode === ENV_MODES.PRODUCTION;

if (isProductionMode) {
  console.info("\nStarting server in production mode.");
  startServer(process.env.PORT || 8080);
} else {
  console.info("\nStarting server in development mode.");
  startServer(3000);
}
