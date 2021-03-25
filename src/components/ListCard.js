import React, { useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
const win = Dimensions.get('window');

const ListCard = ({ item }) => {


    return (
        <View style={styles.box}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.showText}>{item.show}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    timeText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontFamily: "Poppins-Bold",
    },
    showText: {
        textAlign: 'center',
        fontSize: win.width / 26,
        fontWeight: '300',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontFamily: "Poppins-Bold",
    },
    box: {
        borderWidth: 2,
        borderRadius: 15,
        width: win.width / 1.1,
        margin: 2,
        padding: 5,
        backgroundColor: '#55666644'
    },
    modalBox: {
        flex: 1,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    }
});

export default ListCard;