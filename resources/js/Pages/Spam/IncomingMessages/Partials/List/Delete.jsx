import {Label, Modal} from 'flowbite-react';
import {useEffect, useState} from "react";
import SpamType from "@/Components/Form/SpamType.jsx";

export default function Delete({item, closeModal, refresh}) {
    const [openModal, setOpenModal] = useState(null);

    const [form, setForm] = useState({
        id: item?.id,
    });

    const close = () => {
        setOpenModal(null);
        closeModal();
    }

    const handleDelete = (e) => {
        e.preventDefault()
        axios.post(route('spam.incomingMessage.delete', item.id), form)
            .then(response => {
                if (response.data) {
                    refresh();
                }
            })
            .finally(close);
    }

    const handleCancel = (e) => {
        e.preventDefault()
        close();
    }

    useEffect(() => {
        setOpenModal(item);
    }, []);

    return (
        item && (
            <Modal show={openModal} size="md" popup onClose={close}>
                <Modal.Header/>
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Вы действительно хотите удалить запись № {item.id}?</h3>

                        <div className="flex justify-center gap-1">
                        <button type="submit"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={handleDelete}
                        >
                            Удалить
                        </button>

                        <button type="submit"
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
