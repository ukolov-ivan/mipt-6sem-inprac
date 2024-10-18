import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import authReducer, { register } from '../../features/auth/authSlice';
import RegisterPage from '../RegisterPage';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../features/auth/authService');
jest.mock('react-toastify');

describe('RegisterPage', () => {
    let store;
    let user;

    const inputLabels = {
        username: /username/i,
        firstName: /first name/i,
        lastName: /last name/i,
        email: /email address/i,
        password: /^password/i,
        rePassword: /confirm password/i,
    };

    const buttonNames = {
        register: /register/i,
    };

    /** @param {import('../../features/auth/authService').RegisterUserDetails} userData */
    const fillRegistrationForm = async (userData) => {
        await act(async () => {
            const userFields = [
                { label: inputLabels.username, value: userData.username },
                { label: inputLabels.firstName, value: userData.firstName },
                { label: inputLabels.lastName, value: userData.lastName },
                { label: inputLabels.email, value: userData.email },
                { label: inputLabels.password, value: userData.password },
                { label: inputLabels.rePassword, value: userData.rePassword },
            ];

            for (const field of userFields) {
                await user.type(
                    screen.getByLabelText(field.label),
                    field.value,
                );
            }
            await user.click(
                screen.getByRole('button', { name: buttonNames.register }),
            );
        });
    };

    beforeEach(() => {
        user = userEvent.setup({ delay: null });

        store = configureStore({
            reducer: {
                auth: authReducer,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>,
        );
    });

    test('renders the registration form', () => {
        Object.values(inputLabels).forEach((label) => {
            expect(screen.getByLabelText(label)).toBeInTheDocument();
        });
        expect(
            screen.getByRole('button', { name: buttonNames.register }),
        ).toBeInTheDocument();
    });

    test('displays error when passwords do not match', async () => {
        const userData = {
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@test.com',
            password: 'password123',
            rePassword: 'differentPassword',
        };

        await fillRegistrationForm(userData);

        expect(toast.error).toHaveBeenCalledWith('Passwords do not match');
    });

    test('dispatches register action on successful form submission', async () => {
        const dispatchMock = jest.spyOn(store, 'dispatch');
        const userData = {
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: 'password123',
            rePassword: 'password123',
        };

        await fillRegistrationForm(userData);

        await dispatchMock.mock.results[1].value.then((result) =>
            expect(result.type).toBe(`${register.fulfilled}`),
        );

        // store.subscribe(async () => {
        //     expect(store.getState().auth).toBe({});
        // });
    });
});
