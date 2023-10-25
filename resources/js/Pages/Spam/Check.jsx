import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useState} from "react";
import Spinner from "@/Components/Spinner.jsx";

export default function SpamTrain({auth}) {

    const [classify, setClassify] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        text: ''
    });

    const handleSubmit = (e) => {
        setClassify(null);
        setProcessing(true);
        e.preventDefault();

        axios.post(route('spam.check'), data)
            .then((response) => {
                setClassify(response.data.translate);
            })
            .finally(() => {
                setProcessing(false);
            });
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setData(data => ({
            ...data,
            [key]: value,
        }));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Spam Checker Page</h2>}
        >
            <Head title="Spam Checker Page"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="mb-10">Проверить сообщение на спам</h2>
                        <form onSubmit={handleSubmit}>
                            {classify !== null && (
                                <h3 className="text-center uppercase font-bold">{classify}</h3>
                            )}

                            <div className="flex flex-col items-normal justify-center w-full mb-5">
                                <label htmlFor="text"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Введите текст для проверки
                                </label>
                                <textarea id="text"
                                          name="text"
                                          value={data.text}
                                          required
                                          onChange={handleChange}
                                          rows="4"
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          placeholder="Здесь должен быть текст для проверки">
                                </textarea>
                            </div>

                            <div className="flex items-center justify-center w-full mt-5">
                                <button type="submit"
                                        disabled={!!processing}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                    <div className="flex justify-center text-center">
                                        <span className="mx-2">Провериить</span>
                                        {processing && <Spinner />}
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
