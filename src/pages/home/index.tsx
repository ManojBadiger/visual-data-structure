import { motion } from "framer-motion";
import MyCardGrid from "../../components/grid";

const HomeMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="fst-normal"
    >
      <h3>Home</h3>
      <hr />
      <p>
        Welcome to the Data Structure Visualizer. Use this static site to
        visualize common Data Structures and Algorithms.
      </p>

      <MyCardGrid />
      <hr />
    </motion.div>
  );
};

export default HomeMenu;
