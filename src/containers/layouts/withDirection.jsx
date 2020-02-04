import React from 'react';

const direction = document.getElementsByTagName('html')[0].getAttribute('dir');
const withDirection = Component => props => <Component {...props} data-rtl={direction} />;

export default withDirection;
export { direction };
