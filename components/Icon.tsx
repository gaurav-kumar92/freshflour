import React from 'react';
import { FaLeaf, FaTruck, FaAward } from 'react-icons/fa';

// Add any other icons you want to use here
const iconMap = {
  FaLeaf,
  FaTruck,
  FaAward,
};

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent /> : null;
};

export default Icon;
