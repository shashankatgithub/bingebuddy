import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

/**
 * A basic button component.
 *
 * @param {{title: string}} props - component props
 * @param {string} props.title - the text to display on the button
 *
 * @returns {React.ReactElement} the button component
 */
const Texts = ({text}) => {
  return (
        <Text style={styles.text}>{text}</Text>
  )
}
const styles = StyleSheet.create({
    text:{
        fontSize:20,
        color:"black",
        fontWeight:"bold"
    }

})

export default Texts