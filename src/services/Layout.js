import React, { Component, Fragment } from 'react'

export default class Layout extends Component {
    render() {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}
