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


class CoronaActive extends React.Component{

    render(){
        return(
            <>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingHorizontal: 15, backgroundColor: 'white'}}>
                    <Text style={{color:'#555', fontSize: 20, fontWeight: 'bold'}}>My Covid 19 Status</Text>
                    <View>
                         <Icon name="times-circle" color='#888' style={{marginLeft: 20}} size={28} onPress={this.props.closeScreen} />
                    </View>
                </View>    
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, paddingVertical: 10, backgroundColor: 'white', marginBottom: 10}}>
                        <Icon name="info-circle" size={30} color='#ff073a' style={{marginRight: 10}} />
                        <Text style={{width: '90%', color: '#333'}}>Your exact location will not be shared. A geographical fence with a 6 km diameter is created to inform other users.</Text>
                    </View>
                    <View>
                    {
                        !this.props.coronaTested ?
                        <TouchableOpacity onPress={() => this.props.coronaActivated(true)} style={{alignItems: 'center',borderWidth: 3, borderColor: 'black', borderRadius: 5, padding: 5, marginHorizontal: 40, backgroundColor: '#ff073a'}}>
                            <View>
                                <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'white'}}>Tested Positive</Text>
                                <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: 'white'}}>I have the Corona Virus</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.props.coronaActivated(false)} style={{alignItems: 'center',borderWidth: 3, borderColor: 'black', borderRadius: 5, padding: 5, marginHorizontal: 40, backgroundColor: 'green'}}>
                            <View>
                                <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'white'}}>Tested Negative</Text>
                                <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: 'white'}}>I no longer have the Corona Virus</Text>
                            </View>
                        </TouchableOpacity>
                    }
                        
                        <Text style={{color: '#333', textAlign: 'center', marginTop: 5}}>I acknowledge that I have read the <Text style={{fontWeight: 'bold'}} onPress={()=> this.props.openPrivacy(true)}>privacy</Text> and <Text style={{fontWeight: 'bold'}} onPress={()=> this.props.openTerms(true)}>terms</Text>.</Text>
                    </View>
                </View> 
            </>
        )
    }
}

export default CoronaActive

