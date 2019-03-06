export const DEFAULT_STAR_RATING = 'DEFAULT_STAR_RATING';
export const DEFAULT_COMMENT = 'DEFAULT_COMMENT';
export const ADDITIONAL_STAR_RATING  = 'ADDITIONAL_STAR_RATING';
export const ADDITIONAL_TEXT_QUESTION = 'ADDITIONAL_TEXT_QUESTION';
export const values = () => {
    return [DEFAULT_STAR_RATING, DEFAULT_COMMENT, ADDITIONAL_STAR_RATING, ADDITIONAL_TEXT_QUESTION];
};
export const isDefault = (questionType) => {
    return [DEFAULT_STAR_RATING, DEFAULT_COMMENT].some(v => v === questionType);
};