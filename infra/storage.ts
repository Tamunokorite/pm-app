// export const bucket = new sst.aws.Bucket("Uploads", {
//   cors: true,
// });

// export const usersTable = new sst.aws.Dynamo("Users", {
//   fields: {
//     id: "string",
//     name: "string",
//     image: "string",
//   },
//   primaryIndex: { hash: "id" },
// });

// export const organizationsTable = new sst.aws.Dynamo("Organizations", {
//   fields: {
//     id: "string",
//     name: "string",
//     image: "string",
//   },
//   primaryIndex: { hash: "id" },
// });

// export const projectsTable = new sst.aws.Dynamo("Projects", {
//   fields: {
//     id: "string",
//     name: "string",
//     image: "string",
//   },
//   primaryIndex: { hash: "id" },
// });
export const bucket = new sst.cloudflare.Bucket("WorkWiseUploads");