import React, { useEffect } from "react";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

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