import React, { Component } from 'react';

export class ErrorButton extends Component {

  state = {
    renderError: false
  };

  render() {
    if (this.state.renderError) {
      this.foo.bar = 0;
    }

    return (
      <button
        className="error-button btn btn-danger btn-sm"
        onClick={() => this.setState({renderError: true})}>
        Throw Error
      </button>
    );
  }
}
