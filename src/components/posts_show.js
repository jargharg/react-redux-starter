import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchPost, deletePost } from "../actions"

export class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchPost(id)
    }

    onDeleteClick() {
        const { id } = this.props.match.params
        this.props.deletePost(id, () => {
            this.props.history.push("/")
        })
    }

    render() {
        const { post } = this.props

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="control">
                    <Link to="/" className="btn btn-primary">
                        Go back...
                    </Link>
                    <button
                        onClick={this.onDeleteClick.bind(this)}
                        className="btn btn-danger pull-xs-right"
                    >
                        Delete
                    </button>
                </div>
                <h3>
                    {post.title}
                </h3>
                <h6>
                    {post.categories}
                </h6>
                <p>
                    {post.content}
                </p>
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)
