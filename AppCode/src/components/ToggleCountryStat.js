import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


export const ToggleCountryStat = ({cases, title, color, caseType, caseNum, caseNew}) => (
  <View style={{flexDirection: 'column', alignItems: 'center'}}>
    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{color: '#666', fontWeight: 'bold', fontSize: 20, marginTop: 3}}>{title}</Text>
        <Text style={{marginBottom: 5, fontSize: 22, fontWeight: 'bold', backgroundColor: color, color: 'white', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5, overflow: 'hidden'}}>{caseType == null ? 0 : caseNum}</Text>
        <View style={cases === 1 ? {display: 'flex', flexDirection: 'row', alignItems: 'center', borderColor: `${title === 'Recovered' ? 'green' : 'red'}`, borderWidth: 2, borderRadius: 5, overflow: 'hidden'} : {display: 'flex', flexDirection: 'row', alignItems: 'center', borderColor: `${title === 'Recovered' ? 'green' : 'red'}`, borderWidth: 2, borderRadius: 5, overflow: 'hidden'}}>
            { 
                cases === 1 ?
                <Icon style={{padding: 3}} name='arrow-up' color={title === 'Recovered' ? 'green' : 'red'} size={17} />
                :
                <Icon style={{padding: 3}} name='arrow-down' color={title === 'Recovered' ? 'red' : 'green'} size={17} />
            }
            <Text style={cases === 1 ? {backgroundColor: `${title === 'Recovered' ? 'green' : 'red'}`, color: 'white', paddingVertical: 3, paddingHorizontal: 3, fontWeight: 'bold'} : {backgroundColor: `${title === 'Recovered' ? 'green' : 'red'}`, color: 'white', paddingVertical: 3, paddingHorizontal: 3, fontWeight: 'bold'}}>{caseNew}</Text>
        </View>
    </View>
  </View>
)

