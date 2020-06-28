import React, { PropTypes } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'

const CustomButton = ({ onPress, isEnabled, isLoading, text, buttonStyle, textStyle, ...otherProps }) => {
    const onButtonPress = isEnabled && !isLoading ? onPress : null

    return (
        <TouchableOpacity
            {...otherProps}
            onPress={onButtonPress}
            style={[styles.button, buttonStyle]}
        >
            {(isLoading) && <ActivityIndicator style={styles.spinner} color={'white'} />}
            {(!isLoading) && <Text style={[styles.text, textStyle]}>{text}</Text>}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        height: 42,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    spinner: {
        height: 26
    },
    text: {
        textAlign: 'center',
        fontWeight: '400',
        color: 'white'
    }
})

export default CustomButton