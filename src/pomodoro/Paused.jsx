import React from "react";

function Paused({ inSession, isTimerRunning }) {
    // If we are not in session, we never show we are paused
    if (!inSession)
        return null;

    // If timer is running, we are not paused
    if (isTimerRunning)
        return null;

    // We are paused, display that information
    return (
    <>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">PAUSED</h2>
          </div>
        </div>
    </>
  );
}

export default Paused;
