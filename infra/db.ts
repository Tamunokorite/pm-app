export const db = new sst.cloudflare.D1("WorkWise");

export const dbData = new sst.Linkable("DBData", {
	properties: {
		accountID: db.nodes.database.accountId,
		id: db.id,
	},
});

new sst.x.DevCommand("Studio", {
  link: [db, dbData],
  dev: {
    command: "bunx drizzle-kit studio",
  },
});