module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Swagger boilerplate",
      version: "0.0.0",
      description:
        "This is a ",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/todo",
      },
    ],
  },
  apis: ["./routes/todo.js"],
};