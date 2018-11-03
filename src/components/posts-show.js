import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; //react routerdan gelen id (paramsdan)
    this.props.fetchPost(id);
  }
  render() {
    const { post } = this.props;

    //fetch, componentdidmountta. component bir kez ekran gösterildikten
    //sonra datayı çekiyoruz. O yüzden undefined hatası veriyor.

    //yani, fetch bitene kadar aşağıdaki gibi loading göstermek mantıklı.
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// component render edildikten sonra ownProps dediğimi şey
// this.props oluyor

// this.props===ownProps
// this.props dediğimiz şey aslında ownProps.

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}
export default connect(
  mapStateToProps,
  { fetchPost }
)(PostsShow);
