import React from "react";


// Display a progress bar
function ProgressBar({ progressWidth }) {
  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progressWidth} // Progress width is a percentage from 0 to 100 that is calculated based on total time and remaining time
            style={{ width: progressWidth + "%" }} 
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
