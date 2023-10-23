import {Accordion} from "flowbite-react";
import {router, useForm} from "@inertiajs/react";
import {useEffect, useState} from "react";
import Spinner from "@/Components/Spinner.jsx";

export default function LoadFile({collapsed}) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        spam_type: 0,
        file: [],
    });

    const convertToMB = (bite) => {
        return (bite / 1000000).toFixed(3);
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (key === 'files') {
            let data = [];
            for (let i = 0; i < e.target.files.length; i++) {
                data.push(e.target.files[i]);
            }
            setFiles(data);

            form.setData('files', data);
            return;
        }

        form.setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleSubmit = (e) => {
        if (files && files.length === 0) {
            alert('Необходимо загрузить хотя бы один JSON файл');
            return;
        }

        e.preventDefault();
        setIsLoading(true);
        router.post(
            route('spam.training'),
            form,
            {
                onSuccess: () => {
                    removeAllFiles();
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    }

    const removeFile = (e) => {
        const filteredFiles = files.filter((item, index) => index != e.target.dataset.id);
        setFiles(filteredFiles);
    }

    const removeAllFiles = () => {
        setFiles([]);
    }

    useEffect(() => {
        form.setData('files', files);
    }, [files]);


    const codeExample = `{
  "array": [
    "Вам постоянно требуется текущий ремонт в офисе? ...",
    "Вы обязательно оцените все преимущества сотрудничества с нами...",
    ...
  ]
}`;

    const codeExampleCommon = `{
  "array": [
    "Вам постоянно требуется текущий ремонт в офисе? ...", 1,
    "Вы обязательно оцените все преимущества сотрудничества с нами...", 1,
    ...
  ]
}`;

    const typesExample = `0 - Не спам
1 - Спам
2 - Рекламный
3 - Другой`;

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="mb-10">
                <h2 className="mb-5">Загрузить и обучить с файла</h2>

                <Accordion collapseAll={collapsed}>
                    <Accordion.Panel>
                        <Accordion.Title>
                            Как пользоваться?
                        </Accordion.Title>
                        <Accordion.Content>
                            <div className="text-gray-500 dark:text-gray-400">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    JSON файл должен содержать ключ "array" и строки внутри этого массива.
                                </p>
                                <p>
                                    Пример:
                                    <code className="block whitespace-pre pre overflow-x-auto">
                                        {codeExample}
                                    </code>
                                </p>
                                <p className="my-2 text-gray-500 dark:text-gray-400">
                                    После, выбрать тип слов для обучения, например "Спам" и приступить к загрузке и
                                    обучению.
                                </p>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Если есть необходимость в загрузке общего JSON файла, то необходимо указать тип слов
                                    как "общий" и JSON должен быть следующего вида:
                                </p>
                                <p>
                                    Пример:
                                    <code className="block whitespace-pre pre overflow-x-auto">
                                        {codeExampleCommon}
                                    </code>
                                </p>
                                <p className="my-2 text-gray-500 dark:text-gray-400">
                                    где после текста, через запятую указать тип.
                                </p>
                                <p>
                                    Типы:
                                    <code className="block whitespace-pre pre overflow-x-auto">
                                        {typesExample}
                                    </code>
                                </p>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>

            </div>

            {isLoading &&
                <div className="text-center flex justify-center items-center">
                    <Spinner />
                    <p>Идет загрузка...</p>
                </div>
            }

            {!isLoading &&
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-normal justify-center w-full mb-5">
                        <label htmlFor="spam_types"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Тип слов для обучения
                        </label>
                        <select id="spam_type"
                                name="spam_type"
                                value={form.data.spam_type}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="0">Не спам</option>
                            <option value="1">Спам</option>
                            <option value="2">Рекламный</option>
                            <option value="3">Другой</option>
                            <option value="-1">Общий</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Нажмите для загрузки</span> или перетащите
                                    файл в эту область</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">JSON</p>
                            </div>
                            <input id="dropzone-file" name="files" type="file" className="hidden"
                                   multiple="multiple"
                                   onChange={handleChange}/>
                        </label>
                    </div>

                    {files && files.length > 0 && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3">Файл</th>
                                    <th scope="col" className="px-6 py-3">Вес</th>
                                    <th scope="col" className="px-6 py-3">Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {files.map((file, key) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={key}>
                                            <td scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{file.name}</td>
                                            <td scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{convertToMB(file.size)} МБ
                                            </td>
                                            <td scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <a onClick={removeFile} data-id={key}
                                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Удалить</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="flex items-center justify-center w-full mt-5">
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Загрузить и обучить
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}
