import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ListItem, Button } from 'react-native-elements';
import {
  PieChart,
  StackedBarChart,
  LineChart
} from "react-native-chart-kit";

import Tooltip from './ToolTip';
import {countryCode} from './utils/countryCode';

import {connect} from 'react-redux';
import { cityBookmark, countryBookmark, rmCityBookmark, rmCountryBookmark } from '../store/actions/index';
import { ToggleCountryStat } from './components/ToggleCountryStat';
 
import moment from 'moment';

const chartConfig = {
    fillShadowGradient: '#ff073a',
    fillShadowGradientOpacity: 0.5,
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    decimalPlaces: 0,
};

const chartConfig3 = {
    fillShadowGradient: "rgba(255,166,91,1)",
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0,
    strokeWidth: 2, 
    barPercentage: 0.5,
    color: (opacity = 1) => `rgba(49, 49, 49, ${opacity})`,
};

const screenWidth = Dimensions.get("window").width;

class ToggleDetails extends React.Component {
    state = {
        stat: 'Summary',
        tooltipX: null,
        tooltipY: null,
        tooltipIndex: null,
    }

    showStat = (type) => {
        this.setState({stat: type})
    }

    nwc = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    render(){

        const { tooltipX, tooltipY, tooltipIndex, stat } = this.state;
        const { 
            selected, 
            cityBookmark, 
            countryBookmark, 
            onCityBookmark, 
            onCountryBookmark, 
            bookmarkedSnack, 
            countryCity, 
            onRmCityBookmark, 
            onRmCountryBookmark,
            worldData1,
            worldData2,
        } = this.props;

        // Map Selected
        const recovered = selected.recovered == null ? 0 : selected.recovered
        const dead = selected.dead == null ? 0 : selected.dead
        const confirmed = selected.confirmed == null ? 0 : selected.confirmed
        const uncertain = confirmed - dead - recovered
        const updated = selected.updated
        const location = selected.location
        const lat = selected.lat
        const lon = selected.lon
        const population = selected.population 

        const todayDead = selected.todayDeaths
        const todayConfirmed = selected.todayConfirmed

        const critical = selected.critical
        const calculated = selected.calculated


        let worldDataToday = worldData1.countries[countryCode[selected.code]] || 0 

        let tNewConf = worldDataToday.today_new_confirmed || 0;
        let tNewDead = worldDataToday.today_new_deaths || 0;
        let tNewOpen = worldDataToday.today_new_open_cases || 0;
        let tNewRecovered = worldDataToday.today_new_recovered || 0;

        // Today 
        let todayNewConf = Math.abs(tNewConf)
        let todayNewDead = Math.abs(tNewDead)
        let todayNewOpen = Math.abs(tNewOpen)
        let todayNewRecovered = Math.abs(tNewRecovered)
        // Identify if growth positive or negative 
        let todayGConf = 0, growth = 1, growth1 = 1, growth2 = 1, growth3 = 1, growth4 = 1, growth5 = 1, growth6 = 1
        if((worldDataToday.today_vs_yesterday_confirmed) > 0){
            todayGConf = 1; 
            growth += worldDataToday.today_vs_yesterday_confirmed
            growth1 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth2 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth3 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth4 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth5 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth6 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
        } 
        if((worldDataToday.today_vs_yesterday_confirmed) < 0){
            growth += worldDataToday.today_vs_yesterday_confirmed
            growth1 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth2 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth3 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth4 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth5 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
            growth6 += (worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed + worldDataToday.today_vs_yesterday_confirmed)
        }
        let todayGDead = 0
        if((worldDataToday.today_vs_yesterday_deaths) > 0) todayGDead = 1
        let todayGOpen = 0
        if((worldDataToday.today_vs_yesterday_open_cases) > 0) todayGOpen = 1
        let todayGRecovered = 0
        if((worldDataToday.today_vs_yesterday_recovered) > 0) todayGRecovered = 1


        const data = [
            {
                name: "Active",
                population: uncertain,
                color: "rgba(255,140,0,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            },
            {
                name: "Recovered",
                population: recovered,
                color:"rgba(38, 166, 91,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            },
            {
                name: "Dead",
                population: dead,
                color: "rgba(255,0,0,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            }
        ];

        
        const dataCountry = [
            {
                name: "Active",
                population: uncertain,
                color: "rgba(255,166,91,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            },
            {
                name: "Recovered",
                population: recovered,
                color:"rgba(38, 166, 91,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            },
            {
                name: "Critical",
                population: critical,
                color: "rgba(255, 100, 0,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            },
            {
                name: "Dead",
                population: dead,
                color: "rgba(255,0,0,1)",
                legendFontColor: "#000F",
                legendFontSize: 15
            }
        ];

        //TODO: Create reliable predictive algorithm

        const data5 = {
            labels: ["Today", "Tmr.", "+1", "+2", "+3", "+4", "+5"],
            datasets: [
                {
                data: [
                    confirmed,Math.floor(confirmed*growth),Math.floor(confirmed*(growth1)),Math.floor(confirmed*(growth2)),Math.floor(confirmed*(growth3)),Math.floor(confirmed*(growth4)),Math.floor(confirmed*(growth5))
                ]
                }
            ]
            };

        const data1 = {
            labels: ["Today", "Tmw.","Tmw.+1", "Tmw.+2"],
            legend: ["Dead", "Recovered", "Active"],
            data: [[Math.floor(dead), Math.floor(recovered), Math.floor(uncertain)], [Math.floor(dead*1.08), Math.floor(recovered*1.08), Math.floor(uncertain*1.08)],[Math.floor(dead*1.17), Math.floor(recovered*1.17), Math.floor(uncertain*1.17)],[Math.floor(dead*1.25), Math.floor(recovered*1.25), Math.floor(uncertain*1.25)]],
            barColors: ["rgba(255,0,0,1)", "rgba(38, 166, 91,1)", "rgba(255,166,91,1)"]
        };

        const data1country = {
            labels: ["Today", "Tmw.","Tmw.+1", "Tmw.+2"],
            legend: ["Dead", "Recovered", "Critical", "Active"],
            data: [[Math.floor(dead), Math.floor(recovered), Math.floor(critical), Math.floor(uncertain)], [Math.floor(dead*1.08), Math.floor(recovered*1.08),Math.floor(critical*1.08), Math.floor(uncertain*1.08)],[Math.floor(dead*1.17), Math.floor(recovered*1.17),Math.floor(critical*1.17), Math.floor(uncertain*1.17)],[Math.floor(dead*1.25), Math.floor(recovered*1.25),Math.floor(critical*1.25), Math.floor(uncertain*1.25)]],
            barColors: ["rgba(255,0,0,1)", "rgba(38, 166, 91,1)","rgba(255, 100, 0,1)" ,"rgba(255,166,91,1)"]
        };


        let cityBookmarked = cityBookmark.find(title => {
            return title.title == location
        });

        let countryBookmarked = countryBookmark.find(title => {
            return title.title == location
        });

        
        return (
            <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%', paddingBottom: 15}}>
                <TouchableOpacity 
                    onPress={() => this.props.toggleDetails(location, dead, confirmed, recovered, updated, lat,lon, true, selected.code)}
                    style={{position: 'absolute', top: 0, overflow: 'visible', display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}
                >
                    <View 
                        style={{height: 6, width: 120, backgroundColor: 'white',borderRadius: 20}}
                    />
                </TouchableOpacity>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 15}}>
                    <Text style={{color:'#555', fontSize: 20, fontWeight: 'bold'}}>{stat === 'Summary' ? location : stat}</Text>
                    {
                        countryCity === 'country' &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#555', fontWeight: 'bold', fontSize: 12, marginRight: 3}}>Population: </Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold', borderRadius: 20, backgroundColor: 'rgba(150,150,150,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10}}>{population == null ? 0 : this.nwc(population)}</Text>
                        </View>
                    }
                </View>     
                <View>                                                                      
                    { stat === 'Summary' && 
                        <View>
                        {
                            countryCity == 'country' ? 
                                <View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 0, justifyContent: 'space-around'}}>
                                        <ToggleCountryStat 
                                            title="Confirmed"
                                            color="rgba(255,166,91,1)"
                                            cases={todayGConf}
                                            caseType={confirmed}
                                            caseNum={this.nwc(confirmed + todayNewConf)}
                                            caseNew={todayNewConf}
                                        />
                                        <ToggleCountryStat 
                                            title="Recovered"
                                            color="rgba(38, 166, 91,1)"
                                            cases={todayGRecovered}
                                            caseType={recovered}
                                            caseNum={this.nwc(recovered + todayNewRecovered)}
                                            caseNew={todayNewRecovered}
                                        />
                                        <ToggleCountryStat 
                                            title="Critical"
                                            color="rgba(255,100,0,1)"
                                            cases={todayGOpen}
                                            caseType={critical}
                                            caseNum={this.nwc(critical + todayNewOpen)}
                                            caseNew={todayNewOpen}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 25, justifyContent: 'space-around'}}>
                                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{color: '#666', fontWeight: 'bold', fontSize: 20, marginRight: 10}}>Dead</Text>
                                                <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255, 0, 0,1)', marginRight: 10 , color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5, overflow: 'hidden'}}>{dead == null ? 0 : this.nwc(dead + todayNewDead)}</Text>
                                                <View style={todayGDead === 1 ? {display: 'flex', flexDirection: 'row', alignItems: 'center', borderColor: 'red', borderWidth: 2, borderRadius: 5, overflow: 'hidden'} : {display: 'flex', flexDirection: 'row', alignItems: 'center', borderColor: 'green', borderWidth: 2, borderRadius: 5, overflow: 'hidden'}}>
                                                    { 
                                                        todayGDead === 1 ?
                                                        <Icon style={{padding: 3}} name='arrow-up' color='red' size={17} />
                                                        :
                                                        <Icon style={{padding: 3}} name='arrow-down' color='green' size={17} />
                                                    }
                                                    <Text style={todayGDead === 1 ? {backgroundColor: 'red', color: 'white', paddingVertical: 3, paddingHorizontal: 3, fontWeight: 'bold'} : {backgroundColor: 'green', color: 'white', paddingVertical: 3, paddingHorizontal: 3, fontWeight: 'bold'}}>{todayNewDead}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                                            <Text style={{fontSize: 12, marginRight: 5}}>Last Update:</Text>
                                            <Text style={{fontSize: 12, fontWeight: 'bold' ,marginBottom: 0}}>{moment(updated).fromNow()}</Text>
                                        </View>                  
                                    </View>
                                </View>
                         :
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between', paddingHorizontal: 40}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon size={28} color="#333" name="clipboard-list" style={{marginRight: 12}}/>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 24}}>Confirmed</Text>
                                    </View>
                                    <Text style={{fontSize: 24, fontWeight: 'bold', backgroundColor: 'rgba(255,166,91,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{confirmed == null ? 0 : confirmed}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between', paddingHorizontal: 40}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon size={24} color="#333" name="clipboard-check" style={{marginRight: 15}}/>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 20}}>Recovered</Text>
                                    </View>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', backgroundColor: 'rgba(38, 166, 91,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{recovered == null ? 0 : recovered}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between', paddingHorizontal: 40}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon size={20} color="#333" name="book-dead" style={{marginRight: 15}}/>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 20}}>Dead</Text>
                                    </View>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', backgroundColor: 'rgba(255,0,0,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{dead == null ? 0 : dead}</Text>
                                </View>
                                <View>
                                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                                        <Text style={{marginRight: 5}}>Last Update:</Text>
                                        <Text style={{fontSize: 14, fontWeight: 'bold' ,marginBottom: 0}}>{moment(updated).fromNow()}</Text>
                                    </View>                  
                                </View>
                            </View>
                        }
                        </View>
                    }
                    { stat === 'Cases' && 
                        <View style={{marginTop: -10}}>
                            <PieChart
                                data={countryCity =='country' ? dataCountry : data}
                                width={screenWidth-30}
                                height={200}
                                chartConfig={chartConfig}
                                accessor="population"
                                backgroundColor="transparent"
                                paddingLeft="10"
                            />
                        </View>
                    }
                    { stat === 'Projection' && 
                        <View style={{marginTop: -10, alignItems: 'center'}}>
                            <LineChart 
                                data={data5} 
                                width={screenWidth} 
                                bezier
                                height={200}
                                // fromZero
                                chartConfig={chartConfig3} 
                                withDots={false}
                            />
                        </View>
                    }
                </View>
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 50}}> 
                    <Icon name="clipboard-list" color={stat == 'Summary'? '#ff073a' : '#999'} size={28} onPress={() => this.showStat('Summary')} />
                    <Icon name="chart-pie" color={stat == 'Cases'? '#ff073a' : '#999'} size={28} onPress={() => this.showStat('Cases')} />
                    <Icon name="chart-line" color={stat == 'Projection'? '#ff073a' : '#999'} size={32} onPress={() => this.showStat('Projection')} />
                    {
                         countryCity == 'country' ? 
                         <View>
                            {
                                countryBookmarked ? 
                                    <Icon name="bookmark"  color='#ff073a' size={26} onPress={() => {onRmCountryBookmark(location); bookmarkedSnack(false)}} />
                                :
                                    <Icon name="bookmark" color='#888' size={26} onPress={() => {onCountryBookmark(location, lat, lon); bookmarkedSnack(true)}} />
                            }
                        </View>
                        :
                        <View>
                            {
                                cityBookmarked ? 
                                    <Icon name="bookmark" color='#ff073a' size={26} onPress={() => {onRmCityBookmark(location); bookmarkedSnack(false)}} />
                                :
                                    <Icon name="bookmark" color='#888' size={26} onPress={() => {onCityBookmark(location, lat, lon); bookmarkedSnack(true)}} />
                            }
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        countryCity: state.settings.countryCity,
        cityBookmark: state.bookmarks.cityBookmark,
        countryBookmark: state.bookmarks.countryBookmark,
        worldData1: state.settings.worldData1,
        worldData2: state.settings.worldData2,
        // worldData3: state.settings.worldData3,
        // worldData4: state.settings.worldData4,
        // worldData5: state.settings.worldData5,
        // worldData30: state.settings.worldData30,
        // worldData70: state.settings.worldData70,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCityBookmark: (title,lat,lon) => dispatch(cityBookmark(title,lat,lon)),
        onCountryBookmark: (title,lat,lon) => dispatch(countryBookmark(title,lat,lon)),
        onRmCityBookmark: (title) => dispatch(rmCityBookmark(title)),
        onRmCountryBookmark: (title) => dispatch(rmCountryBookmark(title)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleDetails) 