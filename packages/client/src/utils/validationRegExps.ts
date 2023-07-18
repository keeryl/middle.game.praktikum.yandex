export const LOGIN_REGEXP =
  /^(?![\W_|-]{1})(?!.*_-)(?!.*-_)(?!.*--)(?!.*__).[\w-]*(?<!.-|_)$/gi

export const PASSWORD_REGEXP = /^(?=.*?[0-9])(?=.*?[A-Z]).*$/

export const NICKNAME_REGEXP =
  /^(?![\W_|-]{1})(?!.*_-)(?!.*-_)(?!.*--)(?!.*__).[\w-]*(?<!.-|_)$/gi

export const FIRST_LETTER_CAPITAL = /^[A-ZА-ЯЁ]{1}.*$/gm

export const ONLY_LETTERS = /^.*[A-Za-zА-ЯЁа-яё-]$/gm

export const NO_DOBBLE_DASHES_AND_UNDERLINES =
  /^(?!.*--)(?!.*-_)(?!.*_-)(?!.*_).*\w$/gm

export const ONLY_DIGITS = /\+?[\d]{10,15}$/
