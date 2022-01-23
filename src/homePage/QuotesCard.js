//this component renders card element which contains some random static quotes on atmosphere
//and air index quality
import * as React from 'react';
//material ui
import { makeStyles, Typography } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
//custom 
import { themeColors } from '../lib/theme';

const useStyles = makeStyles({
    newsCard: {
        flexDirection: 'column',
        height: '20vh',
        marginLeft: 5,
    },
    newsCard2: { marginTop: 10 },
    cardContent: {
        backgroundColor: themeColors.opacityBGInverse,
    },
    mainCont: {
        padding: 10,
        minHeight: '100%',
    },
    quotesCont: {
        paddingTop: 30,
        padding: 10
    },
});
//random content to show
const content = [{
    say: 'Pablo Neruda, 100 Love Sonnets',
    quote: `“Green was the silence, wet was the light, the month of June trembled like a butterfly.”`
}, {
    say: 'Henry David Thoreau',
    quote: `“Better to have your head in the clouds, and know where you are... 
        than to breathe the clearer atmosphere below them, and think that you are in paradise.”`
}, {
    say: 'E.M. Forster, Howards End',
    quote: `“House was very quiet, and the fog—we are in November now—pressed against the windows 
    like an excluded ghost.”`
}, {
    say: 'Rembrandt Harmenszoon Van Rijn',
    quote: `“Without atmosphere a painting is nothing.”`
}];

export default function QuotesCard() {
    const theme = useStyles();
    //set index for both the cards, first card starts from zero, second from nth element
    const [cardContentInd, setCardContent1] = React.useState({ ind1: 0, ind2: content.length - 1 });

    React.useEffect(() => {
        //change to next index on every 4secs
        setTimeout(() => {
            const ind = {
                ind1: cardContentInd.ind1 === content.length - 1 ? 0 : cardContentInd.ind1 + 1,
                ind2: cardContentInd.ind2 === 0 ? content.length - 1 : cardContentInd.ind2 - 1
            }
            setCardContent1(ind);
        }, 4000);
    }, [cardContentInd])

    return (
        <React.Fragment>
            <Grid xs={12} md={3} sm={12} lg={3} className={theme.quotesCont}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Typography gutterBottom variant="h5" component="div"
                        className={theme.typoHeader}>
                        Explore The Air Quality Index of Cities
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Card className={theme.newsCard}>
                        <CardContent className={theme.cardContent}>
                            <Typography gutterBottom variant="h5" component="Box">
                                {content[cardContentInd.ind1].say}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {content[cardContentInd.ind1].quote}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Card className={[theme.newsCard, theme.newsCard2]}>
                        <CardContent className={theme.cardContent}>
                            <Typography gutterBottom variant="h5" component="div">
                                {content[cardContentInd.ind2].say}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {content[cardContentInd.ind2].quote}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
