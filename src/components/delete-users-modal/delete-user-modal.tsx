import './delete-user-modal.style.css'

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    userName: string;
}

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