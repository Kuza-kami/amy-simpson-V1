import React from 'react';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://picsum.photos/seed/fallback/800/600';
};

export const getHighResUrl = (url: string) => {
  return url;
};
