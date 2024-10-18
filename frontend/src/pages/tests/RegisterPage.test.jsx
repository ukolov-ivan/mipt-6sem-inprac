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
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /register/i }),
        ).toBeInTheDocument();
    });

    test('displays error when passwords do not match', async () => {
        await act(async () => {
            await user.type(screen.getByLabelText(/username/i), 'testuser');
            await user.type(screen.getByLabelText(/first name/i), 'Test');
            await user.type(screen.getByLabelText(/last name/i), 'User');
            await user.type(screen.getByLabelText(/email/i), 'test@test.com');
            await user.type(screen.getByLabelText(/^password/i), 'password123');
            await user.type(
                screen.getByLabelText(/confirm password/i),
                'differentPassword',
            );
            await user.click(screen.getByRole('button', { name: /register/i }));
        });
        expect(toast.error).toHaveBeenCalledWith('Passwords do not match');
    });

    test('dispatches register action on successful form submission', async () => {
        const dispatchMock = jest.spyOn(store, 'dispatch');
        await act(async () => {
            await user.type(screen.getByLabelText(/username/i), 'testuser');
            await user.type(screen.getByLabelText(/first name/i), 'Test');
            await user.type(screen.getByLabelText(/last name/i), 'User');
            await user.type(screen.getByLabelText(/email/i), 'test@example');
            await user.type(screen.getByLabelText(/^password/i), 'password123');
            await user.type(
                screen.getByLabelText(/confirm password/i),
                'password123',
            );
            await user.click(screen.getByRole('button', { name: /register/i }));
        });

        await dispatchMock.mock.results[1].value.then((result) =>
            expect(result.type).toBe(`${register.fulfilled}`),
        );

        // store.subscribe(async () => {
        //     expect(store.getState().auth).toBe({});
        // });
    });
});
