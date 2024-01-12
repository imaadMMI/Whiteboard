import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "../config/webpack.dev.js";

const ServerConfig = {
    hot: true,
    proxy: {
        "/api": "http://localhost:3000",
        "/uploads": "http://localhost:3000",
        "/ws-api": {
            target: "ws://localhost:3000",
            ws: true,
        },
    },
};

export default function then(port, resolve) {
    new WebpackDevServer(webpack(config), ServerConfig).start(port, (err) => {
        if (err) {
            console.log(err);
        }

        console.log("Listening on port " + port);
    });
    resolve(1);
}
