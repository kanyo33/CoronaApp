import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Button } from 'react-native-elements';

import VisualSettings from './settingScreens/VisualSettings';
import AccountSettings from './settingScreens/AccountSettings';
import Faq from './settingScreens/FAQ';
import PrivacyScreen from './settingScreens/PrivacyScreen';
import TermsScreen from './settingScreens/TermsScreen';

export default class Setting extends React.PureComponent{

    state = {
        screen: 'main'
    }


    toMain = (main) => {
        this.setState({screen: main})
    }

    switchSettings = () => {
        const list = [
                        {
              title: 'Account Settings',
              icon: 'map-marker',
              screen: 'account'
            },
            {
              title: 'Visual Settings',
              icon: 'tint',
              screen: 'visual'
            },
            {
              title: 'FAQ',
              icon: 'tint',
              screen: 'faq'
            },
            {
              title: 'Privacy',
              icon: 'tint',
              screen: 'privacy'
            },
            {
              title: 'Terms',
              icon: 'tint',
              screen: 'terms'
            },
            {
              title: 'Help',
              icon: 'tint',
              screen: 'help'
            },
          ]


        switch(this.state.screen){
            case 'main':
                return(
                <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 15, backgroundColor: '#ff073a'}}>
                    <TouchableOpacity onPress={() => this.props.overlayClose(false)}> 
                        <Icon name="cog" color="#fff" size={28}  />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Settings</Text>
                    <TouchableOpacity onPress={() => this.props.overlayClose(false)}> 
                        <Icon name="times-circle" color="#fff" size={28} />
                    </TouchableOpacity>
                </View>
                <View>
                <View style={{marginTop: 10}}>
                {
                    list.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        bottomDivider
                        titleStyle={{color: '#888', fontWeight:'bold'}}
                        chevron
                        onPress={() => this.setState({screen: item.screen})}
                    />
                    ))
                }
                </View>

                </View>
                </ScrollView>
                )
            case 'visual':
                return(
                    <VisualSettings toMain={this.toMain} overlayClose={() => this.props.overlayClose(false)}/>
                )
            case 'account':
                return(
                    <AccountSettings toMain={this.toMain} overlayClose={() => this.props.overlayClose(false)}/>
                )
             case 'terms':
                return(
                    <TermsScreen toMain={this.toMain} overlayClose={() => this.props.overlayClose(false)}/>
                )
            case 'privacy':
                return(
                    <PrivacyScreen toMain={this.toMain} overlayClose={() => this.props.overlayClose(false)}/>
                )
            case 'faq':
                return(
                    <Faq toMain={this.toMain} overlayClose={() => this.props.overlayClose(false)}/>
                )
            case 'help':
                return (
                    Linking.openURL('https://www.who.int/')
                )
            default: 
                return(
                <View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5, paddingBottom: 15, backgroundColor: '#ff073a'}}> 
                        <TouchableOpacity> 
                            <Icon name="arrow-left" color="#fff" size={24} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Settings</Text>
                        <TouchableOpacity onPress={() => this.overlayClose(false)}> 
                            <Icon name="cog" color="#000" size={24} />
                        </TouchableOpacity>
                    </View>
                    <View>
                    {
                        list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            bottomDivider
                            chevron
                            onPress={() => this.setState({screen: item.screen})}
                        />
                        ))
                    }
                    </View>
                </View>
                )
        }
    }

    render(){
        return(
            <SafeAreaView>
                {this.switchSettings(this.state.screen)}
            </SafeAreaView>
        )
    }
}


