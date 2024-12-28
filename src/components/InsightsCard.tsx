"use client";

import { InsightItem } from "@/types/insights";
import AdImageRow from "./AdImageRow";
import AdTextRow from "./AdTextRow";
import { motion } from "framer-motion";

interface InsightsCardProps {
  title: string;
  data: InsightItem[];
  type: "text" | "image";
}

export default function InsightsCard({ title, data, type }: InsightsCardProps) {
  const totalMetrics = data.reduce(
    (acc, item) => ({
      impressions: acc.impressions + item.insights.impressions,
      clicks: acc.clicks + item.insights.clicks,
      conversions: acc.conversions + item.insights.conversions,
      spend: acc.spend + item.insights.spend,
    }),
    {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow"
    >
      <h3 className="text-md font-semibold mb-4 border-b py-4 px-4">{title}</h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 p-4"
      >
        {data.map((item, index) => (
          <motion.div
            key={item.creative.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {type === "image" ? (
              <AdImageRow item={item} />
            ) : (
              <AdTextRow item={item} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
