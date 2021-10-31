const app = require("./app.js");
const connectDatabase = require("./Config/database.js");
const cloudinary = require('cloudinary')
require("dotenv").config({ path: "Server/Config/config.env" })

/**
 * *Database Connection
 */
connectDatabase()

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  app_secret: process.env.CLOUDINARY_APP_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT)
});

/**
 * !uncaught error
 */
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`shutting down the server due to uncaught error......`)
  server.close(() => {
    process.exit(1)
  })
})

/**
 * !unhandled promise rejection error
 */
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log("shutting down the server due to unhandled promise Rejection.............")
  server.close(() => {
    process.exit(1)
  })
})