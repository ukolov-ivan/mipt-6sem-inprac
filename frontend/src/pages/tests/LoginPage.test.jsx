import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from '../LoginPage';

jest.mock('react-toastify');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// describe('LoginPage', () => {
//     let store;

//     beforeEach(() => {
//         store = mockStore({
//             auth: {
//                 user: null,
//                 isLoading: false,
//                 isError: false,
//                 isSuccess: false,
//                 message: '',
//             },
//         });
//     });

//     test('renders the login form', () => {
//         render(
//             <Provider store={store}>
//                 <MemoryRouter>
//                     <LoginPage />
//                 </MemoryRouter>
//             </Provider>,
//         );
//         expect(screen.getByText(/login/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
//     });

//     test('displays error when email or password is missing', () => {
//         render(
//             <Provider store={store}>
//                 <MemoryRouter>
//                     <LoginPage />
//                 </MemoryRouter>
//             </Provider>,
//         );

//         // fireEvent.click(screen.getByRole("button", { name: /sign In/i }));
//         fireEvent.click(screen.getByText(/Sign in/i));

//         expect(toast.error).toHaveBeenCalledWith('An email must be provided');
//         // expect(toast.error).toHaveBeenCalledWith("A password must be provided");
//     });

    // test('dispatches login action on successful form submission', () => {
    // const mockLogin = jest.fn().mockReturnValue(Promise.resolve());
    // const dispatchMock = jest.spyOn(store, "dispatch");
    // render(
    //     <Provider store={store}>
    //         <MemoryRouter>
    //             <LoginPage />
    //         </MemoryRouter>
    //     </Provider>
    // );
    // fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: "test@example.com" } });
    // fireEvent.change(screen.getByText(/password/i), { target: { value: "password123" } });
    // // fireEvent.click(screen.getByRole("button", { name: /sign In/i }));
    // fireEvent.click(screen.getByText(/Sign in/i));
    // expect(dispatchMock).toHaveBeenCalledWith(login({
    //     email: "test@example.com",
    //     password: "password123"
    // }));
    // });

    // test("handles isLoading state and displays spinner", () => {
    //     store = mockStore({
    //         auth: {
    //             user: null,
    //             isLoading: true,
    //             isError: false,
    //             isSuccess: false,
    //             message: ""
    //         }
    //     });

    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <LoginPage />
    //             </MemoryRouter>
    //         </Provider>
    //     );

    //     // expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    // });

    // test("navigates to home on successful login", async () => {
    //     store = mockStore({
    //         auth: {
    //             user: { id: 1, email: "test@example.com" },
    //             isLoading: false,
    //             isError: false,
    //             isSuccess: true,
    //             message: "",
    //         }
    //     });

    //     const { history } = render(
    //         <Provider store={store}>
    //             <MemoryRouter initialEntries={['/login']}>
    //                 <LoginPage />
    //             </MemoryRouter>
    //         </Provider>
    //     );

    //     expect(history.location.pathname).toBe('/');
    // });
});
