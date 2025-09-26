import { mutation } from "./_generated/server";

/**
 * Wipes user-facing data to reset the project.
 * Currently deletes all documents from the `users` table.
 * Extend with additional tables as needed.
 */
export const wipeAll = mutation({
  args: {},
  handler: async (ctx) => {
    for await (const doc of ctx.db.query("users")) {
      await ctx.db.delete(doc._id);
    }
    return { ok: true };
  },
});
