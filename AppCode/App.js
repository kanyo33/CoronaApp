
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  Dimensions,
  Platform,
  YellowBox
} from 'react-native';



import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'; 
import { Overlay, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import MapView from "react-native-map-clustering";

import Geolocation from 'react-native-geolocation-service';
import Orientation from 'react-native-orientation-locker';
import NetInfo from "@react-native-community/netinfo";

import { getUniqueId, getBaseOs } from 'react-native-device-info';

import {connect} from 'react-redux';
import { 
  cityData, 
  countryCity, 
  countryData, 
  worldData, 
  worldData1, 
  affectedUpdate, 
  coronaTested, 
  locationVisible 
} from './store/actions/index';

import ToggleDetails from './src/ToogleDetails';
import Setting from './src/Settings';
import Bookmarks from './src/Bookmarks';
import WorldStats from './src/WorldStats';
import CoronaActive from './src/CoronaActive';
import {CoronaNews} from './src/CoronaNews';
import Terms from './src/Terms';
import Privacy from './src/Privacy';

import SnackBar from 'react-native-snackbar-component';
import RNBootSplash from "react-native-bootsplash";

import Fire from './Fire'

var isHidden = true;

const screenWidth = Dimensions.get("window").width;

const LATITUDE_DELTA = 4;
const LONGITUDE_DELTA = 80;

const initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
}

class App extends React.Component {
  state = {
    settings: false,
    showStat: true,
    myLocation: {},
    bookmarks: false,
    markers: [{
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      location: 'San Francisco',
      dead: 10,
      confirmed: 1200,
      recovered: 20,
      updated: new Date(),
    }],
    selected: {},
    prevPos: null,
    curAng: 45,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    loading: true,
    dataPoint: false,
    bounceValue: new Animated.Value(300), 
    bookmarked: false,
    removeBookmark: false, 
    noInternet: false,
    globe: false,
    coronaActive: false,
    coronaPositive: false,
    coronaNegative: false,
    openTerms: false,
    openPrivacy: false,
    coronaTested: false,
    affectedArea: [],
    addLocation: false,
    news: false
  }



  async componentDidMount(){
        RNBootSplash.hide();
        Orientation.lockToPortrait();
        // YellowBox.ignoredWarnings(['Setting a timer']);
        console.disableYellowBox = true; 
        let data1 = []
        let currentDate = new Date().toLocaleDateString()
        let today = new Date(this.props.updateDate).toLocaleDateString()
        if( today != currentDate ){
              let data = await Fire.get().database().ref('positive').on("child_added", (snapshot) => {
                let data2 = snapshot.val()
                data1.push(data2)
                this.props.onAffectedUpdate(data1)
              })
        }
        let uniqueId = getUniqueId();
        let myLocation
        this.requestLocationPermission()
        // this.map.animateCamera(myLocation, 1);
        NetInfo.addEventListener(state => {
            if(state.isInternetReachable || state.isConnected){
              this.fetchRequest()      
            } else {
              this.setState({noInternet: true})
            }
        });
  }

  fetchRequest = () => {
    let cities = 'https://www.trackcorona.live/api/cities';
    let countries = 'https://corona-api.com/countries';
    let world = 'https://corona-api.com/timeline';
    let dateApi = 'https://api.covid19tracking.narrativa.com/api'

    let dayBack = 86400000

    let today = new Date().toISOString().slice(0,10);
    let dateBack1 = new Date(Date.now() - dayBack).toISOString().slice(0,10);

    let worldBack = `${dateApi}/${today}`;

    fetch(cities)
      .then((resp) => resp.json())
      .then((a) => a.data)
      .then(data => {
        this.props.onCityData(data)})
      .then(() => {
        this.setState({loading: false})
    })

    fetch(countries)
      .then((resp) => resp.json())
      .then((a) => a.data)
      .then(data => {
        this.props.onCountryData(data)})
      .then(() => {
        this.setState({loading: false})
    })

    fetch(world)
      .then((resp) => resp.json())
      .then((a) => a.data)
      .then(data => {
        this.props.onWorldData(data)})
      .then(() => {
        this.setState({loading: false})
    })

    fetch(worldBack)
      .then((resp) => resp.json())
      .then((a) => a.dates[today])
      .then(data => {
        this.props.onWorldData1(data);
      })
  }

  requestLocationPermission = async () => {
    let grantedIos = false, grantedAndroid
    try {
      if(Platform.OS === 'ios'){
        Geolocation.requestAuthorization()
        grantedIos = true
      } else {
      grantedAndroid = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "Covid Tracker would like to access your location " +
            "so you can easily access recorded cases nearby you.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        }
      );  
    }
    if (grantedAndroid === PermissionsAndroid.RESULTS.GRANTED || grantedIos) {
      let myLocation;
      await Geolocation.getCurrentPosition(info => {
            myLocation = {
                latitude: Number(info.coords.latitude),
                longitude: Number(info.coords.longitude)
              }
            this.setState({
              myLocation: {
                latitude: Number(info.coords.latitude),
                longitude: Number(info.coords.longitude)
              }
            });
              
            this.props.onLocationVisible(true);
            this.map.animateToRegion({
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                longitudeDelta: 10.5,
                latitudeDelta: 80
            }, 2000)

          },
          (error) => {
                // See error code charts below.
                // this.setState({
                //   addLocation: true
                // })
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    } else {
      this.props.onLocationVisible(false)
    }
  } catch (err) {
    console.warn(err);
  }
};

  overlayChange = (e) => {
    this.setState({settings: e})
  }

  coronaActivatedFetch = (show) => {
    let uniqueId = getUniqueId();
    this.props.onCoronaTested(show)
    if (show){
      this.setState({
        coronaTested: true,
        coronaPositive: true,
        coronaNegative: false
      })
      Fire.send(uniqueId,{latitude: this.state.myLocation.latitude.toFixed(2), longitude: this.state.myLocation.longitude.toFixed(2), date: new Date()})
    } else {
      this.setState({
        coronaTested: false,
        coronaNegative: true,
        coronaPositive: false
      })
      Fire.remove(uniqueId)
    }
  }

  openTerms = (show) => {
    this.setState({
      openTerms: show
    })
  }

  openPrivacy = (show) => {
    this.setState({
      openPrivacy: show
    })
  }

  activeCoronaScreen = (show) => {
    this.setState({
      coronaActive: true,
      coronaPositive: false,
      coronaNegative: false,
      addLocation: false
    })


    var toValue = 300;

    if(!show) {
      toValue = 0;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true
      }
    ).start();
  }

   _toggleCountry = (name, dead, confirmed, recovered, updated,lat,lon, show,population,todayDeaths,todayConfirmed, critical, calculated, code) => {    
     let newCode = code.toUpperCase()
      this.setState({
        selected: {
          location: name,
          dead: dead,
          confirmed: confirmed,
          recovered: recovered,
          updated: updated,
          lat: lat,
          lon: lon,
          population: population,
          todayDeaths: todayDeaths,
          todayConfirmed: todayConfirmed,
          critical: critical,
          calculated: calculated,
          code: newCode
        },
        bookmarked: false,
        removeBookmark: false,
        showStat: show,
        addLocation: false,
      });

      var toValue = 300;

      if(!show) {
        toValue = 0;
      }

      Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true
        }
      ).start();
   }


  _toggleSubview = (location, dead, confirmed, recovered, updated,lat,lon, show, code) => {   
    let newCode =  code.toUpperCase()
    this.setState({
      selected: {
        location: location,
        dead: dead,
        confirmed: confirmed,
        recovered: recovered,
        updated: updated,
        lat: lat,
        lon: lon,
        code: newCode
      },
      bookmarked: false,
      removeBookmark: false,
      showStat: show,
      addLocation: false
    });

    var toValue = 300;

    if(!show) {
      toValue = 0;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true
      }
    ).start();

  }

  changePosition = (lat, lon) => {
    let long = this.props.countryCity == 'country' ? 20 : 5
    this.map.animateToRegion({
        latitude: lat,
        longitude: lon,
        longitudeDelta: long,
        latitudeDelta: LATITUDE_DELTA
    }, 2000)
    this.setState({bookmarks: false})
  }

  bookmarkedSnack = (type) => {
    if(type){
      this.setState({bookmarked: type})
    } else {
      this.setState({removeBookmark: true})
    }
  }

  affectedAreaZoom = () => {
    if(Object.keys(this.state.myLocation).length != 0){
      let location = {
        longitude: this.state.myLocation.longitude,
        latitude: this.state.myLocation.latitude,
        latitudeDelta: 0.082,
        longitudeDelta: 0.082,
      }
     this.map.animateToRegion(location, 2000);
    } else {
      this.setState({
        addLocation: true
      })
    }

    
  }

  
  render(){

      let mapView;

      switch(this.props.mapView) {
        case 0:
            mapView = require('./src/customMap/darkMap.json');
          break;
        case 1:
            mapView = require('./src/customMap/retroMap.json');
          break;
        case 2:
            mapView = require('./src/customMap/silverMap.json');
            break;
        case 3:
            mapView = require('./src/customMap/aubergineMap.json');
            break;
        case 4:
            mapView = require('./src/customMap/nightMap.json');
            break;
        default:
            mapView = require('./src/customMap/darkMap.json');
      }


      return (
        <>
        <View style={styles.container}>
            <StatusBar barStyle='light-content'/>


        <MapView
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          mapRef={el => (this.map = el)}
          showsUserLocation = {false}
          clusterColor="#ff073a"
          followsUserLocation
          initialRegion={{
            latitude: 37.420814, 
            longitude: -122.081949,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // onPress={this.onMapPress}
          customMapStyle={mapView}
        >
          {
            this.props.countryCity === 'country' ? 
            this.props.countryData[0] != undefined && 
            this.props.countryData.map((marker,i)=> (
            
            <Marker
              key={i}
              coordinate={{latitude: marker.coordinates.latitude == null ? 1 : marker.coordinates.latitude, longitude: marker.coordinates.longitude == null ? 1 : marker.coordinates.longitude}}
              title={marker.name}
              tracksViewChanges={false}
              onPress={()=> 
                this._toggleCountry(
                    marker.name,
                    marker.latest_data.deaths,
                    marker.latest_data.confirmed,
                    marker.latest_data.recovered,
                    marker.updated_at, 
                    marker.coordinates.latitude, 
                    marker.coordinates.longitude, 
                    false,
                    marker.population,
                    marker.today.deaths,
                    marker.today.confirmed,
                    marker.latest_data.critical,
                    marker.latest_data.calculated,
                    marker.code    
                )}
            >
              <Icon name="circle" size={50} color="rgba(155,0,0,0.5)"  />
            </Marker>

            ))
            :
            this.props.cityData[0] != undefined && 
            this.props.cityData.map((marker,i)=> (
            
            <Marker
              key={i}
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              title={marker.location}
              tracksViewChanges={false}
              onPress={()=> this._toggleSubview(marker.location,marker.dead,marker.confirmed,marker.recovered,marker.updated, marker.latitude, marker.longitude, false, marker.country_code)}
            >
              <Icon name="circle" size={50} color="rgba(155,0,0,0.5)"  />
            </Marker>

            ))
          }
          {
            Object.keys(this.state.myLocation).length != 0 && this.props.locationVisible &&
            <View>
              <Marker
                coordinate={this.state.myLocation}
                title={'My Location'}
                tracksViewChanges={false}
                onPress={() => this.activeCoronaScreen(false)}
              >
                <Icon name="user" color="rgba(255,7,58,0.8)" size={25}/>        
              </Marker>
            </View>
          }
          {
            this.props.affectedArea.length != 0 && 
            this.props.affectedArea.map((data,i) => (
              <Circle
                key={i}
                center={{latitude: parseFloat(data.latitude),longitude: parseFloat(data.longitude)}}
                radius={3000}
                strokeWidth={2}
                strokeColor="red"
                fillColor="rgba(155,0,0,0.5)"
              />
            ))
          }
          
          
          
        </MapView>

            <TouchableOpacity onPress={() => this.setState({settings: true})} style={styles.settings}> 
              <Icon name="cog" style={styles.shadow} color="#fff" size={24} />
            </TouchableOpacity>

             <TouchableOpacity onPress={() => this.setState({bookmarks: true})} style={styles.bookmarks}> 
              <Icon name="bookmark" style={styles.shadow1} color="#fff" size={24} />
            </TouchableOpacity>

             <TouchableOpacity onPress={() => this.setState({news: true})} style={styles.newspaper}> 
              <Icon name="bell" style={styles.shadow1} color="#fff" size={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({globe: true})} style={styles.globe}> 
              <Icon name="globe" style={styles.shadow} color="#fff" size={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.affectedAreaZoom()} style={styles.zoom}> 
              <Icon name="crosshairs" style={styles.shadow} color="#fff" size={24} />
            </TouchableOpacity>

            <Overlay isVisible={this.state.news} height={'100%'} width={'100%'} overlayStyle={{padding: -10}} >
              <CoronaNews overlayClose={() => this.setState({news: false})}/>
            </Overlay>

            <Overlay isVisible={this.state.settings} fullscreen overlayStyle={{padding: -10, borderRadius: 20, overflow: 'hidden'}} onBackdropPress={()=> this.setState({settings: false})}>
              <Setting overlayClose={this.overlayChange}/>
            </Overlay>

            <Overlay isVisible={this.state.openTerms} overlayStyle={{padding: -10}} onBackdropPress={()=> this.setState({openTerms: false})}>
              <Terms openTerms={this.openTerms}/>
            </Overlay>

            <Overlay isVisible={this.state.openPrivacy} overlayStyle={{padding: -10}} onBackdropPress={()=> this.setState({openPrivacy: false})}>
              <Privacy openPrivacy={this.openPrivacy}/>
            </Overlay>


            <Overlay isVisible={this.state.globe} height={'100%'} width={'100%'} overlayStyle={{padding: -10}} >
              <WorldStats closeGlobe={() => this.setState({globe: false})}/>
            </Overlay>

            <SnackBar visible={this.state.coronaPositive} textMessage="Thank You For Sharing" position={Platform.OS === 'ios' ? 'bottom' : 'top'} backgroundColor="#ff073a" accentColor="#fff" autoHidingTime={3000} actionText="Covid 19 Positive" actionHandler={() => this.setState({coronaPositive: false})}/>  
            <SnackBar visible={this.state.coronaNegative} textMessage="Thank You For Sharing" position={Platform.OS === 'ios' ? 'bottom' : 'top'} backgroundColor="green" accentColor="#fff" autoHidingTime={3000} actionText="Covid 19 Negative" actionHandler={() => this.setState({coronaNegative: false})}/>  
            <SnackBar visible={this.state.bookmarked} textMessage="Added to Bookmarks" position={Platform.OS === 'ios' ? 'bottom' : 'top'} backgroundColor="#ff073a" accentColor="#fff" autoHidingTime={3000} actionText="Bookmark Saved" actionHandler={() => this.setState({bookmarked: false})}/>  
            <SnackBar visible={this.state.removeBookmark} textMessage="Removed from Bookmarks" position={Platform.OS === 'ios' ? 'bottom' : 'top'} backgroundColor="#ff073a" accentColor="#fff" autoHidingTime={3000} actionText="Bookmark Removed" actionHandler={() => this.setState({removeBookmark: false})}/>  
            <SnackBar visible={this.state.noInternet} textMessage="Unable to Update Info" position={Platform.OS === 'ios' ? 'bottom' : 'top'} backgroundColor="#ff7500" accentColor="#fff" autoHidingTime={3000} actionText="No Connection" actionHandler={() => this.setState({noInternet: false})}/>  
            <SnackBar visible={this.state.addLocation} textMessage="Enable Access To Location" position={Platform.OS === 'ios' ? 'bottom' : 'top'} backgroundColor="#ff073a" accentColor="#fff" autoHidingTime={3000} actionText="Location Required" actionHandler={() => this.setState({addLocation: false})}/>  
            
            <Overlay isVisible={this.state.bookmarks} overlayStyle={{padding: -10, borderRadius: 20, overflow: 'hidden'}} onBackdropPress={()=> this.setState({bookmarks: false})} >
              <Bookmarks 
                changePosition={this.changePosition} 
                overlayClose={()=> this.setState({bookmarks: false})}
              />
            </Overlay>
          { !this.state.showStat && !this.state.coronaActive && 
            <Animated.View
              style={[styles.subView,
                {transform: [{translateY: this.state.bounceValue}]}]}
            >
            <ToggleDetails 
              selected={this.state.selected} 
              bookmarkedSnack={this.bookmarkedSnack} 
              toggleDetails={this._toggleSubview}
              toggleCountry={this._toggleCountry}
            />
          </Animated.View>
          }
          { this.state.coronaActive && this.state.showStat &&
            <Animated.View
              style={[styles.subView2,
                {transform: [{translateY: this.state.bounceValue}]}]}
            >
            <CoronaActive 
              closeScreen={() => this.setState({coronaActive: false})}
              openTerms={this.openTerms}
              openPrivacy={this.openPrivacy}
              coronaActivated={this.coronaActivatedFetch}
              coronaTested={this.props.coronaTested}
      
            />
          </Animated.View>
          }
          {
            this.state.showStat && !this.state.coronaActive &&
            <View style={styles.selectBtn}>
              <View style={styles.buttonAlign}>
                <Button 
                  title="Country" 
                  containerStyle={{marginRight: 10, width: 110}}  
                  buttonStyle={ this.props.countryCity === 'country' ? styles.activeBtn : styles.inactiveBtn }
                  titleStyle={{color: '#000'}}
                  onPress={() => this.props.onCountryCity('country')}
                />
                <Button 
                  title="City" 
                  containerStyle={{marginRight: 10, width: 110}}  
                  buttonStyle={ this.props.countryCity === 'city' ? styles.activeBtn : styles.inactiveBtn }
                  titleStyle={{color: '#000'}}
                  onPress={() => this.props.onCountryCity('city')}
                />
              </View>
            </View>
          }
      </View>
        </>
      );
    }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  shadow: {
    width: 40,
    shadowOpacity: 2,
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 }
  },
  shadow1: {
    width: 38,
    shadowOpacity: 2,
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 }
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  settings: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 0,
  },
  newspaper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 170 : 150,
    right: 3,
  },
  globe: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 225 : 205,
    right: 0,
  },
  zoom: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 280 : 260,
    right: 0,
  },
  bookmarks: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 90,
    right: 0,
  },
  subView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    height: 300,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subView2: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,1)",
    height: 280,
    overflow: 'hidden',
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectBtn: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  buttonAlign: {
    display: 'flex',
    flexDirection: 'row',
  },
  activeBtn: {borderWidth: 1, borderColor: '#888', borderRadius: 20, backgroundColor:'rgba(255,255,255,0.5)'},
  inactiveBtn: {borderWidth: 1, borderColor: '#888', borderRadius: 20, backgroundColor:'rgba(255,255,255,0.3)'}
});


const mapStateToProps = state => {
    return {
        mapView: state.settings.mapView,
        cityData: state.settings.cityData,
        countryCity: state.settings.countryCity,
        countryData: state.settings.countryData,
        coronaTested: state.settings.coronaTested,
        countryBookmark: state.bookmarks.countryBookmark,
        updateDate: state.bookmarks.updateDate,
        affectedArea: state.bookmarks.affectedArea,
        locationVisible: state.settings.locationVisible
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCityData: (data) => dispatch(cityData(data)),
        onCountryData: (data) => dispatch(countryData(data)),
        onCountryCity: (country) => dispatch(countryCity(country)),
        onWorldData: (data) => dispatch(worldData(data)),
        onWorldData1: (data) => dispatch(worldData1(data)),
        onAffectedUpdate: (data) => dispatch(affectedUpdate(data)),
        onCoronaTested: (data) => dispatch(coronaTested(data)),
        onLocationVisible: (data) => dispatch(locationVisible(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 


