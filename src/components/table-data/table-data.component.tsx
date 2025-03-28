import { useEffect, useState } from "react";
import { UserService } from "../../services/users.service";
import { RegisterUsers, User } from "../../interfaces/users.interface";
import './table-data.style.css';
import { DeleteUserModal } from "../delete-users-modal/delete-user-modal";
import { CreateUserModal } from "../create-users-modal/create-user-modal";
import { AuthService } from "../../services/auth.service";
import toast, { Toaster } from 'react-hot-toast';
import { LoginComponent } from "../login/login.component";


export const TableDataComponent = () => {

    const [ users, setUsers ] = useState <User[]>([]);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLogInModalOpen, setLogInModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const getUsers = async() => {
        try {
            const users_response = await UserService.getAllUsers();
            setUsers(users_response);
        } catch (error) {
            console.log(error);
        }
    }

    const openDeleteModal = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleDelete = async() => {
        if (userToDelete) {
            try {
                console.log(`Deleted user: ${userToDelete.name}`);
                await UserService.deleteUserById(userToDelete.user_id);
                toast.success(`User ${userToDelete.name} deleted successfully!`, {
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
            } catch (error) {
                console.log(error)
                toast.error('Error deleting user!', {
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
            }
            getUsers();
            closeDeleteModal();
        }
    };

    const openNewUserModal = () => {
        setIsNewUserModalOpen(true);
    };
    
    const closeNewUserModal = () => {
        setIsNewUserModalOpen(false);
    };

      const handleSubmit = async(logInUser: { email: string; password: string}) => {
    
        try {
          const response = await AuthService.logIn(logInUser.email, logInUser.password);
          if (response) {
            toast.success(`LogIn successfully!`, {
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
          }
        } catch (err) {
            toast.error('Password or Email mismatch!', {
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
            console.log('An error occurred. Please try again.' + err);
        }
      };
    
      const handleRegister = async(newUserData: { name: string; email: string; password: string; phone: string, phone2: string, citycode: string; isActive: boolean }) => {
        const newUser: RegisterUsers = {
            name: newUserData.name,
            email: newUserData.email,
            password: newUserData.password,
            phones: [{
                number: parseInt(newUserData.phone),
                citycode: parseInt(newUserData.citycode),
                countrycode: 56
            },
            {
                number: parseInt(newUserData.phone2),
                citycode: parseInt(newUserData.citycode),
                countrycode: 56,
            }]
        } 
        try {
            console.log("Registering new user:", newUserData);
            await AuthService.registerUser(newUser);
            toast.success(`User ${newUser.name} register successfully!`, {
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
        } catch (error) {
            console.log(error);
            toast.error('Error on register new user!', {
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
        }
        getUsers();
      };

    const openEditModal = () => {
        console.log("wip!")
    }

    const openLogInModal = () => {
        setLogInModalOpen(true);
    }

    const closeLogInModal = () => {
        setLogInModalOpen(false);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="table-container">
            <Toaster />
            <div className="table-data">
                <div className="title-container">
                    <h1>Mantenedor de Usuarios</h1>
                </div>
                <div className="button-container">
                    <button className="login-button" onClick={openLogInModal}>LogIn</button>
                    <button className="add-button" onClick={openNewUserModal}>Agregar</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Último Ingreso</th>
                            <th>Contacto</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) =>(
                            <tr key={user.user_id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.last_login}</td>
                                <td>{user.phones.map((phone, index) => (
                                    <span key={index}>
                                        {phone.number}
                                        <br />
                                    </span>
                                ))}</td>
                                <td>
                                    <img src={user.isActive ? "src/assets/check.svg": "src/assets/cross.svg"} />
                                </td>
                                <td>
                                    <button className="delete" onClick={() => openDeleteModal(user)}>
                                        <img src="src\assets\delete.svg" />
                                    </button>
                                    <button className="edit" onClick={openEditModal}>
                                        <img src="src\assets\edit.svg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <CreateUserModal
                    isOpen={isNewUserModalOpen}
                    onClose={closeNewUserModal}
                    onRegister={handleRegister}
                />
                <DeleteUserModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                    userName={userToDelete ? userToDelete.name : ""}
                />

                <LoginComponent 
                    isOpen={isLogInModalOpen}
                    onClose={closeLogInModal}
                    onLogIn={handleSubmit}
                />
            </div>
        </div>
    )
}