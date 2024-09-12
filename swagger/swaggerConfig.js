const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Youtube Clone",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT Bearer token in this format: Bearer {token}',
                },
            },
        },
        servers: [
            {
                url: "https://youtubeplatformapi-production.up.railway.app"
                // url: "http://localhost:3000/"
            }
        ],
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
