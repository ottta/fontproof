import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{}>;
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ type: "just", delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
