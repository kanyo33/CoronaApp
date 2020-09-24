import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { DataTable } from 'react-native-paper';

class WorldTable extends React.PureComponent{

    state = {
        orderData: [],
        indicator: 'latest_data.confirmed'
    }

    componentDidMount(){
        let confirmedOrder = this.props.countryData.sort(function (a, b) {
                    if (a.latest_data.confirmed > b.latest_data.confirmed) {
                        return -1;
                    } else if (a.latest_data.confirmed < b.latest_data.confirmed) {
                        return 1;
                    } else {
                        return 0;
                    }
        });
        this.setState({orderData: confirmedOrder})
    }

    changeData = (data) => {
        let firstPar = data.split(".")[0]
        let secondPar = data.split(".")[1]
        let thirdPar = data.split(".")[2]

       let confirmedOrder = this.props.countryData.sort(function (a, b) {
           let x;
           let y;

           if(secondPar !== undefined && thirdPar !== undefined){
               x = a[firstPar][secondPar][thirdPar]
               y = b[firstPar][secondPar][thirdPar]
           } else if (secondPar !== undefined){
               x = a[firstPar][secondPar]
               y = b[firstPar][secondPar]
           } else {
               x = a[firstPar]
               y = b[firstPar]
           }
            if (x > y) {
                return -1;
            } else if (x < y) {
                return 1;
            } else {
                return 0;
            }
        });
        this.setState({orderData: confirmedOrder})
        this.setState({indicator: data})
    }

    nwc = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render(){

        const { countryData } = this.props
        const { indicator } = this.state

        return(
            <ScrollView horizontal>
                <DataTable style={{width: 1300}}>
                    <DataTable.Header>
                        <DataTable.Title style={{paddingRight: 20}}>Country</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.confirmed')} sortDirection={indicator == 'latest_data.confirmed' && 'descending'}  style={{ paddingRight: 20}} numeric>Confirmed</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.recovered')} sortDirection={indicator == 'latest_data.recovered' && 'descending'} numeric style={{ paddingRight: 20}}>Recovered</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.deaths')} sortDirection={indicator == 'latest_data.deaths' && 'descending'} numeric style={{ paddingRight: 20}}>Deaths</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.critical')} sortDirection={indicator == 'latest_data.critical' && 'descending'} numeric style={{ paddingRight: 20}}>Critical</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('today.confirmed')} sortDirection={indicator == 'today.confirmed' && 'descending'} numeric style={{ paddingRight: 20}}>Today Confirmed</DataTable.Title>
                        <DataTable.Title numeric onPress={() => this.changeData('today.deaths')} sortDirection={indicator == 'today.deaths' && 'descending'} style={{ paddingRight: 20}}>Today Deaths</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.calculated.death_rate')} sortDirection={indicator == 'latest_data.calculated.death_rate' && 'descending'} numeric style={{ paddingRight: 20}}>Death Rate</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.calculated.recovery_rate')} sortDirection={indicator == 'latest_data.calculated.recovery_rate' && 'descending'} numeric style={{ paddingRight: 20}}>Recovery Rate</DataTable.Title>
                        <DataTable.Title onPress={() => this.changeData('latest_data.calculated.cases_per_million_population')} sortDirection={indicator == 'latest_data.calculated.cases_per_million_population' && 'descending'} numeric style={{ paddingRight: 20}}>Cases Per Mil.</DataTable.Title>
                    </DataTable.Header>
                        {
                            this.orderData != 0 && 
                                <FlatList
                                    data={this.state.orderData}
                                    extraData={this.state}
                                    initialNumToRender={5}
                                    maxToRenderPerBatch={10}
                                    windowSize={10}
                                    renderItem={({item}) => (
                                        <DataTable.Row>
                                            <DataTable.Cell style={{paddingRight: 20}}>{item.name}</DataTable.Cell>
                                            <DataTable.Cell numeric style={[item.latest_data.confirmed != 0 ? { backgroundColor: 'rgba(255,166,91,1)'} : {backgroundColor: 'white'}, {paddingRight: 20}]}><Text style={[item.latest_data.confirmed != 0 ? {color: 'white'} : {}, {fontWeight: 'bold'}]}>{this.nwc(item.latest_data.confirmed)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={[item.latest_data.recovered != 0 ? { backgroundColor: 'rgba(38, 166, 91,1)'} : {backgroundColor: 'white'},{paddingRight: 20}]}><Text style={[item.latest_data.recovered != 0 ? {color: 'white'} : {}, {fontWeight: 'bold'}]}>{this.nwc(item.latest_data.recovered)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={[item.latest_data.deaths !=0 ? {backgroundColor: 'rgba(255,0,0,1)'} : {backgroundColor: 'white'} ,{paddingRight: 10}]}><Text style={[item.latest_data.deaths != 0 ? {color: 'white'} : {}, {fontWeight: 'bold'}]}>{this.nwc(item.latest_data.deaths)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={[item.latest_data.critical != 0 ? { backgroundColor: 'rgba(255,150,0,1)'} : {backgroundColor: 'white'} ,{paddingRight: 20}]}><Text style={[item.latest_data.critical != 0 ? {color: 'white'} : {}, {fontWeight: 'bold'}]}>{this.nwc(item.latest_data.critical)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={[item.today.confirmed != 0 ? { backgroundColor: 'rgba(255,166,91,1)'} : {backgroundColor: 'white'}, {paddingRight: 20}]}><Text style={[item.today.confirmed != 0 ? {color: 'white'} : {}, {fontWeight: 'bold'}]}>{this.nwc(item.today.confirmed)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={[item.today.deaths != 0 ? { backgroundColor: 'rgba(255,0,0,1)'} : {backgroundColor: 'white'},{paddingRight: 20}]}><Text style={[item.today.deaths != 0 ? {color: 'white'} : {}, {fontWeight: 'bold'}]}>{this.nwc(item.today.deaths)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={{ paddingRight: 20}}><Text>{item.latest_data.calculated.death_rate == null ? 0 : item.latest_data.calculated.death_rate.toFixed(2)}%</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={{ paddingRight: 20}}><Text>{item.latest_data.calculated.recovery_rate == null ? 0 :item.latest_data.calculated.recovery_rate.toFixed(2)}%</Text></DataTable.Cell>
                                            <DataTable.Cell numeric style={{ paddingRight: 20}}><Text>{item.latest_data.calculated.cases_per_million_population == null ? 0 : item.latest_data.calculated.cases_per_million_population}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    )}
                                    keyExtractor={data => data.name.toString()}
                                />
                        }
                </DataTable>
            </ScrollView>
        )
    }
}

export default WorldTable