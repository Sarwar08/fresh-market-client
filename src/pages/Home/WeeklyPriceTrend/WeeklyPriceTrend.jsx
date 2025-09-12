import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "motion/react"

// Sample Data: Last 7 days price of Onion, Potato, Tomato
const weeklyData = [
    { date: "Sep 2", Onion: 30, Potato: 28, Tomato: 40 },
    { date: "Sep 3", Onion: 32, Potato: 27, Tomato: 42 },
    { date: "Sep 4", Onion: 31, Potato: 29, Tomato: 41 },
    { date: "Sep 5", Onion: 33, Potato: 30, Tomato: 43 },
    { date: "Sep 6", Onion: 34, Potato: 31, Tomato: 45 },
    { date: "Sep 7", Onion: 32, Potato: 29, Tomato: 44 },
    { date: "Sep 8", Onion: 35, Potato: 32, Tomato: 46 },
];

export default function WeeklyPriceTrends() {
    return (
        <div>
            <h1 className='text-4xl font-semibold text-center mb-8'>Trends</h1>
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="my-12 px-4 max-w-4xl mx-auto bg-base-100/30 rounded-2xl shadow-lg p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Weekly Price Trends</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="Onion" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="Potato" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="Tomato" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </motion.section>
        </div>
    );
}
