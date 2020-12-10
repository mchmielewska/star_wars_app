import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error extends Component {

    render() {
        const errors = this.props.errors;
        const errorMessage = errors.error ? (
            <div id="error">
                Error fetching data, please reload the page.
            </div>
        ) : (
                <div id="error">
                </div>

            )
        return (
            <div>
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