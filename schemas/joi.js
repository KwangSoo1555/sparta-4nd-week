import joi from 'joi';

// 상품 생성 시 유효성 검사
export const createValidation = joi.object({
  goodsId: joi.number().min(1).max(100).required().messages({
    'number.base': 'id는 숫자열이어야 합니다.',
    'number.min': 'id는 최소 1글자여야 합니다.',
    'number.max': 'id는 최대 100글자까지만 작성됩니다.',
    'number.empty': 'id를 입력해주세요.',
    'any.required': 'id를 입력해주세요.',
  }),
  name: joi.string().min(1).max(10).required().messages({
    'string.base': '상품명은 문자열이어야 합니다.',
    'string.min': '상품명은 최소 1글자여야 합니다.',
    'string.max': '상품명은 최대 10글자까지만 작성됩니다.',
    'string.empty': '상품명을 입력해주세요.',
    'any.required': '상품명을 입력해주세요.',
  }),
  details: joi.string().min(1).max(30).required().messages({
    'string.base': '상품 설명은 문자열이어야 합니다.',
    'string.min': '상품 설명은 최소 1글자여야 합니다.',
    'string.max': '상품 설명은 최대 30글자까지만 작성됩니다.',
    'string.empty': '상품 설명을 입력해주세요.',
    'any.required': '상품 설명을 입력해주세요.',
  }),
  manager: joi.string().min(1).max(20).messages({
    'string.base': '관리자는 문자열이어야 합니다.',
    'string.min': '관리자는 최소 1글자여야 합니다.',
    'string.max': '관리자는 최대 20글자까지만 작성됩니다.',
    'string.empty': '관리자를 입력해주세요.',
  }),
  saleStatus: joi.string().valid('FOR_SALE', 'SOLD_OUT').messages({
    'string.base': '상품 상태는 문자열이어야 합니다.',
    'any.only': '상품 상태는 [FOR_SALE] 값만 유효합니다.',
  }),
  putPW: joi.required().messages({
    'string.empty': '비밀번호를 입력해주세요.',
    'any.required': '비밀번호를 입력해주세요.',
  }),
});

// 상품 수정 시 유효성 검사
export const updateValidation = joi.object({
  goodsId: joi.number().min(1).max(100).required().messages({
    'number.base': 'id는 숫자열이어야 합니다.',
    'number.min': 'id는 최소 1글자여야 합니다.',
    'number.max': 'id는 최대 100글자까지만 작성됩니다.',
    'number.empty': 'id를 입력해주세요.',
    'any.required': 'id를 입력해주세요.',
  }),
  name: joi.string().min(1).max(10).messages({
    'string.base': '수정할 상품명은 문자열이어야 합니다.',
    'string.min': '수정할 상품명은 최소 1글자여야 합니다.',
    'string.max': '수정할 상품명은 최대 10글자까지만 작성됩니다.',
  }),
  details: joi.string().min(1).max(30).messages({
    'string.base': '상품 설명은 문자열이어야 합니다.',
    'string.min': '상품 설명은 최소 1글자여야 합니다.',
    'string.max': '상품 설명은 최대 30글자까지만 작성됩니다.',
  }),
  manager: joi.string().min(1).max(20).messages({
    'string.base': '관리자는 문자열이어야 합니다.',
    'string.min': '관리자는 최소 1글자여야 합니다.',
    'string.max': '관리자는 최대 20글자까지만 작성됩니다.',
  }),
  saleStatus: joi.string().valid('FOR_SALE', 'SOLD_OUT').messages({
    'string.base': '상품 상태는 문자열이어야 합니다.',
    'any.only': '상품 상태는 [SOLD_OUT] 값으로 변경됩니다.',
  }),
  putPW: joi.required().messages({
    'string.empty': '비밀번호를 입력해주세요.',
    'any.required': '비밀번호를 입력해주세요.',
  }),
});

// 상품 삭제 시 유효성 검사
export const deleteValidation = joi.object({
  putPW: joi.required().messages({
    'string.empty': '비밀번호를 입력해주세요.',
    'any.required': '비밀번호를 입력해주세요.',
  }),
});
