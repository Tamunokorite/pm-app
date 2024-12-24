/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "project-management-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
      providers: { aws: true },
    };
  },
  async run() {
    await import("./infra/storage");
    await import("./infra/db");
    await import("./infra/web");
    const apiConfig = await import("./infra/api");
    // const auth = await import("./infra/auth");
    return {
      api: apiConfig.hono.url,
      // UserPool: auth.userPool.id,
      // Region: aws.getRegionOutput().name,
      // IdentityPool: auth.identityPool.id,
      // UserPoolClient: auth.userPoolClient.id,
    };
  },
});
