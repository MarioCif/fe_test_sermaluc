import React, { useState } from 'react';
import './login.style.css';

interface LogInProps {
  isOpen: boolean;
  onClose: () => void;
  onLogIn: (userOptions: {email: string; password: string}) => void;
}

export const LoginComponent = ({ isOpen, onClose, onLogIn }: LogInProps) => {


  const [userOptions, setUserOptions] = useState ({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogIn(userOptions);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='content-left'>
              <label>Email:</label>
              <input
                className='input-login'
                type="email"
                value={userOptions.email}
                onChange={(e) => setUserOptions({ ...userOptions, email: e.target.value })}
                required
              />
            </div>
            <div className='content-left'>
              <label>Password:</label>
              <input
                className='input-login'
                type="password"
                value={userOptions.password}
                onChange={(e) => setUserOptions({ ...userOptions, password: e.target.value })}
                required
              />
            </div>
            <button className='button-login' type="submit">LogIn</button>
            <button className='button-cancel' onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    )
  );
  
};
