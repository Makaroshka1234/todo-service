import React from 'react';
import { motion } from 'motion/react';

const NotFoundMessage = () => {
  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="font-sans font-bold text-4xl">Sorry, page NOT FOUND</h2>
    </motion.div>
  );
};

export default NotFoundMessage;
