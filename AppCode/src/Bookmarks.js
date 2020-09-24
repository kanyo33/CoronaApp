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
import { ListItem, Button } from 'react-native-elements';

import {connect} from 'react-redux';
import { countryCity } from '../store/actions/index';


class Bookmarks extends React.Component {
    state = {
        city: true,
        country: false
    }

    render(){
        const {countryCity, cityBookmark, countryBookmark} = this.props;
        return (
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 15, backgroundColor: '#ff073a'}}>
                    <Icon name="bookmark" size={28} color="#fff" />
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Bookmarks</Text>
                    <TouchableOpacity onPress={this.props.overlayClose}> 
                        <Icon name="times-circle" color="#fff" size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <TouchableOpacity style={countryCity == 'country' ? styles.btnActive:styles.btnInactive } 
                        onPress={() => this.props.onCountryCity('country')}
                        >
                        <Text style={countryCity == 'country' ? styles.btnTextActive: styles.btnTextInactive}>Country</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={countryCity == 'city' ? styles.btnActive:styles.btnInactive} 
                        onPress={() => this.props.onCountryCity('city')}
                        >
                        <Text style={countryCity == 'city' ? styles.btnTextActive: styles.btnTextInactive}>City</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>

                    {
                        countryCity == 'country' ? 
                        <View>
                            {
                                countryBookmark.length != 0 ?

                                countryBookmark.map((bookmark, i) => (
                                    <ListItem
                                        key={i}
                                        title={bookmark.title}
                                        bottomDivider
                                        chevron
                                        titleStyle={{fontWeight: 'bold'}}
                                        onPress={() => this.props.changePosition(bookmark.lat,bookmark.lon)}
                                    />
                                ))
                                :
                                <View style={{marginTop: 50, alignItems: 'center'}}>
                                    <Text style={{fontSize: 28}}>No Countries</Text>
                                    <Text style={{fontSize: 24, marginTop: 5, marginBottom: 15, color: '#888'}}>Bookmarked</Text>
                                    <Icon name="globe" size={60} color="#ff073a"/>
                                </View>
                            }
                        </View>
                        :
                        <View>
                            {
                                cityBookmark.length != 0 ?
                                cityBookmark.map((bookmark, i) => (
                                    <ListItem
                                        key={i}
                                        title={bookmark.title}
                                        bottomDivider
                                        chevron
                                        titleStyle={{fontWeight: 'bold'}}
                                        onPress={() => this.props.changePosition(bookmark.lat,bookmark.lon)}
                                    />
                                ))
                                :
                                <View style={{marginTop: 50, alignItems: 'center'}}>
                                    <Text style={{fontSize: 28}}>No Cities</Text>
                                    <Text style={{fontSize: 24, marginTop: 5, marginBottom: 15, color: '#888'}}>Bookmarked</Text>
                                    <Icon name="globe" size={60} color="#ff073a"/>
                                </View>
                            }
                        </View>
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    btnActive: { width: 120, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: '#ff073a'},
    btnTextActive: {padding: 10, fontSize: 16, color: '#ff073a', fontWeight: 'bold'},
    btnInactive: { width: 120, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: '#888'},
    btnTextInactive: {padding: 10, fontSize: 16, color: '#888', fontWeight: 'bold'}
})

const mapStateToProps = state => {
    return {
        countryCity: state.settings.countryCity,
        cityBookmark: state.bookmarks.cityBookmark,
        countryBookmark: state.bookmarks.countryBookmark
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCountryCity: (country) => dispatch(countryCity(country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks) 