"use client";

import { motion } from "framer-motion";

interface Contestant {
  name: string;
  score: number;
}

interface PodiumProps {
  podium: Contestant[];
}

function getMedalEmoji(position: number): string {
  switch (position) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "🏅";
  }
}

export default function Podium({ podium }: PodiumProps) {
  const sortedPodium = podium
    .sort((a, b) => b.score - a.score)
    .map((contestant, index) => ({
      ...contestant,
      position: index,
    }));

  const reorderedPodium = [
    sortedPodium[1] || null, // 2nd place (left)
    sortedPodium[0], // 1st place (center)
    sortedPodium[2] || null, // 3rd place (right)
    ...sortedPodium.slice(3), // Other places (default order)
  ].filter(Boolean); // Remove null values for empty positions

  return (
    <div className="flex items-end justify-center gap-4 pt-4">
      {reorderedPodium.map((contestant) => (
        <PodiumStep
          key={contestant.name}
          podium={sortedPodium}
          winner={contestant}
        />
      ))}
    </div>
  );
}

interface PodiumStepProps {
  podium: Contestant[];
  winner: { name: string; score: number; position: number };
}

function PodiumStep({ podium, winner }: PodiumStepProps) {
  const offset = podium.length - winner.position;

  return (
    <div className="flex flex-col items-center justify-end">
      {/* Winner Emoji */}
      <motion.div
        className="mb-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.75, // Removed delays
            },
          },
        }}
      >
        <div className="text-[2.75rem] rounded-full h-[2.75rem] w-[2.75rem] flex items-center justify-center bg-rose-100">
          {getMedalEmoji(winner.position)}
        </div>
      </motion.div>

      {/* Podium Block */}
      <motion.div
        className={`flex items-center justify-center w-16 bg-rose-700 rounded-t-lg mb-[-1px]`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: {
            height: 200 * (offset / podium.length),
            opacity: 1,
            transition: {
              duration: 2,
              ease: "backInOut", // No delay
            },
          },
        }}
      >
        <span style={{ alignSelf: "flex-end", color: "white" }}>
          {winner.position + 1}
        </span>
      </motion.div>

      {/* Winner Name and Score */}
      <motion.div
        className="text-center mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }} // No delay
      >
        <div className="font-bold text-black">{winner.name}</div>
        <motion.div
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }} // No delay
        >
          {winner.score} pts
        </motion.div>
      </motion.div>
    </div>
  );
}
