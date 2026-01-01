export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/scrum-poker' : '';

export const getAssetPath = (path) => `${BASE_PATH}${path}`;
