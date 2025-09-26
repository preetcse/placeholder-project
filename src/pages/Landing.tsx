// TODO: REPLACE THIS LANDING PAGE WITH AN ELEGANT, THEMATIC, AND WELL-DESIGNED LANDING PAGE RELEVANT TO THE PROJECT
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <img
          src="./logo.svg"
          alt="Logo"
          width={64}
          height={64}
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl font-semibold">Blank Project</h1>
        <p className="text-muted-foreground mt-2">
          Your project is ready. Start building.
        </p>

        {/* Dev-only dangerous action */}
        {import.meta.env.DEV && (
          <div className="mt-6">
            <Button
              variant="destructive"
              onClick={handleWipe}
              disabled={wiping}
            >
              {wiping ? "Resetting..." : "Reset Database"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}