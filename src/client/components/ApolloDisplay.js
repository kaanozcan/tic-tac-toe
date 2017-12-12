import React from "react";
import propTypes from "prop-types";

const isFunction = target => typeof target === "function";

const ApolloDisplay = ({
  data,
  loadingComponent,
  errorComponent,
  component,
  ...props
}) => {
  const LoadingComponent = loadingComponent,
        Component = component,
        ErrorComponent = errorComponent;

  const { loading, error } = data;

  switch (true) {
    case loading:
      return (<LoadingComponent />);
    case error !== undefined && ErrorComponent:
      return (<ErrorComponent error={error}/>);
    default:
      return (<Component data={data} {...props} />)
  }
}

ApolloDisplay.propTypes = {
  data: propTypes.object.isRequired,
  loadingComponent: propTypes.func.isRequired,
  errorComponent: propTypes.func,
  component: propTypes.func.isRequired
};

export default ApolloDisplay;
