import React, { Component } from 'react';
import Spinner from '../Spinner';
import { ErrorBoundary, ErrorIndicator } from '../Error';
import Animated from './Animated';

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidMount() {
            this.update();
        }

        update() {
            this.setState({
                loading: true,
                error: false
            });

            const param = this.props.param;

            getData(param)
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    });
                });
        }


        render() {
            const { data, loading, error } = this.state;

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator />;
            }

            return (
                <ErrorBoundary>
                    <View {...this.props} data={data} />
                </ErrorBoundary>
            );
        }
    };
};

export default withData;
