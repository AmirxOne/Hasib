import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { match } from "node:assert";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("a user connected");

        // Send a test message to the client immediately after connection
        socket.emit("message", "Hello World from server!");

        // You could also set up an interval to send messages periodically
        setInterval(() => {
            socket.emit("message", "mammad is here!");
        }, 1000);

        setTimeout(() => {
            socket.disconnect()
        }, 10000);
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});