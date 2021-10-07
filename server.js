const dotenv = require("dotenv");
const app = require("./app");
const http = require('http').Server(app);

dotenv.config();



const port = process.env.PORT || 4000;
const server = http.listen(port, () => {
    console.log(`\x1b[35mApp running on port ${port} \x1b[0m`);
});


process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("💥 Process terminated!");
    });
});
