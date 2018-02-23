import React, { Component } from 'react';
import { ListView, Text, View, StyleSheet } from 'react-native';
import BookList from './booklist'

class List extends Component {
    render() {
        return (
            <BookList />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default List