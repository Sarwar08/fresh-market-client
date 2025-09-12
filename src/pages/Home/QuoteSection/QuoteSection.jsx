import { motion } from "framer-motion";

export default function QuoteSection() {
    return (
        <div>
            <h1 className='text-4xl font-semibold text-center mb-8'>Daily Tips</h1>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity: [0.8, 1, 0.8], // subtle fade
                    y: [0, -10, 0]          // slight up and down motion
                }}
                transition={{
                    duration: 4,             // 4 seconds for a full cycle
                    repeat: Infinity,        // loop forever
                    repeatType: "mirror",    // back and forth
                    ease: "easeInOut"        // smooth motion
                }}
                className="my-12 px-4 max-w-2xl mx-auto text-center bg-green-950/30 rounded-2xl shadow-md p-8"
            >
                <p className="text-xl md:text-2xl italic text-gray-200">
                    “Smart buyers check prices before they shop. Stay updated, save money, stay informed.”
                </p>
                <span className="block mt-4 text-gray-400 font-semibold">– কাঁচাবাজার Team</span>
            </motion.section>
        </div>

    );

}
