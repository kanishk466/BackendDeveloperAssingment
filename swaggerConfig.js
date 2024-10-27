import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API for managing users, tasks, and roles",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your Server
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email" },
            role: { type: "string", example: "admin" },
          },
        },
        Task: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            dueDate: { type: "string", format: "date" },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            status: {
              type: "string",
              enum: ["pending", "in-progress", "completed"],
            },
            assignedTo: {
              type: "string",
              description: "User ID of the assignee",
            },
          },
        },
      },
      Developed:{
        type: "object",
        properties:{
          name:"Kanishk Singh Maurya",
          email:"kanishkas466@gmail.com",
          linkedIn:"https://www.linkedin.com/in/kanishk007/"
        }
      }
    },
  },
  apis: [
    "./src/routes/authRoutes.js",
    "./src/routes/taskRoutes.js",
    "./src/routes/userRoutes.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
