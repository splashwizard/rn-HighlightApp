import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserAvatar from 'react-native-user-avatar';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CustomModal } from '../components/modal'
import moment from 'moment';

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

class Home extends Component {
    
    state = {
        from_name: 'John Doe',
        from_email: '',
        subject: 'Updated project numbers1',
        starCount: 3,
        attachment_cnt: 2,
        body: 'Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.',
        label: 'John, Tomas ... ',
        attachment_urls: ['https://dummyimage.com/300/000/fff', 'https://dummyimage.com/300/000/fff'],
        snoozeVisible: false,
        snoozes: [],
        appliedLabels: ['Design', 'Swatched', 'UI/UX', 'Photohsop', 'InvisionApp'],
        addLabels: ['Wireframes', 'FreFonts', 'Android', 'Mockups', 'UI', 'Inspiration',
                'Wireframes', 'FreFonts', 'Android', 'Mockups', 'UI', 'Inspiration',
                'Wireframes', 'FreFonts', 'Android', 'Mockups', 'UI', 'Inspiration']
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
        if(this.props.messages.length > 0){
            const message = this.props.messages[0];
            console.log(message);
            // const from_name = message.headers['from_name'];
            // this.setState({from_name});
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

    render() {
        // if(this.props.messages.length == 0)
        //     return <View><Text>No Emails</Text></View>
        const {from_name, subject, attachment_cnt, label, body, attachment_urls, snoozeVisible, snoozes, appliedLabels, addLabels} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: 'white', flex: 1 }}>
                <ScrollView>
                    <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%'), borderBottomColor: 'rgb(220,220,220)', borderBottomWidth: hp('0.2%') }}>
                        <View style={styles.userContainer}>
                            <UserAvatar size={wp('20%')} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" style={{width: wp('20%'), height: wp('20%'), marginRight: wp('5%')}}/>
                            <View>
                                <View><Text style={styles.userName}>{from_name}</Text></View>
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
                            <Text style={styles.subject}>{subject}</Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%')}}>
                        <View style={styles.infoContainer}>
                            <View style={{display:'flex', flexDirection: 'row'}}>
                                <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' style={{marginRight: wp('1%')}}/>
                                <Text style={{color: 'rgb(150,150,150)'}}>{attachment_cnt}</Text>
                            </View>
                            <Text style={{color: 'rgb(150,150,150)'}}>{label}</Text>
                        </View>
                        <View style={styles.bodyContainer}>
                            <Text>
                                {body}
                            </Text>
                        </View>
                    </View>
                    {
                        attachment_urls.map((url, index)=>(
                            <ImageBackground source={{uri:url}} key={index} style={[{height: hp('30%')},index == attachment_cnt - 1 ? null:{marginBottom: hp('2%')} ]}>
                                {
                                    index !== attachment_cnt - 1 ? null:
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('4%'), paddingLeft: wp('5%'), paddingRight: wp('5%')}}>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name="redo" size={wp('5%')} color= 'rgb(150,150,150)' light style={{transform: [{rotateY: '180deg'}]}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
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
                                }
                            </ImageBackground>
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

                    <CustomModal visible={snoozeVisible} close={this.closeSnooze}>
                        <View style={styles.snoozeContainer}>
                            <Text style={styles.snoozeLabel}>Applied Labels</Text>
                        </View>
                        <View>
                            {
                                appliedLabels.map((label, index) => (
                                    <Text style={{backgroundColor: 'rgb(160,160,160)', borderRadius: wp('0.5%')}}>{label}</Text>
                                ))
                            }
                        </View>
                        <View style={styles.snoozeContainer}>
                            <Text style={styles.snoozeLabel}>Add Labels</Text>
                        </View>
                    </CustomModal>
                    
                </ScrollView>
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

    snoozeContainer: {height: hp('5%'), display: 'flex', justifyContent: 'flex-end', borderBottomColor: 'rgb(160,160,160)', borderBottomWidth: hp('0.1%')},
    snoozeLabel: {fontWeight: 'bold'},
}); 

Home.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        messages: state.message.messages
    }
}

export default connect(mapStateToProps, null)(Home);