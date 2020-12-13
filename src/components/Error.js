import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Error extends Component {

    render() {
        const errorMessage = this.props.errors && this.props.errors.error ? (
            <div id="error">
                Error fetching data, please reload the page.
            </div>
        ) : (
                <div id="error">
                </div>

            )
        return (
            <div className="error-component">
                { errorMessage}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps)(Error);