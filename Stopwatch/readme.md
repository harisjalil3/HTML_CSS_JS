### __Stopwatch Pseudo-Code__
This document outlines the logical flow and core functions of the JavaScript stopwatch using pseudo-code. It's a useful reference for understanding how the timer works, from state management to time-incrementing logic.

### __Global Variables__
These variables hold the state of the stopwatch and are accessible by all functions.
```
SET isRunning to false (A flag to check if the timer is running)

SET timerInterval to null (Holds the ID of the timer loop)

SET seconds, minutes, and hours to 0

```
### Function: startTimer()
This function is responsible for starting the stopwatch.
```
IF isRunning is true, THEN RETURN (This prevents starting the timer more than once).

SET isRunning to true.

SET timerInterval to a repeating task that calls the updateTimer() function every 1000 milliseconds (1 second).

```
### Function: stopTimer()
This function stops the stopwatch from running.
```
IF isRunning is false, THEN RETURN.

SET isRunning to false.

STOP the repeating task associated with timerInterval.
```
### Function: resetTimer()
This function stops the timer and resets the display to zero.

```
CALL the stopTimer() function.

SET seconds, minutes, and hours to 0.

UPDATE the stopwatch display to show "00:00:00".
```

### Function: updateTimer()
This function is called every second to handle the core timing logic.

```
INCREMENT seconds by 1.

IF seconds is greater than or equal to 60, THEN:

SET seconds to 0.

INCREMENT minutes by 1.

IF minutes is greater than or equal to 60, THEN:

SET minutes to 0.

INCREMENT hours by 1.

END IF

END IF

SET formattedSeconds by CALLING the formatTime() function with seconds as an argument.

SET formattedMinutes by CALLING the formatTime() function with minutes as an argument.

SET formattedHours by CALLING the formatTime() function with hours as an argument.

UPDATE the display with the values of formattedHours, formattedMinutes, and formattedSeconds.
```
### Function: formatTime(value)
This is a helper function that adds a leading zero to any number less than 10.
```
IF value is less than 10, THEN:

RETURN the string "0" concatenated with the value.

ELSE:

RETURN the value as a string.

END IF

```