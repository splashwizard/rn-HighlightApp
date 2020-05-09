import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import { InputField } from '../components/input';


class Reply extends Component {
    state={
        formData:{
            to: "John Doe",
            subject: "Updated project numbers"
        },
        label: "On Sep 10, 2019, at 09:39 PM, John Doe<john.doe@domain.com wrote:",
        body: 'Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.',
        attachment_urls: ['https://dummyimage.com/300/000/fff', 'https://dummyimage.com/300/000/fff']
    }
    onChangeField(fieldName, fieldValue) {
        const { formData } = this.state;
        formData[fieldName] = fieldValue;
        this.setState({formData});
    }
    render(){
        const {to, subject} = this.state.formData;
        const {label, body, attachment_urls} = this.state;
        return(
            <SafeAreaView>
                <ScrollView>
                    <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%'), marginTop: hp('10%')}}>
                        <InputField name="to" label="To" placeholder="To" text={to} onChangeField={this.onChangeField.bind(this)}/>
                        <InputField name="subject" label="Re" placeholder="Re" text={subject} onChangeField={this.onChangeField.bind(this)}/>
                        <View style={replyStyles.bodyContainer}>
                            <TextInput multiline={true} placeholder="Put reply text here" />
                        </View>
                        <View style={replyStyles.prevMsgContainer}>
                            <Text style={replyStyles.prevMsgLabel}>{label}</Text>
                            <Text style={replyStyles.prevMsgBody}>{body}</Text>
                            {
                                attachment_urls.map((url, index)=>(
                                    <Image source={{uri:url}} key={index} style={replyStyles.prevMsgAttachment}/>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const replyStyles = StyleSheet.create({
    bodyContainer: {paddingLeft: wp('3%'), marginTop: hp('3%')},
    prevMsgContainer: {paddingLeft: wp('3%'), marginTop: hp('3%'), marginBottom: hp('3%'), borderLeftColor: 'rgb(172, 180, 210)', borderLeftWidth: wp('1%')},
    prevMsgLabel: {color: 'rgb(172, 180, 210)'},
    prevMsgBody: {color: 'rgb(172, 180, 210)', marginTop: hp('3%')},
    prevMsgAttachment: {height: hp('30%'), marginTop: hp('2%')}
});



const mapStateToProps = state => {
    return {
        messages: state.message.messages
    }
}

export default connect(mapStateToProps, null)(Reply);