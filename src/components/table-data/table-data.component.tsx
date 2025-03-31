import { useEffect, useState } from "react";
import { UserService } from "../../services/users.service";
import { RegisterUsers, User } from "../../interfaces/users.interface";
import './table-data.style.css';
import { DeleteUserModal } from "../delete-users-modal/delete-user-modal";
import { CreateUserModal } from "../create-users-modal/create-user-modal";
import { AuthService } from "../../services/auth.service";
import toast, { Toaster } from 'react-hot-toast';
import { LoginComponent } from "../login/login.component";

const showToast = (type: "success" | "error", message: string) => {
    toast[type](message, {
        duration: 3000,
        position: 'bottom-right',
        style: {
            border: '1px solid',
            padding: '16px',
            fontFamily: 'sans-serif',
            fontWeight: '500'
        },
        iconTheme: {
            primary: '#0058C7',
            secondary: '#FFFFFF'
        }
    });
};

export const TableDataComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLogInModalOpen, setLogInModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const getUsers = async () => {
        try {
            const users_response = await UserService.getAllUsers();
            setUsers(users_response);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const toggleModal = (modalName: string, state?: boolean) => {
        switch (modalName) {
            case "delete":
                setIsDeleteModalOpen(state ?? !isDeleteModalOpen);
                break;
            case "newUser":
                setIsNewUserModalOpen(state ?? !isNewUserModalOpen);
                break;
            case "logIn":
                setLogInModalOpen(state ?? !isLogInModalOpen);
                break;
            default:
                break;
        }
    };

    const handleDelete = async () => {
        if (userToDelete) {
            try {
                await UserService.deleteUserById(userToDelete.user_id);
                showToast("success", `User ${userToDelete.name} deleted successfully!`);
                getUsers();
                toggleModal("delete", false);
            } catch (error) {
                showToast("error", "Error deleting user!" + error);
            }
        }
    };

    const handleSubmit = async (logInUser: { email: string; password: string }) => {
        try {
            const response = await AuthService.logIn(logInUser.email, logInUser.password);
            if (response) showToast("success", "Login successful!");
        } catch (err) {
            showToast("error", "Password or Email mismatch!");
            console.error('Login error:', err);
        }
    };

    const handleRegister = async (newUserData: { name: string; email: string; password: string; phone: string; phone2: string; citycode: string; }) => {
        const newUser: RegisterUsers = {
            name: newUserData.name,
            email: newUserData.email,
            password: newUserData.password,
            phones: [
                { number: parseInt(newUserData.phone), citycode: parseInt(newUserData.citycode), countrycode: 56 },
                { number: parseInt(newUserData.phone2), citycode: parseInt(newUserData.citycode), countrycode: 56 }
            ]
        };

        try {
            await AuthService.registerUser(newUser);
            showToast("success", `User ${newUser.name} registered successfully!`);
            getUsers();
        } catch (error) {
            showToast("error", "Error registering user!");
            console.error("Registration error:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="table-container">
            <Toaster />
            <div className="table-data">
                <div className="title-container">
                    <h1>User Management</h1>
                </div>
                <div className="button-container">
                    <button className="login-button" onClick={() => toggleModal("logIn")}>LogIn</button>
                    <button className="add-button" onClick={() => toggleModal("newUser")}>Add User</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Last Login</th>
                            <th>Contact</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.last_login}</td>
                                <td>
                                    {user.phones.map((phone, index) => (
                                        <span key={index}>{phone.number}<br /></span>
                                    ))}
                                </td>
                                <td>
                                    <img src={user.isActive ? "src/assets/check.svg" : "src/assets/cross.svg"} alt="Active Status" />
                                </td>
                                <td>
                                    <button className="delete" onClick={() => { setUserToDelete(user); toggleModal("delete", true); }}>
                                        <img src="src/assets/delete.svg" alt="Delete" />
                                    </button>
                                    <button className="edit" onClick={() => console.log("Edit functionality coming soon!")}>
                                        <img src="src/assets/edit.svg" alt="Edit" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <CreateUserModal
                    isOpen={isNewUserModalOpen}
                    onClose={() => toggleModal("newUser", false)}
                    onRegister={handleRegister}
                />
                <DeleteUserModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => toggleModal("delete", false)}
                    onDelete={handleDelete}
                    userName={userToDelete ? userToDelete.name : ""}
                />
                <LoginComponent
                    isOpen={isLogInModalOpen}
                    onClose={() => toggleModal("logIn", false)}
                    onLogIn={handleSubmit}
                />
            </div>
        </div>
    );
};
