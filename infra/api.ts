import { jwt_secret } from "./auth";
import { db } from "./db";
import { bucket } from "./storage";

// export const api = new sst.aws.ApiGatewayV2("Api", {
//   cors: true,
//   transform: {
//     route: {
//       // handler: {
//         // link: [table],
//       // },
//       args: {
//         auth: { iam: true }
//       },
//     }
//   }
// })

// api.route("GET /hello", "packages/functions/src/api.handler");
export const hono = new sst.cloudflare.Worker("WorkWiseAPI", {
  url: true,
  link: [bucket, db, jwt_secret],
  handler: "packages/backend/index.ts",
});