"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAgent = exports.TAIWAN_REG = exports.PWD_REG = exports.PHONE_NUMBER_REG = exports.PASSPORT_REG = exports.NAME_REG = exports.MONEY_REG = exports.HKMACAO_REG = exports.EMAIL_REG = exports.CH_NAME_REG = exports.BIRTH_REG = void 0;
/** 手机号码 */
var PHONE_NUMBER_REG = exports.PHONE_NUMBER_REG = /^1[3|4|5|8|7|9][0-9]\d{8}$/;

/** 邮箱 */
var EMAIL_REG = exports.EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/;

/** 金额 */
var MONEY_REG = exports.MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;

/** 用户名称(中文a-zA-Z0-9) */
var NAME_REG = exports.NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;
/** 中文名称 */
var CH_NAME_REG = exports.CH_NAME_REG = /[\u4e00-\u9fa5][\u4e00-\u9fa5]+/;
/** 验证码 */
var PWD_REG = exports.PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/;
/** 手机号(香港澳门) */
var HKMACAO_REG = exports.HKMACAO_REG = /^[CHMhm]{1}([0-9]{10}|[0-9]{8})$/;
/** 手机号(台湾) */
var TAIWAN_REG = exports.TAIWAN_REG = /^[0-9]{8,10}$/;
/** 生日 */
var BIRTH_REG = exports.BIRTH_REG = /^[A-Z]{1}\d{9}$/;
/** 邮编 */
var PASSPORT_REG = exports.PASSPORT_REG = /^[a-zA-Z0-9]{5,17}$/;
var userAgent = exports.userAgent = window.navigator.userAgent.toLowerCase();