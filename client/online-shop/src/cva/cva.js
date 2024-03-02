import { cva } from "class-variance-authority";


export const starStyle = cva("h-5 w-5 flex-shrink-0", {
  variants: {
    isYellow: {
      true: "text-yellow-400",
      false: "text-gray-200",
    },
  },
});

export const buttonStyle = cva("rounded w-48 mr-5 py-2 px-4 border", {
    variants:{
        isActive:{
            true:"bg-indigo-600 font-semibold text-white border-transparent rounded",
            false:"bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white border-indigo-600 hover:border-transparent "
        }
    }
})
