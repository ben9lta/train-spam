import {Label, Modal} from 'flowbite-react';
import {useEffect, useState} from "react";
import SpamType from "@/Components/Form/SpamType.jsx";

export default function Edit({item, closeModal, refresh}) {
    const [openModal, setOpenModal] = useState(null);

    const [form, setForm] = useState({
        spam_type: item?.spam_type,
        text: item?.text,
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setForm(values => ({
            ...values,
            [key]: value,
        }))
    }

    const close = () => {
        setOpenModal(null);
        closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(route('spam.update', item.id), form)
            .then(response => {
                if (response.data) {
                    refresh();
                }
            })
            .finally(close);
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
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Редактирование
                            № {item.id}</h3>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="text" value="Текст"/>
                                </div>
                                <textarea id="text"
                                          name="text"
                                          value={form.text}
                                          required
                                          onChange={handleChange}
                                          rows="4"
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                            </textarea>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="spam_type" value="Категория"/>
                                </div>
                                <SpamType name='spam_type' value={form.spam_type} handleChange={handleChange}/>
                            </div>

                            <div className="mt-5">
                                <button type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        )
    )
}
