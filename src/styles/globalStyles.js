import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff',
    alignItems: 'center',
  },
  textPosition: {
    marginTop: Platform.OS === 'ios' ? 5 : 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  cover: {
    width: win.width / 1.65,
    height: win.width / 1.65,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#20286c',
  },
  headerText: {
    fontSize: win.width / 24,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: "Poppins-Bold",
  },

  textLight: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: "Poppins-Regular"
  },
  smallText: {
    fontSize: 18,
    color: '#436',
    fontFamily: "Poppins-Regular"
  },

  metaText: {
    flexWrap: 'wrap',
    flexShrink: 1,
    marginLeft: 10,
    paddingRight: 10,
    fontSize: win.width / 32,
    color: '#fff',
    fontFamily: "Poppins-Regular",
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },


  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  homeIcon: {
    textAlign: 'center',
    color: '#fff',
    shadowColor: 'rgba(144, 110, 35, 0.16)',
  },
  playContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    width: '95%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    position: 'absolute',
    bottom: 2,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 5,
    // shadowOpacity: 0.75,
    // elevation: 5,
  },

  playButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    elevation: 5,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
});
