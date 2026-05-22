const WeighedAverageColorViz = ({avgStats}) => {
    return (<article>
        <h3>
                Weighted Average
            </h3>

            <p>Weighted Average Hue: {Math.round(avgStats.avgHue)}°</p>
            <p>Weighted Average Saturation: {Math.round(avgStats.avgSat)}</p>
    </article>)
}

export default WeighedAverageColorViz