import React, { Component } from 'react';

const Animated = () => (Wrapped) => {
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
                    <Wrapped {...this.props} />
                </div>
            );
        }
    };
}

export default Animated;
