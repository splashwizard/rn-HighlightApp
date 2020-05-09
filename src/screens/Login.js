import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import NotifService from '../components/NotifService';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser, savetoken } from '../redux/actions/userActions';
import { saveMessages } from '../redux/actions/messageActions';

class Login extends Component {
    state = {
        userInfo: {},
        isSignedIn: false
    }

    defaultheader = () => {
        return {
            method: null,
            body: null,
            crossDomain: true,
            cache: false,
            async: false,
            timeout: 3000,
            headers: {
                "Content-Type": "application/json",
                "Authorization":"",
                "Accept": "*/*",
                "Access-Control-Allow-Headers":"*",
                "Access-Control-Allow-Headers":"*",
                "X-Requested-With":"XMLHttpRequest"
            },
        };
    };
    
    componentDidMount() {
        GoogleSignin.configure({
            scopes: [
                'https://mail.google.com/',
                'https://www.google.com/m8/feeds',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/admin.directory.user',
                'https://www.googleapis.com/auth/admin.directory.user.readonly'
            ],
            offlineAccess: false,
            webClientId: '611391942950-7f3ht1931v53efu4895d20sil8m90ff9.apps.googleusercontent.com',
            androidClientId: "611391942950-7f3ht1931v53efu4895d20sil8m90ff9.apps.googleusercontent.com",
            iosClientId: "611391942950-39fq81nvvbk349vesmmar23a2dh1urc6.apps.googleusercontent.com",
        });
        this.isSignedIn();
    }
    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isSignedIn });
        if(isSignedIn === true){
            this.notif = new NotifService(
                this.onRegister.bind(this),
                this.onNotif.bind(this),
            );
        }
    }
    onRegister(token) {
        // Alert.alert('Registered !', JSON.stringify(token));
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
    onNotif(notif) {
        // Alert.alert(notif.title, notif.message);
    }
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({
                userInfo: userInfo,  
                isSignedIn: true
            });
            this.props.createUser(userInfo);
            const temp = await GoogleSignin.getTokens();
            jsontokens = JSON.stringify(temp);
            tokens = JSON.parse(jsontokens);
            this.props.savetoken(tokens.accessToken)

            if(this.state.isSignedIn === true){
                this.notif = new NotifService(
                    this.onRegister.bind(this),
                    this.onNotif.bind(this),
                );
                // Load Gmail Inbox Data
                const header = this.defaultheader();
                header.method='GET';
                let url = "https://www.googleapis.com/gmail/v1/users/me/messages";
                header.headers["Authorization"]= 'Bearer '+ tokens.accessToken;
                fetch(url, header).then((response) => {
                    return response.json()
                })
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.messages.length > 0){
                        let messages = [];
                        for(message of responseJson.messages){
                            url = `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}?format=raw`;
                            fetch(url, header).then((response) => {
                                return response.json();
                            }).then((responseJson) => {
                                console.log("this is resposeJson");
                                console.log(responseJson);
                                let headers = {};
                                var real_message = atob(responseJson.raw);
                                console.log(real_message);
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
                        console.log(messages);
                        this.props.saveMessages(messages);
                    }
                })
                .catch((error) => {
                    console.log("An error occurred.Please try again",error);
                });
                // Go To Home Page
                this.props.navigation.navigate("Home")
            } 
            
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert("Sign In request is canceled");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert("Sign In request is on progress")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert("play services is not available");
            } else {
                alert("Extra error is occured");
            }
        }
    };
    render() {
        return (
            <SafeAreaView style={{backgroundColor: 'white', flex: 1 }}>
                <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%')}}>
                    <Text style={styles.myText}>Highlight</Text>
                    <View style={styles.block}>
                        <Text style={styles.blockText}>high-light</Text>
                        <Text style={styles.blockText}>/ˈhaɪlaɪt/</Text>
                        <Text style={{ paddingTop: wp('5%'), paddingBottom: wp('5%'), paddingLeft: wp('15%'), fontSize: hp('2.3%') }}>noun</Text>
                        <Text style={styles.blockText}>1. A mobile communciations assistant that reduces popup notifications to help you focus.</Text>
                        <Text style={{ paddingTop: wp('5%'), paddingBottom: wp('5%'), paddingLeft: wp('15%'), fontSize: hp('2.3%') }}>2. Your new best friend</Text>
                        
                        <GoogleSigninButton
                            style={{ width: wp('60%'), marginTop: hp('12%'), alignItems:'center', marginLeft: 'auto', marginRight: 'auto' }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn}
                            // disabled={this.state.isSigninInProgress} 
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    myText: {
        marginTop: hp('3%'),
        fontSize: hp('7%'),
        fontWeight: '700',
        textAlign: 'center'
    },
    block: {
        marginTop: hp('10%')
    },
    blockText: {
        paddingLeft: wp('15%'),
        paddingRight: wp('15%'),
        fontSize: hp('2.3%')
    }
}); 

Login.propTypes = {
    createUser: PropTypes.func.isRequired,
    savetoken: PropTypes.func.isRequired,
    saveMessages: PropTypes.func.isRequired
}

export default connect(null, { createUser, savetoken, saveMessages })(Login);