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
  LineChart
} from "react-native-chart-kit";

import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';

import WorldTable from './WorldTable';






const chartConfig1 = {
     fillShadowGradient: 'rgba(255,166,91,1)',
         fillShadowGradientOpacity: 0.5,
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 0) => `rgba(0, 0, 0, 0)`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 1,
            decimalPlaces: 0,
};

const chartConfig2 = {
     fillShadowGradient: 'rgba(38, 166, 91,1)',
         fillShadowGradientOpacity: 0.5,
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 0) => `rgba(0, 0, 0, 0)`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 1,
            decimalPlaces: 0,
};

const chartConfig3 = {
     fillShadowGradient: 'rgba(255,0,0,1)',
         fillShadowGradientOpacity: 0.5,
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 0) => `rgba(0, 0, 0, 0)`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 1,
            decimalPlaces: 0,
};

const screenWidth = Dimensions.get("window").width;

class WorldStats extends React.Component{

    state = {
        world: true,
        duration: 'weeks',
        weekDays: [],
        monthDays: [],
        weeksDays: [],
        confirmedData7: [],
        confirmedData30: [],
        confirmedData80: [],
        recoveredData7: [],
        recoveredData30: [],
        recoveredData80: [],
        deadData7: [],
        deadData30: [],
        deadData80: [],
    }

    componentDidMount(){
        let weekDays = []
        let weeksDays = []
        let monthDays = []
        let confirmedData7= []
        let confirmedData30= []
        let confirmedData80= []
        let recoveredData7= []
        let recoveredData30= []
        let recoveredData80= []
        let deadData7= []
        let deadData30= []
        let deadData80= []

        for(var i=1; i<80; i++)  {
            if(i < 8 ){
                weekDays.push(i);
                confirmedData7.push(this.props.worldData[i].confirmed);
                recoveredData7.push(this.props.worldData[i].recovered);
                deadData7.push(this.props.worldData[i].deaths);
            }
            if(i < 31){
                weeksDays.push(i);
                confirmedData30.push(this.props.worldData[i].confirmed);
                recoveredData30.push(this.props.worldData[i].recovered);
                deadData30.push(this.props.worldData[i].deaths);
            }
            confirmedData80.push(this.props.worldData[i].confirmed);
            recoveredData80.push(this.props.worldData[i].recovered);
            deadData80.push(this.props.worldData[i].deaths);
            monthDays.push(i);
        }

        this.setState({
            weekDays: weekDays,
            monthDays: monthDays,
            weeksDays: weeksDays,
            confirmedData7: confirmedData7.reverse(),
            confirmedData30: confirmedData30.reverse(),
            confirmedData80: confirmedData80.reverse(),
            recoveredData7: recoveredData7.reverse(),
            recoveredData30: recoveredData30.reverse(),
            recoveredData80: recoveredData80.reverse(),
            deadData7: deadData7.reverse(),
            deadData30: deadData30.reverse(),
            deadData80: deadData80.reverse(),
        })
        
    }

    changeData = (change) => {
        if(change == 'world'){
            this.setState({world: true})
            Orientation.lockToPortrait();
        } else if(change == 'close'){
            this.props.closeGlobe();
            Orientation.lockToPortrait();
        } else {
            this.setState({world: false})
            Orientation.lockToLandscape();
        }
    }

    nwc = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render(){
        
        const { 
            world, 
            weekDays, 
            weeksDays,
            monthDays, 
            confirmedData7, 
            confirmedData30, 
            confirmedData80, 
            recoveredData7, 
            recoveredData30, 
            recoveredData80,
            deadData7, 
            deadData30, 
            deadData80,
            duration 
        } = this.state
        const { countryData, worldData } = this.props 
        let updated = worldData[0].updated_at
        let deaths = worldData[0].deaths
        let confirmed = worldData[0].confirmed
        let recovered = worldData[0].recovered
        let active = worldData[0].active
        let todayConfirmed = worldData[0].new_confirmed
        let todayRecovered = worldData[0].new_recovered
        let todayDeaths = worldData[0].new_deaths

        let yconfirmed = worldData[1].confirmed
        let yrecovered = worldData[1].recovered
        let yactive = worldData[1].active
        let ydeaths = worldData[1].deaths
        let ytodayConfirmed = worldData[1].new_confirmed
        let ytodayRecovered = worldData[1].new_recovered
        let ytodayDeaths = worldData[1].new_deaths

        let gConfirmed1 = confirmed/yconfirmed - 1
        let gConfirmed2 = confirmed - yconfirmed

        let gRecovered1 = recovered/yrecovered - 1
        let gRecovered2 = recovered - yrecovered

        let gActive1 = active/yactive - 1
        let gActive2 = active - yactive

        let gDeath1 = deaths/ydeaths - 1
        let gDeath2 = deaths - ydeaths

        let confirmData33 = {}
        let recoverData33 = {}
        let deadData33 = {}


        switch(duration){
            case 'week':
                confirmData33 = {
                    labels: weekDays,
                    datasets: [
                        {
                        data: confirmedData7,
                        }
                    ],
                };
                recoverData33 = {
                    labels: weekDays,
                    datasets: [
                        {
                        data: recoveredData7,
                        }
                    ],
                };
                deadData33 = {
                    labels: weekDays,
                    datasets: [
                        {
                        data: deadData7,
                        }
                    ],
                };
                break;
            case 'month':
                confirmData33 = {
                    labels: monthDays,
                    datasets: [
                        {
                        data: confirmedData30,
                        }
                    ],
                };
                recoverData33 = {
                    labels: monthDays,
                    datasets: [
                        {
                        data: recoveredData30,
                        }
                    ],
                };
                 deadData33 = {
                    labels: monthDays,
                    datasets: [
                        {
                        data: deadData30,
                        }
                    ],
                };
                break;
            case 'weeks':
                confirmData33 = {
                    labels: weeksDays,
                    datasets: [
                        {
                        data: confirmedData80,
                        }
                    ],
                };
                recoverData33 = {
                    labels: weeksDays,
                    datasets: [
                        {
                        data: recoveredData80,
                        }
                    ],
                };
                 deadData33 = {
                    labels: weeksDays,
                    datasets: [
                        {
                        data: deadData80,
                        }
                    ],
                };
                break;
        }

        return (
            <>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center'}}>
                    <View>
                        <Icon name="globe" color='rgba(255,7,58,1)' size={28}/>
                    </View>
                    <View style={{backgroundColor: 'rgba(155,155,155,0.5)', flexDirection: 'row', borderRadius: 20}}>
                        <Icon name="sync" color="white" size={20} style={[world && {backgroundColor: 'rgba(255,7,58,1)'}, {paddingVertical: 10, borderRadius: 20, paddingHorizontal: 20}]} onPress={() => this.changeData('world')} />
                        <Icon name="server" color="white" size={20} style={[!world && {backgroundColor: 'rgba(255,7,58,1)'}, {paddingVertical: 10, borderRadius: 20, paddingHorizontal: 20}]} onPress={() => this.changeData('data')} /> 
                    </View>

                    <View>
                        <Icon name="times-circle" color='rgba(255,7,58,1)' size={28} onPress={() => this.changeData('close')}/>
                    </View>
                </View>
                <ScrollView>
                    {
                        world == true ?
                            <View>
                                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 10, marginBottom: 20}}>Covid World Stats</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20}}>
                                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255,166,91,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(confirmed)}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14, marginTop: 3}}>Confirmed</Text>
                                    </View>
                                     <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255,150,0,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(active)}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14, marginTop: 3}}>Active</Text>
                                    </View>
                                    
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(38, 166, 91,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(recovered)}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14, marginTop: 3}}>Recovered</Text>
                                    </View>
                                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255,0,0,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(deaths)}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14, marginTop: 3}}>Deaths</Text>
                                    </View>
                                   
                                </View>
                                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Daily Growth</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10}}>
                                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                                            <Text style={[Math.sign(gConfirmed2) == 1 ? {color: 'green'} : {color: 'red'} , {fontSize: 14, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10}]}>{(gConfirmed1*100).toFixed(2)}%</Text>
                                            <Icon name={Math.sign(gConfirmed2) == 1 ? 'arrow-up' : 'arrow-down' } color={Math.sign(gConfirmed2) == 1 ? 'green' : 'red' } />
                                        </View>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255,166,91,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(Math.abs(gConfirmed2))}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 12, marginTop: 3}}>Confirmed</Text>
                                    </View>

                                     <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                                            <Text style={[Math.sign(gActive2) == 1 ? {color: 'green'} : {color: 'red'} , {fontSize: 14, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10}]}>{(gActive1*100).toFixed(2)}%</Text>
                                            <Icon name={Math.sign(gActive2) == 1 ? 'arrow-up' : 'arrow-down' } color={Math.sign(gActive2) == 1 ? 'green' : 'red' } />
                                        </View>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255,150,0,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(Math.abs(gActive2))}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 12, marginTop: 3}}>Active</Text>
                                    </View>

                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10}}>
                                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                                            <Text style={[Math.sign(gRecovered2) == 1 ? {color: 'green'} : {color: 'red'} , {fontSize: 14, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10}]}>{(gRecovered1*100).toFixed(2)}%</Text>
                                            <Icon name={Math.sign(gRecovered2) == 1 ? 'arrow-up' : 'arrow-down' } color={Math.sign(gRecovered2) == 1 ? 'green' : 'red' } />
                                        </View>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(38, 166, 91,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(Math.abs(gRecovered2))}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 12, marginTop: 3}}>Recovered</Text>
                                    </View>
                                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                                            <Text style={[Math.sign(gDeath2) == 1 ? {color: 'green'} : {color: 'red'} , {fontSize: 14, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10}]}>{(gDeath1*100).toFixed(2)}%</Text>
                                            <Icon name={Math.sign(gDeath2) == 1 ? 'arrow-up' : 'arrow-down' } color={Math.sign(gDeath2) == 1 ? 'green' : 'red' } />
                                        </View>
                                        <Text style={{fontSize: 22, fontWeight: 'bold', backgroundColor: 'rgba(255,0,0,1)', color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}}>{this.nwc(Math.abs(gDeath2))}</Text>
                                        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 12, marginTop: 3}}>Deaths</Text>
                                    </View>

                                </View>
                                <View>
                                    <Text style={{fontSize: 12, textAlign: 'center', marginTop: 10}}>Updated: {new Date(updated).toLocaleTimeString()}</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                                    <Button title="Last 7 Days" containerStyle={{width: '28%'}} buttonStyle={[duration == 'week' ? {backgroundColor: '#eee'} : {backgroundColor: 'white'}]} titleStyle={{color: '#888'}} onPress={() => this.setState({duration: 'week'})} />
                                    <Button title="Last 30 Days" containerStyle={{width: '28%'}} buttonStyle={[duration == 'month' ? {backgroundColor: '#eee'} : {backgroundColor: 'white'}]} titleStyle={{color: '#888'}} onPress={() => this.setState({duration: 'month'})} />
                                    <Button title="10 Weeks" containerStyle={{width: '28%'}} buttonStyle={[duration == 'weeks' ? {backgroundColor: '#eee'} : {backgroundColor: 'white'}]} titleStyle={{color: '#888'}} onPress={() => this.setState({duration: 'weeks'})}/>
                                </View>
                                {
                                    recoveredData7.length != 0 ?
                                    <>
                                    <View style={{marginBottom: 20}}>
                                        <LineChart
                                            data={confirmData33}
                                            width={screenWidth-30}
                                            chartConfig={chartConfig1}
                                            bezier
                                            withDots={false}
                                            height={220}
                                            fromZero
                                            backgroundColor="#fff"
                                        />
                                        <Text style={{marginTop: -35, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#888'}}>Confirmed</Text>

                                    </View>
                                    <View style={{marginBottom: 20}}>
                                        <LineChart
                                            data={recoverData33}
                                            width={screenWidth-30}
                                            chartConfig={chartConfig2}
                                            bezier
                                            withDots={false}
                                            height={220}
                                            fromZero
                                            backgroundColor="#fff"
                                        />
                                        <Text style={{marginTop: -35, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#888'}}>Recovered</Text>

                                    </View>
                                    <View style={{marginBottom: 20}}>
                                        <LineChart
                                            data={deadData33}
                                            width={screenWidth-30}
                                            chartConfig={chartConfig3}
                                            bezier
                                            withDots={false}
                                            height={220}
                                            fromZero
                                            backgroundColor="#fff"
                                            
                                        />
                                        <Text style={{marginTop: -35, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#888'}}>Dead</Text>

                                    </View>
                                    </>
                                :
                                null
                                }
                                
                                
                            </View>
                            :
                            <View>
                                <WorldTable countryData={countryData}/>
                            </View>
                    }
                </ScrollView>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        countryData: state.settings.countryData,
        worldData: state.settings.worldData
    }
}

export default connect(mapStateToProps)(WorldStats) 


// // Sort based on objects
// var sort = function (prop, arr) {
//     arr.sort(function (a, b) {
//         if (a[prop] < b[prop]) {
//             return -1;
//         } else if (a[prop] > b[prop]) {
//             return 1;
//         } else {
//             return 0;
//         }
//     });
// };

// // Sort based on nested objects

// var sort = function (prop, arr) {
//     prop = prop.split('.');
//     var len = prop.length;

//     arr.sort(function (a, b) {
//         var i = 0;
//         while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
//         if (a < b) {
//             return -1;
//         } else if (a > b) {
//             return 1;
//         } else {
//             return 0;
//         }
//     });
//     return arr;
// };
