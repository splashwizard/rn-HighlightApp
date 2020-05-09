import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserAvatar from 'react-native-user-avatar';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class Home extends Component {
    
    state = {
        from_name: 'John Doe',
        from_email: '',
        subject: 'Updated project numbers1',
        starCount: 3,
        attachment_cnt: 2,
        body: 'Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.',
        label: 'John, Tomas ... ',
        attachment_urls: ['https://dummyimage.com/300/000/fff', 'https://dummyimage.com/300/000/fff']
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
        console.log(this.props.messages);
        if(this.props.messages.length > 0){
            const message = this.props.messages[0];
            console.log(message);
            // const from_name = message.headers['from_name'];
            // this.setState({from_name});
        }
    }
    render() {
        // if(this.props.messages.length == 0)
        //     return <View><Text>No Emails</Text></View>
        const {from_name, subject, attachment_cnt, label, body, attachment_urls} = this.state;
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
                                <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' light style={{marginRight: wp('1%')}}/>
                                <Text style={{color: 'rgb(150,150,150)'}}>{attachment_cnt}</Text>
                            </View>
                            <Text style={{color: 'rgb(150,150,150)'}}>{label}</Text>
                        </View>
                        <View style={styles.bodyContainer}>
                            <Text>
                                {body}
                            </Text>
                        </View>
                        {
                            attachment_urls.map((url, index)=>(
                                <ImageBackground source={{uri:url}} key={index} style={[{height: hp('30%')},index == attachment_cnt - 1 ? null:{marginBottom: hp('2%')} ]}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' light style={{marginRight: wp('1%')}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' light style={{marginRight: wp('1%')}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' light style={{marginRight: wp('1%')}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' light style={{marginRight: wp('1%')}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name="paperclip" size={wp('5%')} color= 'rgb(150,150,150)' light style={{marginRight: wp('1%')}}/>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            ))
                        }
                    </View>
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
    button: {width:wp('12%'), height: wp('12%'), borderRadius: wp('6%'), backgroundColor: 'rgb(220, 220, 220)', justifyContent: 'center', alignItems:'center'}
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