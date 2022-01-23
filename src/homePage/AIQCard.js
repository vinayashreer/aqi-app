//this component is to render aqi, city, type of standard for home page
import * as React from 'react';
//material ui
import Box from '@mui/material/Box';
import { makeStyles, Typography } from "@material-ui/core";
import { Button, Grid, CircularProgress } from '@mui/material';
//custom svg for showing emoticons to show different chart standard
import goodSVG from '../images/aiqEmoticons/good.svg';
import moderateSVG from '../images/aiqEmoticons/moderate.svg';
import satisfactorySVG from '../images/aiqEmoticons/satisfactory.svg';
import poorSVG from '../images/aiqEmoticons/poor.svg';
import verpoorSVG from '../images/aiqEmoticons/verypoor.svg';
import severeSVG from '../images/aiqEmoticons/severe.svg';
//render chart
import { GuageChart } from '../components/GuageChart';
//theme
import { themeColors } from '../lib/theme';

const useStyles = makeStyles({
    mainCont: {
        padding: 10,
        minHeight: '100%',
    },
    aiqCont: {
        paddingTop: 30,
        paddingLeft: 15,
    },
    eachAiqGrid: {
        backgroundColor: themeColors.opacityBg,
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
    }
});

export default function AIQCard(props) {
    const theme = useStyles();
    //state - onclick of city to show guage chart
    const [showGuage, setShowGuage] = React.useState(-1);
    //state for aqi Message data
    const [aiqMessage, setAIQMessage] = React.useState([]);
    //state for last fetched time from web socket shown along with dialer chart
    const [upTime, setUpTime] = React.useState([]);
    //state for showing last fetched data aqi
    const [oldaiq, setOldAIQ] = React.useState([]);

    React.useEffect(() => {
        //if dialer chart is not shown set following states on new props
        if (showGuage === -1) {
            setAIQMessage(props.aiqMessage);
            setUpTime(props.upTime)
            setOldAIQ(props.oldAqi)
        }
    }, [props, showGuage]);

    //set color, svg emoticon, label to differentiate aqi standards
    //for corresponding aqi
    const getSvgNdLabel = (d) => {
        const svgNdLabel = d.aqi <= 50 ? { svg: goodSVG, label: 'Good', bg: themeColors.bgGood } : d.aqi <= 100 ?
            { svg: satisfactorySVG, label: 'Satisfactory', bg: themeColors.bgSatis } :
            d.aqi <= 200 ? { svg: moderateSVG, label: 'Moderate', bg: themeColors.bgModerate } :
                d.aqi <= 300 ? { svg: poorSVG, label: 'Poor', bg: themeColors.bgPoor }
                    : d.aqi <= 400 ? { svg: verpoorSVG, label: 'Very Poor', bg: themeColors.bgVeryPoor } :
                        { svg: severeSVG, label: 'Severe', bg: themeColors.bgSevere };
        return svgNdLabel;
    };

    //to show city changed from old standard to new standard color of old and new fetch
    //for corresponding city
    const getOldAIQVal = (d) => {
        if (oldaiq && oldaiq.length) {
            //reverse the stored array to get recent data with corresponding city
            let o = oldaiq.reverse().find(city => {
                return city.labels.find(c => c === d.city);
            });
            if (o) {
                //find the data of corresponding city
                const ind = o.labels.findIndex(c => c === d.city);
                if (ind >= 0) {
                    return { date: o.date, data: o.data[ind], bg: o.bg[ind] };
                }
            } else {
                return {}
            }
        }
    };

    //inverse show dialer chart and close it
    const setShowGuageChart = (d) => {
        d ? setShowGuage(d) : setShowGuage(-1);
    };

    return (
        <React.Fragment>
            <Grid container xs={12} md={9} sm={12} lg={9} className={theme.aiqCont}>
                {!aiqMessage || !aiqMessage.length ? <Grid container
                    className={theme.boxGrid}>
                    <CircularProgress color="secondary" />
                </Grid> : <></>}
                {showGuage === -1 ? aiqMessage && aiqMessage.map((d, i) => {
                    if (d && d.aqi) d.aqi = Math.round(d.aqi * 100) / 100;
                    const svg = getSvgNdLabel(d);
                    const oldD = getOldAIQVal(d);
                    return <Grid container item xs={12} md={4} sm={6} lg={4} className={theme.eachAiqGrid} border={2}
                        borderColor={themeColors.orange} key={i} align="center">
                        <Grid xs={12} md={12} sm={12} lg={12} justify="center" alignItems="center">
                            <Box className={theme.boxGrid}>
                                <Box className={theme.boxGrid} style={{ margin: 0, marginRight: 5 }} >
                                    <Typography gutterBottom variant="h6" component="Box" style={{ color: themeColors.white }}
                                        noWrap>
                                        {svg.label}
                                    </Typography>
                                </Box>
                                <img src={svg.svg} className='iconChat' alt="Icon chat" height={55} width={55} />
                                <Box className={theme.boxGrid} style={{ backgroundColor: svg.bg, margin: 0, marginLeft: 5 }}>
                                    <Typography gutterBottom variant="h6" component="Box" style={{ color: themeColors.black }}
                                        noWrap>
                                        {d.aqi}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={theme.boxGrid} style={{ backgroundColor: themeColors.black }}>
                                <Button variant="h6" color="text.secondary" style={{
                                    color: themeColors.white,
                                }}
                                    noWrap onClick={() => setShowGuageChart({ ...d, ...svg })}>
                                    {d.city} &#10141;
                                </Button>
                            </Box>
                            <Box className={theme.boxGrid} style={{ margin: 0, marginLeft: 5 }}>
                                <Typography gutterBottom variant="subtitle1" component="Box"
                                    style={{ color: oldD && oldD.bg ? oldD.bg : themeColors.opacityBg }}
                                    noWrap>
                                    {oldD && oldD.data ? oldD.data : '  '}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" component="Box"
                                    style={{ color: oldD && oldD.bg ? oldD.bg : themeColors.opacityBg }}
                                    noWrap>
                                    {oldD && oldD.date ? ' @ ' + oldD.date : ' - '}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                }) :
                    <Grid item xs={12} md={12} sm={12} lg={12}
                        className={theme.eachAiqGrid} border={2}
                        borderColor={themeColors.orange}>
                        <Box className={theme.boxGrid}>
                            <img src={showGuage.svg} className='iconChat' alt="Icon chat" height={80} width={80} />
                        </Box>
                        <Box className={theme.boxGrid}>
                            <GuageChart
                                value={showGuage.aqi}
                                customSegmentStops={[0, 50, 100, 200, 300, 400, 500]}
                                maxValue={500}
                            />
                        </Box>
                        <Box className={theme.boxGrid} style={{ margin: 0, marginRight: 5 }} >
                            <Typography gutterBottom variant="h6" component="Box" style={{ color: themeColors.white }}
                                noWrap>
                                {showGuage.label} @ {upTime}
                            </Typography>
                        </Box>
                        <Box className={theme.boxGrid} style={{
                        }}>
                            <Button gutterBottom variant="h6" component="Box" style={{
                                color: themeColors.black1, width: '50%',
                                backgroundColor: showGuage.bg,
                            }}
                                noWrap onClick={() => setShowGuageChart(-1)}>
                                &#10229; {showGuage.city}
                            </Button>
                        </Box>

                    </Grid>}
            </Grid>
        </React.Fragment >
    );
}
