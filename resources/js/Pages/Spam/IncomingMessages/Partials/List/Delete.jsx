import {Modal} from 'flowbite-react';
import {useEffect, useState, useCallback} from "react";
import Spinner from "@/Components/Spinner.jsx";

function Delete({item, closeModal, onDelete, setIsDeleting}) {
    const [openModal, setOpenModal] = useState(null);
    const [form, setForm] = useState({ id: item?.id });

    const close = useCallback(() => {
        setOpenModal(null);
        closeModal();
    }, [closeModal]);

    const handleDelete = useCallback(async (e) => {
        e.preventDefault();
        setIsDeleting(true);

        try {
            const response = await axios.post(route('spam.incomingMessage.delete', item.id), form);
            if (response.data) {
                onDelete(item.id);
            }
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            alert('Ошибка при удалении записи');
        } finally {
            close();
            setIsDeleting(false);
        }
    }, [item, form, close, onDelete, setIsDeleting]);

    const handleCancel = useCallback((e) => {
        e.preventDefault();
        close();
    }, [close]);

    useEffect(() => {
        setOpenModal(item);
    }, [item]);

    return (
        item && (
            <Modal show={openModal} size="md" popup onClose={close}>
                <Modal.Header/>
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Вы действительно хотите удалить запись № {item.id}?</h3>

                        <div className="flex justify-center gap-1">
                        <button type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={handleDelete}
                        >
                            Удалить
                        </button>

                        <button type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={handleCancel}
                        >
                            Отменить
                        </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    )
}

export default Delete;
