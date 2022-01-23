//this component renders already loaded cities to check old data and standards using bar 
//chart from local storage (upto 5 last loaded data)
import * as React from 'react';
//material ui
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/core";
import { Button, Grid } from '@mui/material';
//custom
import { BarChart } from '../components/BarChart';
//theme
import { themeColors } from '../lib/theme';

const useStyles = makeStyles({
    mainCont: {
        padding: 10,
        minHeight: '100%',
    },
    aiqCont: {
        paddingLeft: 15,
    },
    eachAiqGrid: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: 1,
        borderWidth: 3,
        borderColor: themeColors.black
    },
    boxGrid: {
        display: 'flex',
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barGData: {
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default function HistoryCard(props) {
    const theme = useStyles();
    //to inverse show bar chart and to show cities of history which is shared in local storage
    const [showBarChart, setBarChart] = React.useState(-1);
    //to show list of cities
    const [historyCities, setHistoryCitites] = React.useState([]);

    //set cities data from props if not bar chart view is selected
    React.useEffect(() => {
        if (showBarChart === -1) {
            setHistoryCitites(props.historyData.cities);
        }
    }, [props && props.historyData.cities, showBarChart]);

    //get data from local storage to show bar chart history data for selected city
    const getLocalStrg = (key) => {
        return JSON.parse(localStorage.getItem(key))
    };

    //prepare data required to render bar chart for selected city
    const setBarDataChart = (d) => {
        if (d) {
            let dates = [];
            let data = [];
            let bg = [];
            //get data from local storage to show bar chart history data for selected city
            const list = getLocalStrg('aqiListForDate');
            //find the corresponding data
            list.map(city => {
                const ind = city.labels.indexOf(d);
                if (ind >= 0) {
                    dates.push(city.date)
                    data.push(city.data[ind])
                    bg.push(city.bg[ind])
                }
            });
            //set the chart data req to render bar chart
            setBarChart({
                city: d,
                labels: dates,
                datasets: [{
                    type: 'bar',
                    backgroundColor: bg,
                    borderWidth: 2,
                    data: data
                }, {
                    type: 'line',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                    data: data
                }]
            });
        }
    };

    return (
        <React.Fragment>
            <Grid container xs={12} md={12} sm={12} lg={12} className={theme.aiqCont}>
                {showBarChart === -1 ? historyCities.length && historyCities.map((d, i) => {
                    return <Grid container item xs={12} md={4} sm={6} lg={4} className={theme.eachAiqGrid}
                        key={i} align="center">
                        <Grid xs={12} md={12} sm={12} lg={12} justify="center" alignItems="center"
                            paddingRight={5} paddingLeft={5}>
                            <Box className={theme.boxGrid} style={{ backgroundColor: themeColors.black }}>
                                <Button variant="h6" color="text.secondary" style={{
                                    color: themeColors.white
                                }}
                                    noWrap onClick={() => setBarDataChart(d)}>
                                    {d} &#10141;
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                }) :
                    <>
                        <Grid container style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="h6" component="Box" style={{
                                color: themeColors.white,
                                backgroundColor: themeColors.black1,
                                marginTop:10,
                            }} onClick={() => setBarChart(-1)} noWrap>
                                &#10229; {showBarChart.city}
                            </Button>
                        </Grid>
                        <Grid container
                            className={theme.barGData} >
                            <Grid xs={12} md={4} sm={12} lg={4} item justify="center" alignItems="center"
                                className={theme.barGData}>
                                <BarChart chartData={showBarChart} />
                            </Grid>
                        </Grid>
                    </>}
            </Grid>
        </React.Fragment >
    );
}
