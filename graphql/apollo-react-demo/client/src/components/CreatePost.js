import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends Component {

  //khởi tạo state
  state = {
    title: '',
    votes: 0,
    authorId: ''
  }

  render() {
    return (
      <div className= "pt4">
        <div className="flex flex-column">
          <input
            className="mb2 form-control"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })} 
            //onChange được gọi mỗi khi thay đổi giá trị trong input box, giá trị input sẽ thay đổi state name thông qua hàm setState
            type="text"
            placeholder="A title for the post"
          />
          <input
            className="mb2 form-control"
            value={this.state.authorId}
            onChange={e => this.setState({ authorId: e.target.value })}
            type="text"
            placeholder="The authorId for the post"
          />
        </div>
        <button className="btn btn-primary" onClick={() => this._createLink()}>Submit</button>
      </div>
    )
  }

  _createLink = async () => {
    try {
      const { title, votes, authorId} = this.state;
      await this.props.createPost({
        variables: {
          title,
          votes,
          authorId
        },
      });
      this.props.history.push(`/`);
    } catch (err) {
      console.log(err);
    }
  }
}

const POST_MUTATION = gql`
  # 2
  mutation createPost($title: String!, $votes: Int!, $authorId: Int!){
    createPost(input: {title: $title, votes: $votes, authorId: $authorId}) {
      id
      title
      votes
    }
  }
`
export default graphql(POST_MUTATION, { name: 'createPost' })(CreatePost) 