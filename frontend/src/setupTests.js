// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * Set environmental variable DEBUG=jest in IDE when running in debug mode so
 * tests won't fail on time limit
 */
if (process.env.DEBUG === 'jest') {
    jest.setTimeout(5 * 60 * 1000);
}

global.IS_REACT_ACT_ENVIRONMENT = true;
