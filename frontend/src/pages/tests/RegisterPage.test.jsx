import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import configureStore from "redux-mock-store";
import { reset } from "../../features/auth/authSlice";
import RegisterPage from "../RegisterPage";
jest.mock("react-toastify");

const mockStore = configureStore([]);

describe("RegisterPage", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: {
                user: null,
                isLoading: false,
                isError: false,
                isSuccess: false,
                message: ""
            }
        });
    });

    test("renders the registration form", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByRole('button', { name: /Register/i })[0]).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    test("displays error when passwords do not match", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "User" } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
        // fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "differentPassword" } });
        fireEvent.click(screen.getAllByText(/Register/i)[0]);
        // fireEvent.click(screen.getByLabelText(/Register/i));

        expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
    });

    // test("dispatches register action on successful form submission", () => {
    //     store = mockStore({
    //         auth: {
    //             user: null,
    //             isLoading: false,
    //             isError: false,
    //             isSuccess: false,
    //             message: "",
    //         },
    //     });

    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <RegisterPage />
    //             </MemoryRouter>
    //         </Provider>
    //     );

    //     fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
    //     fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Test" } });
    //     fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "User" } });
    //     fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    //     // fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
    //     fireEvent.change(screen.getByLabelText(/Confirm password/i), { target: { value: "password123" } });

    //     fireEvent.click(screen.getByRole("button", { name: /register/i }));

    //     // const actions = store.getActions();
    //     // expect(actions[0]).toEqual(register({
    //     //     username: "testuser",
    //     //     first_name: "Test",
    //     //     last_name: "User",
    //     //     email: "test@example.com",
    //     //     password: "password123",
    //     //     re_password: "password123"
    //     // }));
    //     const actions = store.getActions();
    //     expect(actions).toEqual([
    //         register({
    //             username: "testuser",
    //             first_name: "Test",
    //             last_name: "User",
    //             email: "test@example.com",
    //             password: "password123",
    //             re_password: "password123",
    //         }),
    //         // reset(),
    //     ])
    // });
    store = mockStore({
        auth: {
            user: null,
            isLoading: false,
            isError: false,
            isSuccess: false,
            message: "",
        },
    });

    const mockRegister = jest.fn().mockReturnValue(Promise.resolve());
    const dispatchMock = jest.spyOn(store, 'dispatch');

    render(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        </Provider>
    );

    // fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
    // fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Test" } });
    // fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "User" } });
    // fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    // fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    // fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: "password123" } });

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "User" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    // fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "differentPassword" } });

    // fireEvent.click(screen.getByRole("button", { name: /register/i }));

    const actions = dispatchMock.mock.results[0].value;

    expect(actions.type).toBe(`${reset.type}`);
    // expect(dispatchMock).toHaveBeenCalledWith(register({
    //     username: "testuser",
    //     first_name: "Test",
    //     last_name: "User",
    //     email: "test@example.com",
    //     password: "password123",
    //     re_password: "password123"
    // }));

    // store.dispatch(register({
    //     username: "testuser",
    //     first_name: "Test",
    //     last_name: "User",
    //     email: "test@example.com",
    //     password: "password123",
    //     re_password: "password123"
    // }));

    // expect(dispatchMock).toHaveBeenCalledWith(register.pending.type);
});