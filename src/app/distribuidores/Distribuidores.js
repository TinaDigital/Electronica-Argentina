'use client'

import { motion } from 'framer-motion'

export default function Distribuidores() {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Distribuidores
            </motion.h1>
            <motion.div
                className="w-full flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <iframe 
                    src="https://www.google.com/maps/d/u/0/embed?mid=1I2JTUa_8iKBI3zvC93CVRZYCR8ft3z4&ehbc=2E312F&noprof=1" 
                    width="100%" 
                    height="600"
                    className="rounded-lg shadow-lg"
                    style={{ maxWidth: '1200px' }}
                ></iframe>
            </motion.div>
        </div>
    )
}