import { Button } from "@mui/material";
import { motion } from "motion/react";

export const MotionButton = motion(Button);

export const listVariants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  }),
  hidden: { opacity: 0, x: -50 },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.2,
    },
  },
};

export const TodoListVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const AboutProjectVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
};
export const AboutProjectVariantsLeft = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    x: -50,
  },
};

export const MottionBtnVar = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    x: 50,
  },
};

export const UsedTehnologiesVar = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  hidden: {
    opacity: 1,
    y: 100,
  },
};
