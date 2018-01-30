import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Post extends Component {

  render() {
    // console.log(this.props.post.title);
    return (
      <li className="list-group-item" >
          {this.props.post.title} - {this.props.post.votes} (votes)
          <span className="badge" onClick= {() => this._delLink() }>X</span>
      </li>
    )
  }
  _delLink = async () => {
    try {
      const id = this.props.post.id;
      await this.props.deletePost({
        variables: {
          id,
        },
      });
      console.log(this.props.post);
    } catch (err) {
      console.log(err);
    }
  }
}
const POST_DEL = gql` 
  # 2
  mutation postDel($id: Int!) {
    deletePost(id: $id){
      id
      title
    }
  }
`;
export default graphql(POST_DEL, { name: 'deletePost' })(Post)