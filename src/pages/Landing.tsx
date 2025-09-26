// TODO: REPLACE THIS LANDING PAGE WITH AN ELEGANT, THEMATIC, AND WELL-DESIGNED LANDING PAGE RELEVANT TO THE PROJECT
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ScriptLoader } from "@/components/ScriptLoader";

export default function Landing() {
  const wipeAll = useMutation((api as any).maintenance.wipeAll);
  const [wiping, setWiping] = useState(false);
  const handleWipe = async () => {
    setWiping(true);
    try {
      await wipeAll({});
      toast("Database reset complete");
    } catch (e) {
      console.error("Failed to reset database", e);
      toast("Failed to reset database");
    } finally {
      setWiping(false);
    }
  };

  // Build correct URLs for scripts located in src/js using Vite's URL resolution.
  // This preserves original script execution order and behavior.
  const scripts = [
    new URL("../js/main.js", import.meta.url).href,
    new URL("../js/items.js", import.meta.url).href,
    new URL("../js/business.js", import.meta.url).href,
    new URL("../js/carAds.js", import.meta.url).href,
    new URL("../js/clothing.js", import.meta.url).href,
    new URL("../js/datingAds.js", import.meta.url).href,
    new URL("../js/houseAds.js", import.meta.url).href,
    new URL("../js/mixed.js", import.meta.url).href,
    new URL("../js/workAds.js", import.meta.url).href,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center"
      role="main"
      aria-labelledby="landing-heading"
    >
      {/* Load your original JS files from /js without changing their logic.
         Update this list with the exact filenames in your repo if different. */}
      <ScriptLoader scripts={scripts} />

      <div className="text-center" role="region" aria-label="Landing content">
        {/* Dedicated mount point for your ad scripts */}
        <div id="ad-root" className="mb-4" aria-label="Advertisement container" />

        <img
          src="./logo.svg"
          alt="Placeholder Project logo"
          width={64}
          height={64}
          className="mx-auto mb-6"
        />
        <h1 id="landing-heading" className="text-2xl font-semibold">Blank Project</h1>
        <p className="text-muted-foreground mt-2">
          Your project is ready. Start building.
        </p>

        {/* Dev-only dangerous action */}
        {import.meta.env.DEV && (
          <div className="mt-6" role="group" aria-labelledby="dev-actions-heading">
            <span id="dev-actions-heading" className="sr-only">Developer actions</span>
            <Button
              variant="destructive"
              onClick={handleWipe}
              disabled={wiping}
              aria-disabled={wiping}
              aria-busy={wiping}
              type="button"
              title="Reset the development database"
            >
              {wiping ? "Resetting..." : "Reset Database"}
            </Button>
            <p
              className="sr-only"
              role="status"
              aria-live="polite"
            >
              {wiping ? "Database reset in progress." : "Idle."}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}