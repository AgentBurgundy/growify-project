"use client";

import { InsightItem } from "@/types/insights";
import { calculateCPA } from "@/util/cpa";
import AdSpendBadge from "./AdSpendBadge";
import ROASBadge from "./ROASBadge";
import PurchasesBadge from "./PurchasesBadge";
import CPABadge from "./CPABadge";
import { calculateROAS } from "@/util/roas";
import { FaGoogle } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

interface AdTextRowProps {
  item: InsightItem;
}

export default function AdTextRow({ item }: AdTextRowProps) {
  const roas = calculateROAS(item.insights.spend, item.insights.conversions);

  const getServiceLogo = () => {
    switch (item.target.serviceType.toLowerCase()) {
      case "facebook":
        return (
          <FaMeta className="w-6 h-6 bg-gray-100 rounded-md p-1 text-blue-600" />
        );
      case "tiktok":
        return (
          <FaTiktok className="w-6 h-6 bg-gray-100 rounded-md p-1 text-black" />
        );
      case "google":
        return (
          <FaGoogle className="w-6 h-6 bg-gray-100 rounded-md p-1 text-black" />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div className="flex flex-row items-center justify-between space-x-4 border-b rounded py-2">
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-500 mb-2 w-[85%]"
        >
          {item.creative.text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="text-sm font-semibold">{item.creative.name}</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-row space-x-2 text-xs"
          >
            <AdSpendBadge spend={item.insights.spend} />
            <ROASBadge roas={roas} />
            <PurchasesBadge purchases={item.insights.conversions} />
            <CPABadge
              cpa={calculateCPA(item.insights.spend, item.insights.conversions)}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex flex-col ml-auto"
      >
        {getServiceLogo()}
      </motion.div>
    </motion.div>
  );
}
