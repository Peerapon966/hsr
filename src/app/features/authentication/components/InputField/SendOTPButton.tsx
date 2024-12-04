"use client";

import { useState } from "react";
import { ApiSuccessResponse } from "@/api/utils/response/apiResponse";

export type SendOTPButtonProps = {
  function: () => Promise<ApiSuccessResponse | undefined>;
  throttle: number;
};

export function SendOTPButton({
  function: sendOTPFunction,
  throttle,
}: SendOTPButtonProps) {
  const [isThrottling, setIsThrottling] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(throttle);
  const sendOTPHandler = async () => {
    const result = await sendOTPFunction();

    if (result?.success) {
      setIsThrottling(true);
      const interval = setInterval(() => {
        setCooldown((cooldown) => {
          if (cooldown <= 1) {
            setIsThrottling(false);
            clearInterval(interval);
            return 0;
          }

          return cooldown - 1;
        });
      }, 1000);
    }
  };
  return (
    <span data-flex className="suffix-icon">
      <span
        data-flex
        className="register-send-email-container cross-axis-center"
      >
        {isThrottling ? (
          <div className="throttled-send-email">Resend ({cooldown}s)</div>
        ) : (
          <a
            type="button"
            className="register-send-email"
            onClick={sendOTPHandler}
          >
            Send
          </a>
        )}
      </span>
    </span>
  );
}
