import React, { Component } from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

/*
  - State biểu diễn trạng thải của Component, 
    state là private và chỉ có thể được thay đổi bên trong bản thân component.
  - props là một attribute của Component.  
    mang tính external, và không bị kiểm soát bởi bản thân component
    chứa giá trị được chuyển từ bên ngoài vào trong Component.
    được truyền từ component cao hơn theo phân cấp, truyền từ component cha xuống component con
*/

class PostList extends Component {
  render() {
    console.log(this.props);
    // khi yeu cau dang cho phan hoi
    if (this.props.postQuery && this.props.postQuery.loading) {
      return <div>Loading</div>
    }
  
    // truong hop gui yeu cau that bai
    if (this.props.postQuery && this.props.postQuery.error) {
      return <div>Error</div>
    }
  
    //du lieu nhan tu may chu
    const postsToRender = this.props.postQuery.posts
    
    return (
      <div>
        <ul className="list-group">
          {postsToRender.map(post => <Post key={post.id} post={post} />)}
        </ul>
      </div>
    )
  }
}

const POST_QUERY = gql` 
  # 2
  query postQuery {
    posts {
      id
      title
      votes
    }
  }
`;

// 3
export default graphql(POST_QUERY, { name: 'postQuery' }) (PostList) // props postQuery đc inject vao PostList