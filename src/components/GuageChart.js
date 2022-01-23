//Component to render guage chart
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const styles = {
    dial: {
        display: "inline-block",
        color: "#fff",
    },
    title: {
        fontSize: "1em",
        color: "#fff"
    }
};
//render method customSegmentStops - number of sections, maxValue - segmment max value
// value - value of chart
export const GuageChart = ({ customSegmentStops, value, maxValue }) => {
    return (
        <div style={styles.dial}>
            <ReactSpeedometer
                customSegmentStops={customSegmentStops}
                height={190}
                width={290}
                value={value}
                needleTransition="easeQuadIn"
                needleTransitionDuration={200}
                needleColor="red"
                maxValue={maxValue}
                segmentColors={[
                    "#00cc00",
                    "#1aff1a",
                    "#ffcc00",
                    "#ff471a",
                    '#ff0000',
                    "#b30000",
                ]}
                textColor={'#fff'}

            />
        </div>
    );
};

