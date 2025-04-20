import { duration } from "@mui/material"
import { delay } from "motion"
import { motion } from "motion/react"
import { exit } from "process"

export const listVariants = {
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {

            duration: 0.3
        }
    }),
    hidden: { opacity: 0, y: 100 },
    exit: {
        opacity: 0, x: 50,
        transition: {
            duration: 0.2,
        }
    }

}