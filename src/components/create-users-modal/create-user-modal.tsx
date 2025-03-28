import { useState } from "react";
import './create-user-modal.css';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: { name: string; email: string; password: string; phone: string; phone2: string, citycode: string; isActive: boolean }) => void;
}

export const CreateUserModal = ({ isOpen, onClose, onRegister }: NewUserModalProps) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    phone2: '',
    citycode: '',
    isActive: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(userData);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal">
          <h3>Registrar Nuevo Usuario</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="contraseña"
                  placeholder="contraseña"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Teléfono 1:</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Teléfono 1"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="phone2">Teléfono 2:</label>
                <input
                  type="text"
                  id="phone2"
                  placeholder="Teléfono 2"
                  value={userData.phone2}
                  onChange={(e) => setUserData({ ...userData, phone2: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label htmlFor="citycode">Código de Ciudad:</label>
                <input
                  type="text"
                  id="citycode"
                  placeholder="Código"
                  value={userData.citycode}
                  onChange={(e) => setUserData({ ...userData, citycode: e.target.value })}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isActive"
                checked={userData.isActive}
                onChange={(e) => setUserData({ ...userData, isActive: e.target.checked })}
              />
              <label htmlFor="isActive">Activo</label>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn">Registrar</button>
              <button type="button" className="btn" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

