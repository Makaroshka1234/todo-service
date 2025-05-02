import React from "react";
import { tehnologiesItems } from "../texnologies";

import { AnimatePresence, motion } from "motion/react";
import { UsedTehnologiesVar } from "../animation/animation";

const UsedTehnologies = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={UsedTehnologiesVar}
      className="mb-5 min-h-[calc(100vh-80px)] used-tehnologies"
    >
      <div className="mx-auto max-w-4xl container">
        <div className="flex flex-col justify-center items-center gap-y-32 inner">
          <h2 className="font-bold text-4xl">Used Tehnologies</h2>
          <div className="flex justify-center items-center w-full">
            <ul className="flex flex-col gap-5 w-[300px]">
              {tehnologiesItems.map((item) => (
                <li className="flex items-center gap-12">
                  {item.icon} <span>{item.title}</span>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UsedTehnologies;
