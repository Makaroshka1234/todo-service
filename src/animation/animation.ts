

export const listVariants = {
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {

            duration: 0.3
        }
    }),
    hidden: { opacity: 0, x: -50 },
    exit: {
        opacity: 0, x: 50,
        transition: {
            duration: 0.2,
        }
    }

}


export const TodoListVariants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    hidden: {
        opacity: 0
    }
}