import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";

// import our two components
import Paused from "./Paused";
import ProgressBar from "./ProgressBar";

function Pomodoro() {
  // These are our default times for when we spool up
  const initialBreakTime = 5;
  const initialFocusTime = 25;

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Time we will focus for (in minutes)
  const [focusTime, setFocusTime] = useState(initialFocusTime);

  // Time we will break for (in minutes)
  const [breakTime, setBreakTime] = useState(initialBreakTime);

  // Time remaining in either focus or break session (in seconds)
  const [timeRemaining, setTimeRemaining] = useState(initialFocusTime * 60);

  // Boolean to track if we are in Focus session or not (false means we are in Break)
  const [isFocus, setIsFocus] = useState(true);

  // Boolean to track if we are actively using the timer or not
  const [inSession, setInSession] = useState(false);

  // Percentage of timer that has counted down.
  const [progressWidth, setProgressWidth] = useState(0);


  // Here are our limits and intervals for this timer, all in minutes.
  const minBreakTime = 1;
  const maxBreakTime = 15;
  const minFocusTime = 5;
  const maxFocusTime = 60;
  const breakInterval = 1;
  const focusInterval = 5;

  // This is how I show a leading 0 on my minute timer
  const zeroPad = (num, places) => String(num).padStart(places, "0");


  // Function to play an alarm when we finish a focus or break time
  function playAlarm() {
    console.log("Play alarm");
    new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  }

  useInterval(
    () => {
      // Count down the timer second by second
      setTimeRemaining(timeRemaining - 1);

      /// Update our progress width
      setProgressWidth(
        100 -
          (100 * timeRemaining) / (isFocus ? focusTime * 60 : breakTime * 60)
      );

      // Check to see if timer is finished
      if (timeRemaining == 0) {
        // We are finished, sound the alarm
        playAlarm();
        // Now set the next time, either focus or break based on the isFocus boolean
        if (isFocus) setTimeRemaining(breakTime * 60);
        else setTimeRemaining(focusTime * 60);
        setIsFocus(!isFocus);
      }
    },
    // Magical 1 second timing
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    console.log("Pressed Play/Pause");
    // Check if new session, if so, we start set isFocus and use our focus time
    if (!inSession) {
      setInSession(true);
      setIsFocus(true);
      setTimeRemaining(focusTime * 60);
    }
    // Toggle the timer running or not
    setIsTimerRunning((prevState) => !prevState);
  }


  // Function to handle decreasing the break time.  Only allowed when not in session.
  // Also checks the limit compared to minimum value
  function handleDecreaseBreak() {
    if (inSession) console.log("Decrease Break Inactive");
    else {
      if (breakTime > minBreakTime) {
        console.log("Decrease Break Allowed");
        setBreakTime(breakTime - breakInterval);
      } else console.log("Decrease Break at limit");
    }
  }

  // Function to handle increasing the break time.  Only allowed when not in session.
  // Also checks the limit compared to maximum value
  function handleIncreaseBreak() {
    if (inSession) console.log("Increase Break Inactive");
    else {
      if (breakTime < maxBreakTime) {
        console.log("Increase Break Allowed");
        setBreakTime(breakTime + breakInterval);
      } else console.log("Increase Break at limit");
    }
  }

  // Function to handle decreasing the focus time.  Only allowed when not in session.
  // Also checks the limit compared to minimum value
  function handleDecreaseFocus() {
    if (inSession) console.log("Decrease Focus Inactive");
    else {
      if (focusTime > minFocusTime) {
        console.log("Decrease Focus Allowed");
        setFocusTime(focusTime - focusInterval);
      } else console.log("Decrease Focus at limit");
    }
  }

  // Function to handle increasing the focus time.  Only allowed when not in session.
  // Also checks the limit compared to maximum value
  function handleIncreaseFocus() {
    if (inSession) console.log("Increase Focus Inactive");
    else {
      if (focusTime < maxFocusTime) {
        console.log("Increase Focus Allowed");
        setFocusTime(focusTime + focusInterval);
      } else console.log("Increase Focus at limit");
    }
  }

  // function to handle the stop button.
  function handleStop() {
    console.log("Stop pressed");
    setIsTimerRunning(false);
    setInSession(false);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {zeroPad(focusTime, 2)}:00
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={handleDecreaseFocus}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={handleIncreaseFocus}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {zeroPad(breakTime, 2)}:00
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={handleDecreaseBreak}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={handleIncreaseBreak}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      {inSession ? (
        <div>
          {/* TODO: This area should show only when a focus or break session is running or pauses */}
          <div className="row mb-2">
            <div className="col">
              {
                /* TODO: Update message below to include current session (Focusing or On Break) and total duration */ isFocus ? (
                  <h2 data-testid="session-title">
                    Focusing for {zeroPad(focusTime, 2)}:00 minutes
                  </h2>
                ) : (
                  <h2 data-testid="session-title">
                    On Break for {zeroPad(breakTime, 2)}:00 minutes
                  </h2>
                )
              }
              <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(timeRemaining)} remaining
              </p>
            </div>
          </div>

          <Paused inSession={inSession} isTimerRunning={isTimerRunning} />
          <ProgressBar progressWidth={progressWidth} />
        </div>
      ) : null}
    </div>
  );
}

export default Pomodoro;
