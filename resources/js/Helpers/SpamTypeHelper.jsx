export const HAM = 0;
export const SPAM = 1;
export const AD = 2;
export const OTHER = 3;

export const LIST = [HAM, SPAM, AD, OTHER];

export function translate(type) {
    switch (type) {
        case HAM: return 'Не спам';
        case SPAM: return 'Спам';
        case AD: return 'Рекламный';
        case OTHER: return 'Другой';
        default: return 'Не определено';
    }
}
