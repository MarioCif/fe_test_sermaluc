import { DeleteConfirmationModalProps } from '../../interfaces/props.interface';
import './delete-user-modal.style.css'



export const DeleteUserModal = ({
    isOpen,
    onClose,
    onDelete,
    userName,
}: DeleteConfirmationModalProps) => {
    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>Are you sure you want to delete {userName}?</h3>
                    <button onClick={onDelete}>Yes, Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
    );
};