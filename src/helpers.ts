import { BigNumber } from "@ethersproject/bignumber";

import { Integer, SdkError, Usdc } from "./types";

export const ZeroAddress = "0x0000000000000000000000000000000000000000";
export const EthAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const WethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// handle a non-200 `fetch` response.
export async function handleHttpError(response: Response): Promise<Response> {
  if (response.status !== 200) {
    const { url, status, statusText } = response;
    throw new SdkError(`HTTP to ${url} request failed (status ${status} ${statusText})`);
  }
  return response;
}

// formally convert USD values to USDC values (* 1e6), using Usdc type alias.
export function usdc(usd: any): Usdc {
  return BigNumber.from(Math.floor(Number(usd) * 1e6)).toString();
}

// formally convert BigNumber to Integer type alias.
export function int(value: BigNumber): Integer {
  return value.toString();
}

export function chunkArray<T>(array: T[], size: number) {
  if (size < 1) {
    throw new Error(`Size needs to be positive: ${size}`);
  }

  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}
