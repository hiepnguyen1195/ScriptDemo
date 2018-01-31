import React, { Component } from 'react';
import '../styles/App.css';
import PostList from './PostList'
import CreatePost from './CreatePost'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'

class App extends Component {
/*
  <Header>: chứa liên kết để điều hướng trong toàn bộ trang web
  <Switch> để nhóm <Route>
  <Switch> sẽ lặp qua các phần tử con của routes và chỉ render đầu tiên phù hợp với tên đường dẫn hiện tại.
  Một <Route> dự kiến một đường dẫn prop, nó mô tả loại pathname phù hợp với route
  Nếu chỉ muốn khớp với path sử dùng exact
*/
  render() {
    return (
      <div className="center">
        <Header />
        <div className="container background-gray">
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route exact path="/create" component={CreatePost} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
