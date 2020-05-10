import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserAvatar from 'react-native-user-avatar';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CustomModal } from '../components/modal'
import moment from 'moment';
import base64_decode from '../components/Fuctions'

class Snooze extends Component {
    render(){
        const {leftLabel, rightLabel} = this.props;
        return(
           <View style={snoozeStyles.container}>
               <Text>{leftLabel}</Text>
               <Text>{rightLabel}</Text>
           </View>
        ) 
    }
}

const snoozeStyles = StyleSheet.create({
    container: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: hp('5%'), alignItems: 'center', borderBottomColor: 'rgb(160,160,160)', borderBottomWidth: hp('0.1%')},
});

import defaultheader from './../components/HeaderFunction';

class Home extends Component {
    
    state = {
        from_email: '',
        subject: 'Updated project numbers1',
        starCount: 3,
        body: 'Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.',
        attachment_urls: ['https://dummyimage.com/300/000/fff', 'https://dummyimage.com/300/000/fff'],
        attachment_data: [],
        snoozeVisible: false,
        snoozes: [],
        labelVisible: false,
        appliedLabels: ['Design', 'Swatched', 'UI/UX', 'Photohsop', 'InvisionApp'],
        addLabels: ['Wireframes', 'FreFonts', 'Android', 'Mockups', 'UI', 'Inspiration',
                'Wireframes', 'FreFonts', 'Android', 'Mockups', 'UI', 'Inspiration',
                'Wireframes', 'FreFonts', 'Android', 'Mockups', 'UI', 'Inspiration'],
        new_label: '',
        messages: []
    }                                                 

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }

    transformRequest(obj){
        var str = [];
        for (var p in obj)
        str.push(encodeURIComponent(p) + ":" + encodeURIComponent(obj[p]));
        return str.join(" ");
    }

    componentDidMount() {
        console.log('This is thread list');
        console.log(this.props.thread_list);
        if(this.props.thread_list.length > 0){
            // Load message_list for thread
            const header = defaultheader();
            header.method='GET';
            const thread_id = 0;
            let url = "https://www.googleapis.com/gmail/v1/users/me/threads/" + this.props.thread_list[thread_id].id;
            header.headers["Authorization"]= 'Bearer '+ tokens.accessToken;
            fetch(url, header).then((response) => {
                return response.json()
            })
            .then( async (responseJson) => {
                console.log('This is message list');
                console.log(responseJson);
                let messages = [];
                for(message of responseJson.messages){
                    url = `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`;
                    await fetch(url, header).then((response) => {
                        return response.json();
                    }).then((responseJson) => {
                        let headers = {};
                        let coded_message = responseJson.payload.parts[0].body.data;
                        if(coded_message == undefined) {
                            let coded_message1 = responseJson.payload.parts[0].parts[0].body.data;
                            let parsed_message = base64_decode(coded_message1);
                            responseJson.message = parsed_message;
                            responseJson.attachment = true;
                        }
                        else {
                            let parsed_message = base64_decode(coded_message); 
                            responseJson.message = parsed_message;
                            responseJson.attachment = false;
                        }
                        
                        responseJson.payload.headers.forEach(header => {
                            headers[header.name] = header.value;
                        });
                        const from = headers['From'];
                        const from_name = from.slice(0, from.indexOf('<') - 1);
                        const from_email = from.slice(from.indexOf('<') + 1, from.indexOf('>'));
                        headers['from_name'] = from_name;
                        headers['from_email'] = from_email;
                        if(/@gmail.com>$/.test(headers['From'])){
                            responseJson.headers = headers;
                            messages.push(responseJson);
                        }
                    }).catch((error) => {
                        console.log("An error occurred.Please try again",error);
                    });
                }
                this.setState({messages});
                if( typeof messages[0].attachment !== 'undefined' && messages[0].attachment==true){
                    let message = messages[0];
                    let parts = message.payload.parts;
                    let messageId = message.id;
                    const header = defaultheader();
                    header.methon = 'GET';

                    for(let v=1; v< parts.length; v++){
                        let attachmentId = parts[v].body.attachmentId;
                        let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`;
                        header.headers['Authorization']='Bearer ' + this.props.token;
                        fetch(url, header).then((response) => {
                            return response.json()
                        })
                        .then(async(responseJson) => {
                            var attachment_data = this.state.attachment_data;
                            attachment_data.push(this.tomailformed_base64(responseJson.data));
                            this.setState({attachment_data: attachment_data});
                        })
                    }
                }
                let snoozes = [];
                snoozes.push({label: 'One Hour', time: moment().add(1, "hour").format('hh:mm A')})
                snoozes.push({label: 'Later today', time: moment().add(24 - moment().hours(), "hours").format('hh:mm A')})
                snoozes.push({label: 'Tonight', time: "8:00 PM"})
                snoozes.push({label: 'Tomorrow', time: moment().add(1, "day").format('ddd, MMM Do hh:mm A')})
                snoozes.push({label: '7 Days', time: moment().add(7, "days").format('ddd, MMM Do hh:mm A')})
                snoozes.push({label: '30 Days', time: moment().add(30, "days").format('ddd, MMM Do hh:mm A')})
                snoozes.push({label: '6 months', time: moment().add(6, "months").format('ddd, MMM Do hh:mm A')})
                snoozes.push({label: '1 Year', time: moment().add(1, "year").format('ddd, MMM Do hh:mm A')})
                this.setState({snoozes}); 
            })
            .catch((error) => {
                console.log("An error occurred.Please try again",error);
            });
        }
    }
    tomailformed_base64 = (data) => {
        return data.replace(/_/g, "/").replace(/-/g, "+");
    }

    onPressReply() {
        this.props.navigation.navigate("Reply");
    }

    onPressSnooze = () => {
        this.setState({snoozeVisible: true});
    }

    closeSnooze = () => {
        this.setState({snoozeVisible: false});
    }

    onPressLabel = () => {
        this.setState({labelVisible: true});
    }

    closeLabel = () => {
        this.setState({labelVisible: false});
    }

    onChangeLabel = (value) => {
        this.setState({new_label: value});
    }

    submitLabel = () => {
        const {addLabels, new_label} = this.state;
        addLabels.push(new_label);
        this.setState({addLabels});
    }
    render() {
        const {messages} = this.state;
        if(messages.length == 0)
            return <View style={{marginTop: hp('10%')}}><Text>No Emails</Text></View>
        const {headers} = messages[0];
        let label = headers['from_name'] + ', me';
        if( typeof headers['Cc'] != undefined)
            label += ', ' + headers['Cc'];
        const {attachment_data, body, attachment_urls, snoozeVisible, snoozes, labelVisible, appliedLabels, addLabels, new_label} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: 'white', flex: 1 }}>
                <ScrollView>
                    <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%'), borderBottomColor: 'rgb(220,220,220)', borderBottomWidth: hp('0.2%') }}>
                        <View style={styles.userContainer}>
                            <UserAvatar size={wp('20%')} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" style={{width: wp('20%'), height: wp('20%'), marginRight: wp('5%')}}/>
                            <View>
                                <View><Text style={styles.userName}>{headers['from_name']}</Text></View>
                                <View style={{display:'flex', width: wp('60%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <StarRating
                                        disabled={false}
                                        emptyStar={'ios-star-outline'}
                                        fullStar={'ios-star'}
                                        halfStar={'ios-star-half'}
                                        iconSet={'Ionicons'}
                                        maxStars={4}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        fullStarColor={'black'}
                                    />
                                    <Text>Bell</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.subjectContainer}>
                            <Text style={styles.subject}>{messages[0].headers['Subject']}</Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%')}}>
                        <View style={styles.infoContainer}>
                            <View style={{display:'flex', flexDirection: 'row'}}>
                                <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' style={{marginRight: wp('1%')}}/>
                                <Text style={{color: 'rgb(150,150,150)'}}>{attachment_data.length}</Text>
                            </View>
                            <Text style={{color: 'rgb(150,150,150)'}}>{label}</Text>
                        </View>
                        <View style={styles.bodyContainer}>
                            <Text>
                                {messages[0].message}
                            </Text>
                        </View>
                    </View>
                    {
                        attachment_data.map((uri, index)=>(
                            <Image source={{uri:`data:image/png;base64,${uri}`}} key={index} style={[{height: hp('30%')},index == attachment_data.length - 1 ? null:{marginBottom: hp('2%')} ]}/>
                        ))
                    }
                    <CustomModal visible={snoozeVisible} close={this.closeSnooze}>
                        <View style={styles.snoozeContainer}>
                            <Text style={styles.snoozeLabel}>Snooze untill...</Text>
                        </View>
                        {
                            snoozes.map((item, index) => <Snooze key={index} leftLabel={item.label} rightLabel={item.time}/>)
                        }
                        <View style={styles.snoozeContainer}>
                            <Text style={styles.snoozeLabel}>Pick a date</Text>
                        </View>
                    </CustomModal>

                    <CustomModal visible={labelVisible} close={this.closeLabel}>
                        <View style={styles.labelTextContainer}>
                            <Text style={styles.snoozeLabel}>Applied Labels</Text>
                        </View>
                        <View style={styles.labelContentContainer}>
                            {
                                appliedLabels.map((label, index) => (
                                    <View key={index} style={styles.labelItemContainer}>
                                        <View key={index} style={styles.labelItemWrapper}>
                                            <Text style={styles.labelItem}>{label}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.labelTextContainer}>
                            <Text style={styles.snoozeLabel}>Add Labels</Text>
                        </View>
                        <View style={styles.labelContentContainer}>
                            {
                                addLabels.map((label, index) => (
                                    <View key={index} style={styles.labelItemContainer}>
                                        <View key={index} style={styles.labelItemWrapper}>
                                            <Text style={styles.labelItem}>{label}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.labelTextContainer}>
                            <Text style={styles.snoozeLabel}>Create New Label</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput onChangeText={this.onChangeLabel} onSubmitEditing={this.submitLabel} value={new_label}/>
                        </View>
                    </CustomModal>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: wp('5%'), paddingRight: wp('5%')}}>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="address-book" size={wp('5%')} color= 'rgb(150,150,150)' solid/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="inbox" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="cog" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="pencil-alt" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="bars" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('4%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), marginBottom: hp('8%')}}>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="redo" size={wp('5%')} color= 'rgb(150,150,150)' light style={{transform: [{rotateY: '180deg'}]}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onPressLabel.bind(this)}>
                            <Icon name="tag" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onPressSnooze.bind(this)}>
                            <Icon name="reply" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onPressReply.bind(this)}>
                            <Icon name="reply" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="bars" size={wp('5%')} color= 'rgb(150,150,150)'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    userContainer: {marginTop: hp('5%'), display: 'flex', flexDirection: 'row' },
    userName: { fontSize: hp('4%') },
    subject: { fontSize: hp('3%') },
    subjectContainer: {marginTop: hp('2%'), marginBottom: hp('2%')},
    content: { fontSize: hp('2.3%') }, 
    infoContainer: {marginTop: hp('1%'), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'rgb(220,220,220)' },
    bodyContainer: {marginTop: hp('2%'), marginBottom: hp('2%')},
    button: {width:wp('12%'), height: wp('12%'), borderRadius: wp('6%'), backgroundColor: 'rgb(220, 220, 220)', justifyContent: 'center', alignItems:'center'},

    footer: {position: 'absolute', bottom: 0, height: hp('20%'), width: '100%'},

    snoozeContainer: {height: hp('5%'), display: 'flex', justifyContent: 'flex-end', borderBottomColor: 'rgb(160,160,160)', borderBottomWidth: hp('0.1%')},
    snoozeLabel: {fontWeight: 'bold', fontSize: hp('1.8%')},

    labelTextContainer: {height: hp('5%'), justifyContent: 'center', fontSize: hp('1.8%')},
    labelContentContainer: {display: 'flex', flexDirection: 'row', flexWrap: 'wrap'},
    labelItemContainer: {height: hp('4%'), alignItems: 'center',justifyContent: 'center' },
    labelItemWrapper: {backgroundColor: 'rgb(224,224,224)',height: hp('3%'), alignItems: 'center', borderRadius: wp('1.5%'),justifyContent: 'center', marginRight: wp('3%')},
    labelItem: {fontSize: hp('1.5%'), padding: wp('1.5%')},
    textInputContainer: {height: hp('4%'), justifyContent: 'center', borderRadius: hp('2%'), borderWidth: wp('0.3%'), borderColor: 'black', paddingLeft: hp('2%'), paddingRight: hp('2%')},

}); 

Home.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        token: state.user.token,
        thread_list: state.thread.thread_list
    }
}

export default connect(mapStateToProps, null)(Home);