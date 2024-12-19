import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Reusable Gradient Components
 * Atoms: The smallest, most fundamental components.
 * Examples: Buttons, Text, Input fields, Icons.
 */

// YouTube Gradient
export const YouTubeGradient = ({ style, children }) => (
  <LinearGradient
    colors={['#e52d27', '#b31217']} // Gradient colors
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }} // Horizontal gradient
    style={style}
  >
    {children}
  </LinearGradient>
);

// Primary Gradient
export const PrimaryGradient = ({ style, children }) => (
  <LinearGradient
    colors={['#6A787C', '#2B383D']} // Primary gradient
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }} // Vertical gradient
    style={style}
  >
    {children}
  </LinearGradient>
);

// Secondary Gradient
export const SecondaryGradient = ({ style, children }) => (
  <LinearGradient
    colors={['#ED8936', '#DD6B20']} // Secondary gradient
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }} // Vertical gradient
    style={style}
  >
    {children}
  </LinearGradient>
);
