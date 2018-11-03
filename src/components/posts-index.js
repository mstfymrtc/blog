import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";
import _ from "lodash";

import { Link } from "react-router-dom";

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    //TODO:loadash'ın mapini kullandık çünkü
    //bununla normal map e ek olarak obje içinde de
    //iterate edebiliyoruz
    return _.map(this.props.posts, post => (
      <li key={post.id} className="list-group-item">
        {post.title}
      </li>
    ));
  }
  render() {
    console.log(this.props.posts);
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a new post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(
  mapStateToProps,
  //TODO: KISAYOL!!!! BİNDİNG İ BÖYLE KOLAYCA YAPABİLİRSİN.
  //TODO: MAP DİSPATCHTOPROPS YAPMADAN
  { fetchPosts: fetchPosts }
)(PostsIndex);
