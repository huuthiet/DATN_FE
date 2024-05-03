import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};
// ({ id, value, title })
const Speedometer =  props => {
  const {id, value, title} = props;


  // console.log("value speedmetter", value);
  // console.log("value speedmetter", id);
  // console.log("value speedmetter", title);
  return (
    <div style={styles.dial}>
      <ReactSpeedometer
        maxValue={20}
        minValue={0}
        height={190}
        width={290}
        value={value}
        needleTransition="easeQuadIn"
        needleTransitionDuration={1000}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="blue"
      />
      <div className="text-center" style={styles.title}>{title}</div>
    </div>
  );
};

export default Speedometer;
