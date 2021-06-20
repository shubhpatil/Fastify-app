const fastify = require("fastify")();
const path = require("path");

// COMPRESSION
fastify.register(require("fastify-compress"), { global: false });

// CORS
fastify.register(require("fastify-cors"));

// JWT
fastify.register(require("fastify-jwt"), {
  secret: "MySuperSecretKey",
});

// SWAGGER
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "fastify-api",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },
  definitions: {
    User: {
      type: "object",
      required: ["id", "email"],
      properties: {
        id: { type: "string", format: "uuid" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string", format: "email" },
      },
    },
  },
});

// STATIC FILES
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

// ROUTES
fastify.register(require("./routes/items"));

// PORT
const PORT = process.env.PORT || 5000;

// SERVER
const server = async () => {
  try {
    await fastify.listen(PORT, () =>
      console.log(`SERVER : http://127.0.0.1:${PORT}`)
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

server();
