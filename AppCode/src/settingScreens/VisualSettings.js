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
import { mapView } from '../../store/actions/index';

class VisualSettings extends React.Component {

    state = {
        checked: false,
    }

    render(){

        return(
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#ff073a'}}> 
                    <TouchableOpacity onPress={() => this.props.toMain('main')}> 
                        <Icon name="arrow-left" color="#fff" size={28} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Visuals</Text>
                    <TouchableOpacity onPress={this.props.overlayClose}> 
                        <Icon name="times-circle" color="#fff" size={28} />
                    </TouchableOpacity>
                </View>
                <Text style={{marginVertical: 15, textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Select Map</Text>
                <CheckBox
                    iconRight
                    center
                    title='Dark Mode'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor='#ff073a'
                    checked={this.props.mapView == 0 ? true : false}
                    onPress={() => this.props.onMapView(0)}
                />
                <CheckBox
                    iconRight
                    center
                    title='Retro Mode'
                    checkedColor='#ff073a'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.props.mapView == 1 ? true : false}
                    onPress={() => this.props.onMapView(1)}
                />
                <CheckBox
                    iconRight
                    center
                    title='Silver Mode'
                    checkedColor='#ff073a'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.props.mapView == 2 ? true : false}
                    onPress={() => this.props.onMapView(2)}
                />
                <CheckBox
                    iconRight
                    center
                    title='Aubergine Mode'
                    checkedColor='#ff073a'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.props.mapView == 3 ? true : false}
                    onPress={() => this.props.onMapView(3)}
                />
                <CheckBox
                    iconRight
                    center
                    title='Night Mode'
                    checkedColor='#ff073a'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.props.mapView == 4 ? true : false}
                    onPress={() => this.props.onMapView(4)}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        mapView: state.settings.mapView,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMapView: (view) => dispatch(mapView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualSettings) 