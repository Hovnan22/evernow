import React, { useEffect, useState } from "react";
import {
  View, StyleSheet, Text,
} from "react-native";
import Svg, {
  Circle, Defs, LinearGradient, Path, Stop,
} from "react-native-svg";
import PropTypes from "prop-types";
import color from "../../styles/colors";


let timeoutInstance = false;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  timer: {
    width: 248,
    height: 248,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 36,
    lineHeight: 38,
    color: color.dark100
  },
});

function sec2time(timeInSeconds) {
  const pad = (num, size) => (`000${num}`).slice(size * -1);
  const time = parseFloat(timeInSeconds).toFixed(3);
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  return hours > 0
    ? `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`
    : `${pad(minutes, 2)}:${pad(seconds, 2)}`;
}

function Diagram(props) {
  const { size, borderWidth, percent } = props;
  const width = size - borderWidth;
  const round = (2 * Math.PI * (width / 2));
  const radius = round / (Math.PI * 2);
  const diameter = radius * 2;
  const progress = (round / 100) * percent;
  return <Path
    strokeLinecap="round"
    strokeDasharray={`${progress},${round}`}
    strokeLinejoin="round"
    d={`M${width / 2} ${(width - diameter) / 2} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 -${diameter}`}
    strokeWidth={borderWidth}
    stroke={"url(#paint1_linear)"}
    fill={"transparent"}
    transform={`translate(${borderWidth / 2}, ${borderWidth / 2})`}
  />;
}

export default function GaugeChart(props) {
  const {
    size, borderWidth, textSize, startTime, endTime, children,
    borderGradient, circleColor, circleGradient, started,
  } = props;
  const radius = size / 2;
  const [state, setState] = useState({
    time: startTime,
    percent: startTime < endTime ? 0 : 100,
  });
  useEffect(() => {
    setState({
      ...state,
      time: startTime,
    });
  }, [startTime]);
  useEffect(() => {
    setState({
      ...state,
      time: startTime,
      percent: startTime < endTime ? 0 : 100,
    });
    clearTimeout(timeoutInstance);
  }, [started]);
  if (state.time !== endTime && started === true) {
    clearTimeout(timeoutInstance);
    timeoutInstance = setTimeout(() => {
      if (started === true) {
        const time = startTime < endTime ? state.time + 1 : state.time - 1;
        setState({
          ...state,
          time,
          percent: startTime < endTime ? time / (endTime / 100) : time / (startTime / 100),
        });
      }
    }, 1000);
  }
  return <View style={styles.container}>
    <Svg width={size} height={size}>
      <Defs>
        <LinearGradient id="paint0_linear" x1="75.5" y1="49" x2="179.5" y2="255" gradientUnits="userSpaceOnUse">
          <Stop stopColor={circleGradient[0]} />
          <Stop offset="1" stopColor={circleGradient[1]} />
        </LinearGradient>
        <LinearGradient id="paint1_linear" x1="-126.331" y1="-31.2433" x2="-59.6271" y2="334.467" gradientUnits="userSpaceOnUse">
          <Stop stopColor={borderGradient[0]} />
          <Stop offset="1" stopColor={borderGradient[1]} />
        </LinearGradient>
      </Defs>
      <Circle cx={radius} cy={radius} r={radius} fill={circleColor} />
      <Diagram size={size} borderWidth={borderWidth} percent={state.percent} />
      <Circle cx={radius} cy={radius} r={radius - borderWidth} fill="url(#paint0_linear)" />
    </Svg>
    <View style={styles.timer}>
      {children}
      <Text style={[styles.timerText, { fontSize: textSize }]}>{sec2time(state.time)}</Text>
    </View>
  </View>;
}


GaugeChart.propTypes = {
  borderGradient: PropTypes.arrayOf(PropTypes.string),
  circleGradient: PropTypes.arrayOf(PropTypes.string),
  circleColor: PropTypes.string,
  size: PropTypes.number,
  borderWidth: PropTypes.number,
  textSize: PropTypes.number,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
};

GaugeChart.defaultProps = {
  borderGradient: ["#9AD1FF", "#3379C6"],
  circleGradient: ["#FFF", "#F2F5FC"],
  circleColor: "#F2F5FC",
};
