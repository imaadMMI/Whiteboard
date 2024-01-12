import { getDefaultConfig, getConfig, deepMergeConfigs, isConfigValid } from "./utils.js";
import { getArgument } from "./../utils.js";

const defaultConfig = getDefaultConfig();

const cliArgs = getArgument();
let userConfig = {};

if (cliArgs["config"]) {
  userConfig = getConfig(cliArgs["config"]);
}

const config = deepMergeConfigs(defaultConfig, userConfig);

function updateConfigFromStartArgs(startArgs) {
  function deprecateCliArg(key, callback) {
    const val = startArgs[key];
    if (val) {
      console.warn(
        "\x1b[33m\x1b[1m",
        `Setting config values (${key}) from the CLI is deprecated. ` +
          "This ability will be removed in the next major version. " +
          "You should use the config file. "
      );
      callback(val);
    }
  }

  deprecateCliArg("accesstoken", (val) => (config.backend.accessToken = val));
  deprecateCliArg(
    "disablesmallestscreen",
    () => (config.backend.showSmallestScreenIndicator = false)
  );
  deprecateCliArg("webdav", () => (config.backend.enableWebdav = true));
}

function updateConfigFromEnv() {
  function deprecateEnv(key, callback) {
    const val = process.env[key];
    if (val) {
      console.warn(
        "\x1b[33m\x1b[1m",
        `Setting config values (${key}) from the environment is deprecated. ` +
          "This ability will be removed in the next major version. " +
          "You should use the config file. "
      );
      callback(val);
    }
  }

  deprecateEnv("accesstoken", (val) => (config.backend.accessToken = val));
  deprecateEnv("disablesmallestscreen", () => (config.backend.showSmallestScreenIndicator = false));
  deprecateEnv("webdav", () => (config.backend.enableWebdav = true));
}

updateConfigFromEnv();
updateConfigFromStartArgs(cliArgs);

if (!isConfigValid(config, true)) {
  throw new Error("Config is not valid. Check logs for details");
}

if (!process.env.JEST_WORKER_ID) {
}

export { config as default };
