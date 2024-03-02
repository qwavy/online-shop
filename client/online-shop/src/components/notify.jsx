import { cva } from "class-variance-authority";

const notifyStyle = cva(
  "w-1/12 rounded h-12 text-center flex items-center justify-center text-white duration-200 transition-colors",
  {
    variants: {
      notifyType: {
        true: "bg-green-400",
        false: "bg-red-500",
      },
    },
  }
);

const notifyShow = cva(
  "container mx-auto fixed left-0 right-0 flex justify-end top-20",
  {
    variants: {
      isComponentLoaded: {
        true: "block",
        false: "hidden",
      },
    },
  }
);

export const Notify = ({ showNotifyProps, notifyType, message }) => {
  return (
    <div className={notifyShow({ isComponentLoaded: showNotifyProps })}>
      <div className={notifyStyle({ notifyType: notifyType === "success" })}>
        {message}
      </div>
    </div>
  );
};
