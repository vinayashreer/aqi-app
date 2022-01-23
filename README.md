#### ABOUT PROJECT

Deployed site url - https://aqireq.web.app/

-------------------------------------------------------------------------------------------------------------------------------
  - This Is React App
    Plugins used 
        1 chart.js & react-chartjs-2 for charts (bar, line, Pie)
        2. react-d3-speedometer for dial chart
        3. material ui - for ready to use components 
        4. moment.js - to handle date format
-------------------------------------------------------------------------------------------------------------------------------

The src folder contains all pages
  - 1 homePage/HomePage.js is the main parent component which contains all the other components
        * here the websocket is called and data is sent to other components
        * calls AIQCard - to render air index data 
        * calls HistoryCard - to render histroy data of aiq
        * calls NavigBar - to render navigation bar
        * calls QuotesCard - to render hard coded quotes about atmosphere
        * calls BarChart, AreaChart - to render Bar, line, Pie chart
  - 2 homePage/AIQCard.js 
        * includes cards which contains air index value, 
         city and color standards fetched from given websocket connection.
        * onclick of city dialer chart of individual city is shown
        * websocket connection is made and data is for every 20secs and data visualization is updated
  - 3 homePage/HistoryCard
        * includes cards where historical aqi data of cities are shown
            - now showing maximum of 5 history
            - this history is stored in local storage of browser
        * onclick of each city previously stored data is shown in bar chart
  - 4 homePage/NavigBar.js
        * component for navigation bar is added
  - 5 homePage/QuotesCard.js
        * component renders hardcoded quotes for every 4sec, quotes about atmosphere (just to enhance ui)
  - 6 components/BarChart.js
        * component renders bar chart and line chart for given data
  - 7 components/AreaChart.js
        * component renders Pie chart for given data    
  - 8 components/GuageChart.js
        * component renders Speed dialer chart for given data    
  - 9 images/aiqEmoticons
        * contains svg for different emoticons, used to show good, satisfactory, moderate, poor, very poor, severe
            standards of air index value
  - 9 images/bgjpeg 
        * background image used in home page
  - 10 images/proximityLog
        * used in navigation bar
  - 10 lib/theme.js
        * generic colors which are used
-------------------------------------------------------------------------------------------------------------------------------
  - 11 I took 4-5 hours for developing navigation bar, quotes component, AIQCard, designing, repetitive checking of images 
        which will suit the UI. 
         I took 5-6 hours for developing, debugging, to work on history of graphical data, ui correnctions, websocket connection handling, trying out plugins, screen size handling, cache, loader, error handling, refactoring code and code structure, deployment, testing.
         I can say coding part will take less time, time consumes more on desiging, checking third party plugins, images etc
-------------------------------------------------------------------------------------------------------------------------------

The project can be cloned to react js environment
1. npm install
2. npm start
commands can be used to run the project locally