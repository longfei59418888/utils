/** 手机号码 */
export const PHONE_NUMBER_REG = /^1[3|4|5|8|7|9][0-9]\d{8}$/

/** 邮箱 */
export const EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/

/** 金额 */
export const MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/

/** 用户名称(中文a-zA-Z0-9) */
export const NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
/** 中文名称 */
export const CH_NAME_REG = /[\u4e00-\u9fa5][\u4e00-\u9fa5]+/
/** 验证码 */
export const PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/
/** 手机号(香港澳门) */
export const HKMACAO_REG = /^[CHMhm]{1}([0-9]{10}|[0-9]{8})$/
/** 手机号(台湾) */
export const TAIWAN_REG = /^[0-9]{8,10}$/
/** 生日 */
export const BIRTH_REG = /^[A-Z]{1}\d{9}$/
/** 邮编 */
export const PASSPORT_REG = /^[a-zA-Z0-9]{5,17}$/

export const userAgent = window.navigator.userAgent.toLowerCase()
