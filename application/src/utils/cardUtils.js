import { CARD_COLORS, CARD_THRESHOLDS } from '../constants/constants';

export const getCardColor = (card) => {
    if (card === '?') return CARD_COLORS.UNKNOWN;

    const numValue = parseFloat(card);
    if (isNaN(numValue)) return CARD_COLORS.DEFAULT;

    if (numValue >= 0.5 && numValue <= CARD_THRESHOLDS.LOW_MAX) {
        return CARD_COLORS.LOW;
    }

    if (numValue === CARD_THRESHOLDS.MEDIUM) {
        return CARD_COLORS.MEDIUM;
    }

    if (numValue >= CARD_THRESHOLDS.HIGH_MIN && numValue <= CARD_THRESHOLDS.HIGH_MAX) {
        return CARD_COLORS.HIGH;
    }

    return CARD_COLORS.DEFAULT;
};

export const calculateAverage = (users) => {
    const validCards = users
        .map(user => parseFloat(user.selectedCard))
        .filter(card => !isNaN(card));

    if (validCards.length === 0) {
        return 'N/A';
    }

    const sum = validCards.reduce((acc, card) => acc + card, 0);
    return (sum / validCards.length).toFixed(2);
};

export const getCurrentUserCard = (users, username) => {
    const user = users.find(u => u.name === username);
    return user?.selectedCard ?? null;
};

export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
