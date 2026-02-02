import React from 'react';

const HexagonPattern: React.FC = () => {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.02] z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hexagons"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(2)"
        >
          <polygon
            points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary"
          />
          <polygon
            points="24.8,72 37.3,79.2 37.3,93.7 24.8,100.9 12.3,93.7 12.3,79.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary"
          />
          <polygon
            points="49.7,47 62.2,54.2 62.2,68.7 49.7,75.9 37.2,68.7 37.2,54.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  );
};

export default HexagonPattern;
