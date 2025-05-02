import React from "react";

import { useAuth } from "../hooks/useAuth";

import { motion } from "motion/react";
import {
  AboutProjectVariants,
  AboutProjectVariantsLeft,
  MotionButton,
  MottionBtnVar,
} from "../animation/animation";
import { useNavigate } from "react-router";

const AboutProjectSection = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  function handleClick(): void {
    if (isAuth) {
      navigate("/lists");
    } else {
      navigate("/login");
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={AboutProjectVariants}
      className="flex justify-center items-center mb-5 p-1 min-h-[calc(100vh-80px)] about-project"
    >
      <div className="mx-auto max-w-6xl container">
        <div className="flex justify-around inner">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={AboutProjectVariantsLeft}
            className="left flex flex-col gap-8"
          >
            <h2 className="font-bold text-4xl"> About Project</h2>
            <p className="max-w-sm font-light text-2xl leading-7 about">
              With this service, users can create task lists, tasks in lists,
              which helps users to plan their tasks, and users can also form
              teams to complete tasks together{" "}
            </p>
          </motion.div>
          <div className="right flex items-end">
            <MotionButton
              onClick={handleClick}
              initial="hidden"
              animate="visible"
              variants={MottionBtnVar}
              variant="outlined"
              sx={{
                background: "#212121",
                borderColor: "#ffffff26",
                color: "#fff",
                "&:hover": {
                  background: "#414141",
                },
              }}
            >
              Create Task
            </MotionButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutProjectSection;
