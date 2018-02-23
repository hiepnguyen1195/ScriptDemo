import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import List from './src/list'
import Search from './src/search'

export default class BookSearch extends Component {

  constructor(props) {
      super(props);
      this.state = {
          selectedTab: 'list'
      };
  }

  render() {
      return (
          <TabNavigator selectedTab={this.state.selectedTab}>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'list'}
                  title="Home"
                  onPress={() => {
                      this.setState({
                          selectedTab: 'list'
                      });
                  }}>
                  <List/>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'search'}
                  title="Search"
                  onPress={() => {
                      this.setState({
                          selectedTab: 'search'
                      });
                  }}>
                  <Search/>
              </TabNavigator.Item>
          </TabNavigator>
      );
  }
}
