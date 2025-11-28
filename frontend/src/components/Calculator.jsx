import React, { useState } from "react";

const Calculator = () => {
  const [value, setValue] = useState("");

  const handleClick = (input) => {
    setValue(prev => prev + input);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleEqual = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(value);
      setValue(result.toString());
    } catch (error) {
      setValue("Error");
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={value}
        readOnly
        style={styles.display}
      />

      <div style={styles.grid}>
        {["7","8","9","/",
          "4","5","6","*",
          "1","2","3","-",
          "0",".","C","+"].map((btn) => (
          <button
            key={btn}
            style={styles.button}
            onClick={() => (btn === "C" ? handleClear() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
      </div>

      <button style={styles.equalButton} onClick={handleEqual}>=</button>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  },
  display: {
    width: "100%",
    height: "45px",
    marginBottom: "12px",
    padding: "5px 10px",
    fontSize: "20px",
    textAlign: "right",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  button: {
    padding: "12px",
    background: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
  },
  equalButton: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default Calculator;
