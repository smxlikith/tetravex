import React, { useEffect } from "react";
import { formatTime } from "../../lib/utils";

export default function Timer ({ running, resetSignal, seconds, setSeconds }) {
  // Start/stop based on "running"
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setSeconds(0);
  }, [resetSignal]);

  return (
    <h2 className="text-xl font-bold text-center">
      ⏱ {formatTime(seconds)}
    </h2>
  );
}