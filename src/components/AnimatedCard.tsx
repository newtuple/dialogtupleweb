import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface AnimatedCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  index?: number;
  containerClassName?: string;
  iconWrapperClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  whileHover?: MotionProps['whileHover'];
}

export default function AnimatedCard({
  icon,
  title,
  description,
  index = 0,
  containerClassName = '',
  iconWrapperClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  whileHover = { scale: 1.05 }
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.1, delay: index * 0.1 }}
      whileHover={whileHover}
      className={containerClassName}
    >
      <motion.div
        initial={{ opacity: 1, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.2 }}
        className={iconWrapperClassName}
      >
        {icon}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
      >
        <h3 className={titleClassName}>{title}</h3>
        <p className={descriptionClassName}>{description}</p>
      </motion.div>
    </motion.div>
  );
}
