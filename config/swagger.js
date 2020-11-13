const host = process.env.HOST;

module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Swagger boilerplate",
      version: "1.2.3",
      description:
        "This is a boilerplate to document openapi interfaces. Please refrain to the MD file in the ",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      termsOfService: `${host}/terms`,
      contact: {
        name: "API Admin",
        url: `${host}`,
        email: "info@openapi.com",
      },
    },
    host: `${host}`,
    servers: [
      {
        url: `${host}`,
      }
    ],
  },
  apis: ["./routes/todo.js", "./routes/user.js"],
};