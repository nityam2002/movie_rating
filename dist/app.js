"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
async function init() {
    const server = new server_1.ApolloServer({
        typeDefs: `
    type Query{
      hello: String
      hey(name:String): String
    }
    `,
        resolvers: {
            Query: {
                hello: () => `Hey there this is a graphql server`,
                hey: (_, { name }) => `Hey there ${name}`
            }
        },
    });
    await server.start();
    app.use(express_1.default.json(), (0, cors_1.default)());
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
    // Routes
    app.use('/users', userRoutes_1.default);
    app.use('/content', contentRoutes_1.default);
    // Error handling middleware
    app.use(errorMiddleware_1.default);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
init();
//# sourceMappingURL=app.js.map