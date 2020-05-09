import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import { Redirect } from 'react-router-native';

import NotifService from '../notification/NotifService';

class Login extends Component {
    state = {
        userInfo: {},
        isSignedIn: false
    }
    componentDidMount() {
        GoogleSignin.configure({
            scopes: [
                'https://mail.google.com/',
                'https://www.google.com/m8/feeds',
                'https://www.googleapis.com/auth/calendar'
            ],
            androidClientId: "504314064456-p9kqjl2i5unnvolsrcvg66gnthppdntu.apps.googleusercontent.com",
            iosClientId: "975843926360-8gn5rcc7hi52m9npdbr1v5lif9naange.apps.googleusercontent.com"
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
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({
                userInfo: userInfo,  
                isSignedIn: true
            });
            console.log(userInfo);
            if(this.state.isSignedIn === true){
                this.onRegister.bind(this),
                    this.notif = new NotifService(
                    this.onNotif.bind(this),
                );
                this.props.history.push("/home")
            }
            
        } catch (error) {
            console.log(error);
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

    onRegister(token) {
        Alert.alert('Registered !', JSON.stringify(token));
        console.log(token);
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }
      
    render() {
        return (
            <View>
                <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%') }}>
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
            </View>
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

export default Login;
{/* <Button title="next" onPress = {() => this.props.history.push("/home")}></Button> */ }