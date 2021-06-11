/* eslint-disable no-useless-escape */

export const PHONE = /^((?:\+[\d().-]*\d[\d().-]*|[0-9A-F*#().-]*[0-9A-F*#][0-9A-F*#().-]*(?:;[a-z\d-]+(?:=(?:[a-z\d\[\]\/:&+$_!~*'().-]|%[\dA-F]{2})+)?)*;phone-context=(?:\+[\d().-]*\d[\d().-]*|(?:[a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*(?:[a-z]|[a-z][a-z0-9-]*[a-z0-9])))(?:;[a-z\d-]+(?:=(?:[a-z\d\[\]\/:&+$_!~*'().-]|%[\dA-F]{2})+)?)*(?:,(?:\+[\d().-]*\d[\d().-]*|[0-9A-F*#().-]*[0-9A-F*#][0-9A-F*#().-]*(?:;[a-z\d-]+(?:=(?:[a-z\d\[\]\/:&+$_!~*'().-]|%[\dA-F]{2})+)?)*;?)*)*)$/;

export const EMAIL = /^\s*[^ @]+@[^ @]+\s*$/;

export const NAME = /^[^\~!@#$%^&*()|+=?;:",<>\{\}\[\]\\\/¤€¨£°§]*$/i;

export const DOMAIN = /^[^\~!#$%^&*()|+=?;:",<>\{\}\[\]\\\/¤€¨£°§]*$/i;

/* eslint-enable no-useless-escape */