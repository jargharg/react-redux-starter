import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { createPost } from "../actions"

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field
        const className = `form-group ${touched && error ? "has-danger" : ""}`

        return (
            <div className={className}>
                <label>
                    {field.label}
                </label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/")
        })
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Blog Content"
                    name="content"
                    component={this.renderField}
                />
                <div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to="/" className="btn btn-danger">
                        Cancel
                    </Link>
                </div>
            </form>
        )
    }
}

function validate(values) {
    const errors = {}

    if (!values.title) {
        errors.title = "plz enter a title"
    }
    if (!values.categories) {
        errors.categories = "plz enter some categories"
    }
    if (!values.content) {
        errors.content = "plz enter some content"
    }

    return errors
}

export default connect(null, { createPost })(
    reduxForm({ validate, form: "PostsNewForm" })(PostsNew)
)
