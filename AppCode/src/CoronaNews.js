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
import { WebView } from 'react-native-webview';

export const CoronaNews = ({overlayClose}) => (
    <View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 15, backgroundColor: '#ff073a'}}>
            <TouchableOpacity onPress={overlayClose}> 
                <Icon name="bell" color="#fff" size={28}  />
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Covid 19 News</Text>
            <TouchableOpacity onPress={overlayClose}> 
                <Icon name="times-circle" color="#fff" size={28} />
            </TouchableOpacity>
        </View>
        <View style={{height: '90%', width: '100%'}}>
            <WebView
                source={{ uri: 'https://www.google.com/search?q=corona+news&sxsrf=ALeKk00TPnMqFBaPCspLFfeOuvQBbsYD4g:1601379901421&source=lnms&tbm=nws&sa=X&ved=2ahUKEwj4nrKBpY7sAhWmzoUKHWabAyoQ_AUoAXoECBUQAw&biw=1280&bih=587&dpr=1.5' }}
                style={{ flex : 1 }} 
            />
        </View>
    </View>
);