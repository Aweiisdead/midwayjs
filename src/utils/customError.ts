// import { MidwayError, registerErrorCode } from '@midwayjs/core';

// export const FrameworkErrorEnum = registerErrorCode('midway', {
//   UNKNOWN: 500,
//   COMMON: 500,
//   PARAM_TYPE: 501,
//   // ...
// } as const);
// export class CustomError extends MidwayError {
//   constructor(message) {
//     super(message ?? 'Parameter type not match', FrameworkErrorEnum.PARAM_TYPE);
//   }
// }
import { MidwayError } from '@midwayjs/core';

export class CustomError extends MidwayError {
  constructor(message: string, code: any) {
    super(message, code);
  }
}
