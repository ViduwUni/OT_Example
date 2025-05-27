import React, { useState } from "react";

export default function OTOnlyCalculator() {
  const [shift, setShift] = useState("A");
  const [outTime, setOutTime] = useState("");
  const [otResult, setOtResult] = useState("");

  const handleCalculateOT = () => {
    if (!outTime) {
      setOtResult("Please enter out time.");
      return;
    }

    const parseTime = (timeStr) => {
      const [h, m] = timeStr.split(":").map(Number);
      return new Date(0, 0, 0, h, m);
    };

    const outT = parseTime(outTime);

    let shiftEnd;
    if (shift === "A") {
      shiftEnd = new Date(0, 0, 0, 15, 30); // 3:30 PM
    } else if (shift === "B") {
      shiftEnd = new Date(0, 0, 0, 17, 30); // 5:30 PM
    }

    if (outT <= shiftEnd) {
      setOtResult("No OT. Clock-out is within shift hours.");
    } else {
      const diffMs = outT - shiftEnd; // difference in miliseconds
      const otDecimalHours = (diffMs / (1000 * 60 * 60)).toFixed(2); // 1000ms , 60sec , 60min
      setOtResult(`OT Hours: ${otDecimalHours}`);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>OT Calculator</h2>

      <label>
        Shift:
        <select value={shift} onChange={(e) => setShift(e.target.value)}>
          <option value="A">Shift A (6:30 AM – 3:30 PM)</option>
          <option value="B">Shift B (8:30 AM – 5:30 PM)</option>
        </select>
      </label>

      <br /><br />

      <label>
        Out Time:
        <input
          type="time"
          value={outTime}
          onChange={(e) => setOutTime(e.target.value)}
        />
      </label>

      <br /><br />

      <button onClick={handleCalculateOT}>Calculate OT</button>

      <div style={{ marginTop: "20px" }}>{otResult}</div>
    </div>
  );
}