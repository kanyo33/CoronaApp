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

import {connect} from 'react-redux';
import { notificationStatus, locationVisible } from '../../store/actions/index';

class AccountSettings extends React.Component {

    render(){
        const { locationVisible, notification, onLocationVisible, onNotificationStatus } = this.props
        return(
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#ff073a'}}> 
                    <TouchableOpacity onPress={() => this.props.toMain('main')}> 
                        <Icon name="arrow-left" color="#fff" size={28} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Account</Text>
                    <TouchableOpacity onPress={this.props.overlayClose}> 
                        <Icon name="times-circle" color="#fff" size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>
                    <ListItem
                        title="Notifications"
                        leftIcon={ <Icon name="bell" color="#ddd" size={20}  />}
                        bottomDivider
                        titleStyle={{color: '#888', fontWeight:'bold'}}
                        checkBox={{
                            checkedIcon:'dot-circle-o',
                            uncheckedIcon:'circle-o',
                            checkedColor: '#ff073a',
                            checked: notification,
                       }}
                        onPress={() => onNotificationStatus(!notification)}
                    />
                    <ListItem
                        title="Track My Location"
                        leftIcon={ <Icon name="crosshairs" color="#ddd" size={20}  />}
                        bottomDivider
                        subtitle="Open Phone Settings To Enable or Disable Access"
                        titleStyle={{color: '#888', fontWeight:'bold'}}
                        checkBox={{
                            checkedIcon:'dot-circle-o',
                            uncheckedIcon:'circle-o',
                            checked: locationVisible,
                            checkedColor: '#ff073a'
                       }}
                        onPress={() => onLocationVisible(!locationVisible)}
                    />

                    <View style={{marginHorizontal: 15, marginTop: 15}}>
                        <Text style={{ fontWeight: 'bold', color: '#888', fontSize: 16, marginBottom: 5}}>
                            Share Covid 19 Positive Status
                        </Text>
                        <Text style={{ color: '#888', marginBottom: 10}}>
                            Your Information is shared anonymously and encrypted to display an estimated location within a 1km diameter creating a 3km geographical fence.
                        </Text>
                        <Text style={{fontSize: 13, marginBottom: 5}}>
                            <Text style={{fontWeight: 'bold'}}>Step 1:</Text> If location access was not granted, open phone settings and allow app to access current location.
                        </Text>
                        <Text style={{fontSize: 13, marginBottom: 5}}>
                            <Text style={{fontWeight: 'bold'}}>Step 2:</Text> Click on <Icon name="user" style={{marginHorizontal: 4}} /> found on the map to open new screen.
                        </Text>
                        <Text style={{fontSize: 13, marginBottom: 5}}>
                            <Text style={{fontWeight: 'bold'}}>Step 3:</Text> Click on 'Tested Positive' button to share status. Location will be visible and shared at midnight.</Text>
                        <Text style={{fontSize: 13, marginBottom: 5}}>
                            <Text style={{fontWeight: 'bold'}}>Step 4:</Text> If recovery was successful, press the 'Tested Negative' button to remove indicator on the map.</Text>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        notification: state.settings.notification,
        locationVisible: state.settings.locationVisible,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNotificationStatus: (data) => dispatch(notificationStatus(data)),
        onLocationVisible: (data) => dispatch(locationVisible(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings) 
