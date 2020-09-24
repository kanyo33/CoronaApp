import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import TermsText from './TermsText'

class TermsScreen extends React.Component {
    
    render(){
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#ff073a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                    <Icon name="document" size={20} color="#fff"/>
                    <Text style={{color: '#fff', fontSize: 20}}>Terms</Text>
                    <TouchableOpacity onPress={() => this.props.openTerms(false)}>
                    <Icon name="times-circle" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{marginTop: 20, padding: 20, marginBottom: 30}}>
                <TermsText />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    }
});

export default TermsScreen