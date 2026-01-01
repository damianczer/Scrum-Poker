export const POKER_CARDS = ['?', '0.5', '1', '2', '3', '5', '8', '13'];

export const SESSION_CONFIG = {
  MAX_USERS: 10,
  MIN_USERNAME_LENGTH: 2,
  MAX_USERNAME_LENGTH: 15,
  MIN_SESSION_NAME_LENGTH: 3,
  MAX_SESSION_NAME_LENGTH: 15,
};

export const COOKIE_CONFIG = {
  NAME: 'dc_scrum_poker_settings',
  EXPIRES_DAYS: 365,
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const LANGUAGES = {
  EN: 'en',
  PL: 'pl',
};

export const CARD_COLORS = {
  UNKNOWN: 'black',
  LOW: 'green',
  MEDIUM: 'orange',
  HIGH: 'red',
  DEFAULT: 'inherit',
};

export const CARD_THRESHOLDS = {
  LOW_MAX: 3,
  MEDIUM: 5,
  HIGH_MIN: 8,
  HIGH_MAX: 13,
};
