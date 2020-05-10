import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import equal from 'fast-deep-equal'
export class InputField extends Component{
    constructor(props){
        super(props);
        this.state={
            text: props.text,
        }
        this.updateText = this.updateText.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.text, prevProps.text)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.updateText();
        }
    }

    updateText = () =>{
        console.log(this.props.text);
        this.setState({text: this.props.text});
    }

    onChangeField(fieldValue) {
		let fieldName = this.props.name;		
		this.props.onChangeField(fieldName, fieldValue);
	}
    render(){
        const {label, placeholder} = this.props;
        const {text} = this.state;
        return(
           <View style={inputStyles.container}>
               <Text style={inputStyles.label}>{label}</Text>
               <TextInput onChangeText={this.onChangeField.bind(this)} value={text} placeholder={placeholder}/>
           </View>
        ) 
    }
}

const inputStyles = StyleSheet.create({
    container: {display: 'flex', flexDirection: 'row', height: hp('5%'), alignItems: 'center', borderBottomColor: 'rgb(160,160,160)', borderBottomWidth: hp('0.1%')},
    label: {fontWeight: 'bold', width: wp('10%'), marginRight: wp('5%')},
});
