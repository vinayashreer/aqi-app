//this page renders the all the components of home page, 
//websocket connect to get aqi data, bar, line, pie, guage chart
import * as React from 'react';
//material ui
import Box from '@mui/material/Box';
import { Toolbar, makeStyles, Typography } from "@material-ui/core";
import { Grid } from '@mui/material';
//moment
import moment from 'moment';
//custom
import NavigBar from './NavigBar';
import { themeColors } from '../lib/theme';
import AIQCard from './AIQCard';
import HistoryCard from './HistoryCard';
//images
import bg from '../images/bg.jpeg';
import QuotesCard from './QuotesCard';
//chart
import { BarChart } from '../components/BarChart';
import { PieArea } from '../components/Area';

const useStyles = makeStyles({
    mainBox: {
        width: '100%',
        display: "block",
        //minHeight: '100%',
        position: 'absolute',
    },
    backImg: {
        background: `url(${bg})`,
        width: '100%',
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        position: 'relative',
        //height: '100%',
        paddingBottom: 30,
    },
    mainCont: {
        padding: 10,
        minHeight: '100%',
    },
    chartBox: {
        backgroundColor: themeColors.white,
        width: '100%',
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        minHeight: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barChartBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        padding: 15,
        background: themeColors.orangeGradient,
    },
    barUpTime: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default function HomePage(props) {
    const theme = useStyles();
    //to set data rendered from websocket
    const [aiqMessage, setAIQMessage] = React.useState([]);
    //to reconnect websocket
    const [reconSock, setReconSocket] = React.useState(true);
    //to set chart data
    const [chartData, setChartData] = React.useState({ bar: {}, area: {} });
    //to set date, which is the date fetched from websoket recently
    const [recordDate, setRecordDate] = React.useState('');
    //history data
    const [historyData, setHisState] = React.useState({});
    //old aiq to show change is color in aiq card
    const [oldAIQ, setOldAIQ] = React.useState([]);
    //handle error if websocket fails
    const [err, setErr] = React.useState(false);

    //on rendered of page call websocket
    React.useEffect(() => {
        if (reconSock) {
            const ws = new WebSocket('wss://city-ws.herokuapp.com');
            ws.onopen = (event) => {
                //ws.send();
            };
            ws.onmessage = function (event) {
                const json = JSON.parse(event.data);
                try {
                    if (json && json.length) {
                        //set old data from local storage to show list of cities and bar chart by date wise
                        setOldAIQ(getLocalStrg('aqiListForDate'));
                        //set new data
                        setAIQMessage(json);
                        //set chart format data
                        const cD = setChartProps(json);
                        setChartData(cD);
                        //on success recon is not req
                        setReconSocket(false);
                        //set date as recent fethced data
                        let nowDate = moment().format("DD MMM YYYY hh:mm:ssA");
                        setRecordDate(nowDate);
                        setHistoryData(cD, nowDate);
                        //error is flase, since success
                        setErr(false);
                    } else {
                        setErr(true);
                    }
                } catch (err) {
                    setErr(true);
                }
            };
            ws.onerror = function () {
                setErr(true);
            }
            //clean up function
            return () => ws.close();
        }
    }, [reconSock]);

    //render the data from websocket for every 20secs
    React.useEffect(() => {
        if (reconSock === false) {
            setTimeout(() => {
                setReconSocket(true);
            }, 20000);
        }
    }, [reconSock]);
    
    //to store ito local storage for storing history of aqi messages (upto 5)
    const setLocalStrg = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    };

    //to get the items
    const getLocalStrg = (key) => {
        return JSON.parse(localStorage.getItem(key))
    };

    //set citites
    const setCities = (data) => {
        //set cities with key cities, this is used to list of cities while checking history
        let getCities = getLocalStrg('cities');
        //if storage is empty set data from first render
        if (!getCities || !getCities.length) {
            setLocalStrg('cities', data.cLabels);
            setHisState({ 'cities': data.cLabels });
        } else {
            //if cities are already stored in storage, set the storage with only new citites
            if (getCities.length < 12) {
                const diffCitites = data.cLabels.filter(x => !getCities.includes(x));
                getCities = getCities.concat(diffCitites)
                setLocalStrg('cities', getCities);
            }
            setHisState({ 'cities': getCities });
        }
    };

    //to set value of aqi and cities to local storage
    const setHistoryData = (data, date) => {
        setCities(data);
        //set graph data
        //check already stored 
        let getAqiMsg = getLocalStrg('aqiListForDate') || [];
        //if storage is more than 5 array elements remove the first
        //element
        if (getAqiMsg.length > 5) {
            //pop 0, push new to end
            getAqiMsg.shift();
        }
        //push the new elemet
        getAqiMsg.push({ date, data: data.cD, labels: data.cLabels, bg: data.cClrs });
        //store to local storage with key
        setLocalStrg('aqiListForDate', getAqiMsg);
    };

    //set the data format and values required to show line along with bar chart of rendered cities
    const setChartProps = (json) => {
        //data, labels, colors
        const cD = [], cLabels = [], cClrs = [];
        //loop throught the response
        json && json.map(a => {
            //set data
            cD.push(Math.round(a.aqi * 100) / 100);
            //set label
            cLabels.push(a.city);
            //set bg colors with standard values
            cClrs.push(a.aqi <= 50 ? themeColors.bgGood
                : a.aqi <= 100 ? themeColors.bgSatis :
                    a.aqi <= 200 ? themeColors.bgModerate :
                        a.aqi <= 300 ? themeColors.bgPoor : a.aqi <= 400 ?
                            themeColors.bgVeryPoor :
                            themeColors.bgSevere);
        });
        //return data req for bar and line chart
        return {
            bar: {
                labels: cLabels,
                datasets: [{
                    type: 'line',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false, data: cD
                }, {
                    type: 'bar',
                    backgroundColor: cClrs,
                    borderWidth: 2,
                    data: cD
                }]
            }, area: {
                labels: cLabels,
                datasets: [{
                    backgroundColor: cClrs,
                    borderWidth: 1,
                    data: cD
                }]
            }, cD, cLabels, cClrs
        };
    };


    return (
        <React.Fragment>
            <NavigBar />
            <Toolbar />
            <Box className={theme.mainBox}>
                <Box className={theme.backImg}>
                    <Grid container className={theme.mainCont}>
                        <QuotesCard />
                        <AIQCard aiqMessage={aiqMessage} upTime={recordDate}
                            oldAqi={oldAIQ}
                        />
                        {err ?
                            <Grid xs={12} md={12} sm={12} lg={12} container className={theme.barUpTime}>
                                <Typography gutterBottom variant="body1" component="Box" style={{ color: themeColors.black }}>
                                    Something Went Wrong!! Unable To Connect
                                </Typography>
                            </Grid> : <>
                            </>
                        }
                    </Grid>
                </Box>
                <Grid container className={theme.chartBox}>
                    <Grid xs={12} md={6} sm={12} lg={6} container className={theme.barUpTime}
                        border={5} borderColor={themeColors.white}>
                        <Box className={theme.boxGrid} style={{
                        }}>{recordDate ?
                            <Typography gutterBottom variant="body1" component="Box" style={{ color: themeColors.black }}>
                                Last Updated At : {recordDate}
                            </Typography> : <></>}
                        </Box>
                    </Grid>
                    <Box className={theme.boxGrid} style={{
                        padding: 4
                    }}>
                        <Typography gutterBottom variant="body1" component="Box"
                            style={{ color: themeColors.black, padding: 4 }}>
                            <span
                                style={{ color: themeColors.bgGood, height: 30, width: 30 }}>{'\u25A3'}</span>
                            0-50 : Good
                            <span style={{ color: themeColors.bgSatis, height: 30, width: 30 }}> {'\u25A3'}
                            </span> 51-100 : Satisfactory
                            <span style={{ color: themeColors.bgModerate, height: 30, width: 30 }}> {'\u25A3'}
                            </span>101-200 : Moderate
                            <span style={{ color: themeColors.bgPoor, height: 30, width: 30 }}>{'\u25A3'}
                            </span>201-300 : Poor
                            <span style={{ color: themeColors.bgVeryPoor, height: 30, width: 30 }}> {'\u25A3'}
                            </span>301-400 : Very Poor
                            <span style={{ color: themeColors.bgSevere, height: 30, width: 30 }}> {'\u25A3'}
                            </span>401-500 : Severe
                        </Typography>
                    </Box>
                    {chartData.bar.labels && chartData.bar.labels.length ?
                        <Grid xs={12} md={6} sm={12} lg={6} container className={theme.barChartBox}
                            border={5} borderColor={themeColors.white}>

                            <BarChart chartData={chartData.bar} />
                        </Grid> : <></>}
                    {chartData.area.labels && chartData.area.labels.length ?
                        <Grid xs={12} md={6} sm={12} lg={6}
                            container className={theme.barChartBox} border={5} borderColor={themeColors.white}>

                            <PieArea chartData={chartData.area} />
                        </Grid> : <></>}
                </Grid>
                {historyData.cities && historyData.cities.length ?
                    <Box className={theme.backImg}>
                        <Grid container style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h5" component="Box" style={{ color: themeColors.black }}>
                                History
                            </Typography>
                            <HistoryCard historyData={historyData} upTime={recordDate} />
                        </Grid>
                    </Box> : <></>}
            </Box>
        </React.Fragment >
    );
}
