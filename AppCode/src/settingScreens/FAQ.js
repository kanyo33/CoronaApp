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

import Accordion from 'react-native-collapsible/Accordion';


const SECTIONS = [
    {
      title: 'How do I know if I have the Corona Virus?',
      content: 'Common symptoms include fever, tiredness, dry cough, aches and pain, nasal congestion, runny nose, sore throat and diarrhea.',
    },
    {
      title: 'How long does it take for the virus to become a serious problem?',
      content: 'On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days.',
    },
    {
      title: 'What should I do if i have the Corona Virus?',
      content: 'People with mild symptoms who are otherwise healthy should self-isolate. Seek medical attention if you have a fever, a cough, and difficulty breathing. Call ahead.'
    },
    {
      title: 'How can I catch the Corona Virus?',
      content: 'You can be infected by breathing in the virus if you are within close proximity of someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth.'
    },
    {
      title: 'How does the virus spread?',
      content: 'The virus that causes COVID-19 is mainly transmitted through droplets generated when an infected person coughs, sneezes, or exhales. These droplets are too heavy to hang in the air, and quickly fall on floors or surfaces.'
    },
    {
      title: 'Does sharing my location help when I know I have the virus?',
      content: 'Yes. Increasing the awareness in your community that their have been cases identified in their region can impact the precautions they take to mitigate the spread.'
    },
    {
      title: 'When will things become normal again?',
      content: 'No one really knows, however, by taking the proper precautions and notifying others of the tools available to reduce the spread we can hope for things to become normal sooner rather than later.'
    },
    {
      title: 'I turned my location service on, but cannot see my location?',
      content: 'You must turn the location on through you phone settings under the respective field and turn the location settings on in the account settings.'
    },
  ];


class Faq extends React.Component {

    state = {
      activeSections: [],
    };
    
    _renderHeader = section => {
      return (
        <View style={styles.headerAccordion}>
          <Icon name="arrow-down" />
          <Text style={styles.headerAccordionText}>{section.title}</Text>
        </View>
      );
    };
    
    _renderContent = section => {
      return (
        <View style={styles.contentAccordion}>
          <Text style={styles.contentAccordionText}>{section.content}</Text>
        </View>
      );
    };

    _updateSections = activeSections => {
      this.setState({ activeSections });
    };

    render(){
        return(
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#ff073a'}}> 
                    <TouchableOpacity onPress={() => this.props.toMain('main')}> 
                        <Icon name="arrow-left" color="#fff" size={28} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>FAQ</Text>
                    <TouchableOpacity onPress={this.props.overlayClose}> 
                        <Icon name="times-circle" color="#fff" size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 15}}>
                  <Icon name="life-ring" size={50} style={{marginRight: 10}} color='#ff073a'/>
                  <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#333'}}>Frequently Asked</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333'}}>Questions</Text>
                  </View>
                </View>
                <View style={styles.sectionAccordion}>
                    <Accordion
                      sections={SECTIONS}
                      activeSections={this.state.activeSections}
                      enablePointerEvents
                      underlayColor={'#fff'}
                      expandMultiple={true}
                      renderHeader={this._renderHeader}
                      renderContent={this._renderContent}
                      onChange={this._updateSections}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }, 
    headerTitle: {
        alignItems: 'center',
        marginTop: 20

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    sectionAccordion:{
      padding: 20,
      paddingLeft: 15,
      textAlign: 'justify'
    },
    headerAccordion:{
        flexDirection:'row',
      marginTop: 20
    },
    headerAccordionText:{
        fontSize: 18,
        paddingLeft: 20
    },
    contentAccordion:{
        textAlign: 'justify',
        marginTop: 10
    },
    contentAccordionText: {
        fontSize: 18,
        paddingLeft: 10
    }
});

export default Faq






