import React, { Component } from 'react';

const Animated = (WrappedComponent) => {
    return class extends Component {
        state = { didMount: false }

        componentDidMount() {
            setTimeout(() => {
                this.setState({ didMount: true })
            }, 500)
        }

        render() {
            const { didMount } = this.state
            console.log(this.state);
            return (
                <div className={`fade-in ${didMount && 'visible'}`}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
}

export default Animated;
