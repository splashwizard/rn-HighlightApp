import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import Icon from 'react-native-vector-icons/FontAwesome5';
import equal from 'fast-deep-equal'

export class CustomModal extends Component{
    state={
        visible: this.props.visible,
    }
    componentDidUpdate(prevProps) {
        if(!equal(this.props.visible, prevProps.visible)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.update();
        }
    }

    update = () =>{
        const {visible} = this.props;
        this.setState({visible});
    }
    render() {
        return (
            <Modal
                visible={this.state.visible}
                modalAnimation={new SlideAnimation({
                slideFrom: 'bottom',
                useNativeDriver: true
                })}
                modalStyle={{borderWidth: wp('0.5%'), borderRadius: wp('6%'), borderWidth: 0}}
                width={0.9} height={0.8} onPressOut={this.props.close}
            >
                <ModalContent style={styles.content}>
                    <View style={styles.container}>
                        <View style={styles.buttoncontainer}>
                            <TouchableOpacity onPress={this.props.close}>
                                <Icon name="times-circle" size={wp('7%')} color= 'rgb(150,150,150)' solid/>
                            </TouchableOpacity>
                        </View>
                        {this.props.children}
                    </View>
                </ModalContent>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {backgroundColor: 'white'},
    buttoncontainer:{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'},
});
