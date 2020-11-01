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
            return (
                <div className={`_animate ${didMount && '_active'}`}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
}

export default Animated;
