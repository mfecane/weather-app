import React, { Component } from 'react';
import Spinner from '../Spinner';
import { ErrorBoundary, ErrorIndicator } from '../Error';

const withData = (methodName) => (Wrapped) => {
    return class extends Component {

        componentDidMount() {

            const param = this.props.param;
            const { dataRequest, dataLoaded, dataError } = this.props;
            dataRequest();

            this.props.service[methodName](param)
                .then((data) => {
                    dataLoaded(data);
                })
                .catch(() => {
                    dataError();
                });
        }

        render() {

            const { data, loading, error } = this.props;

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator />;
            }

            return (
                <ErrorBoundary>
                    <Wrapped {...this.props} data={data} />
                </ErrorBoundary>
            );
        }
    };
};

export default withData;
