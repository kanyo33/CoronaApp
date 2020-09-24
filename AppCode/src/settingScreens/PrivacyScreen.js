import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, CheckBox } from 'react-native-elements';
import PrivacyText from '../PrivacyText';

class PrivacyScreen extends React.Component {

    render(){
        return(
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#ff073a'}}> 
                    <TouchableOpacity onPress={() => this.props.toMain('main')}> 
                        <Icon name="arrow-left" color="#fff" size={28} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Privacy</Text>
                    <TouchableOpacity onPress={this.props.overlayClose}> 
                        <Icon name="times-circle" color="#fff" size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 20, padding: 20}}>
                    <PrivacyText />
                </View>

            </ScrollView>
        )
    }
}

export default PrivacyScreen