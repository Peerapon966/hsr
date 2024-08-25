import React from "react";

type inputEventType = React.ClipboardEvent | React.KeyboardEvent;

export function checkNumeric(e: inputEventType) {
  const eventType = e.type;
  const value =
    eventType === "paste"
      ? (e as React.ClipboardEvent).clipboardData?.getData("Text")
      : (e as React.KeyboardEvent).key;

  switch (eventType) {
    case "keydown":
      const isCtrlKey = (e as React.KeyboardEvent).ctrlKey;
      const allowedKeys = ["Backspace", "Shift", "Tab"];

      if (
        value?.toString().search(/[0-9]/) == -1 &&
        !allowedKeys.includes(value?.toString()) &&
        !isCtrlKey
      ) {
        e.preventDefault();
      }

      break;
    case "paste":
      if (value?.toString().search(/^[0-9]{1,6}$/g) == -1) {
        e.preventDefault();
      }

      break;
  }
}
