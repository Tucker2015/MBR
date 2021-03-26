import React, { useState } from 'react'
import { Image, TouchableOpacity, Text, View, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native'


const ListCard = ({ item }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const image = () => { item.image };
    return (

        <>
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.showModal}>{item.show}</Text>
                        <Image style={{ height: 200, width: 200 }} source={{ uri: item.image }} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!isModalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
            <TouchableOpacity onPress={toggleModal}>

                <View style={styles.box}>

                    <Text style={styles.timeText}>{item.time}</Text>
                    <Text style={styles.showText}>{item.show}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    timeText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontFamily: "Poppins-Bold",
    },
    showText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontFamily: "Poppins-Regular",
    },
    button: {
        marginTop: 15,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    showModal: {
        marginBottom: 20,
        fontSize: 14,
        color: "black",
        textAlign: "center",
        fontFamily: "Poppins-Regular",
    },
    bioModal: {
        marginTop: 20,
        fontSize: 14,
        color: "black",
        textAlign: "center"
    },

    box: {
        borderWidth: 2,
        borderRadius: 15,
        margin: 2,
        padding: 5,
        backgroundColor: '#556666aa'
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