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
const Buttons = ({title, onPress}) => {
  return (
      <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor: '#1569C7',
        textDecorationColor:'white',
        paddingHorizontal:40,
        paddingVertical:20,
        borderRadius:10
    },
    text:{
        fontSize:20,
        color:"white",
        fontWeight:"bold"
    }

})

export default Buttons