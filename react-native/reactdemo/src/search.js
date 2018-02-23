import React, { Component } from 'react';
import { ListView, Text, View, StyleSheet } from 'react-native';

class Search extends Component {
    render() {
        return (
  	    <View style={styles.container}>
	        <Text style={styles.description}>
        	  Search Tab
	        </Text>
	    </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        fontSize: 20,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Search