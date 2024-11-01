import {Checkbox} from "flowbite-react";
import {useState} from "react";
import Spinner from "@/Components/Spinner.jsx";
import {SpamTypeHelper} from '@/Helpers/SpamTypeHelper.jsx';


export default function DownloadFile() {
    const [isLoading, setIsLoading] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);
    const [selectedSpamTypeList, setSelectedSpamTypeList] = useState([]);

    const handleCheckboxChange = (e) => {
        const value = Number(e.target.dataset.value);
        const checked = e.target.checked;

        setSelectedSpamTypeList(prevList => {
            let updatedList = [...prevList];
            if (checked && !updatedList.includes(value)) {
                updatedList.push(value);
            } else if (!checked) {
                updatedList = updatedList.filter(item => item !== value);
            }
            return updatedList;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDownloadLink(null);
        setIsLoading(true);

        axios.post(route('download.files'), {spamTypeList: selectedSpamTypeList})
            .then((response) => {
                const link = response.data.download_link
                if (link) {
                    setDownloadLink(link);
                    window.open(link, '_blank');
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
                setSelectedSpamTypeList([]);
            });
    };

    const spamTypeCheckboxList = Object
        .entries(SpamTypeHelper.getList())
        .map(([key, value]) =>
            (
                <div className="inline-flex" key={key}>
                    <Checkbox
                        id={key}
                        name={key}
                        data-value={value}
                        onChange={(e) => handleCheckboxChange(e)}
                    />
                    <label htmlFor={key}
                           className="block mx-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {SpamTypeHelper.translate(value)}
                    </label>
                </div>
            )
        );

    return (
        <>
            {downloadLink &&
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className="text-center flex flex-col justify-center items-center">
                        <p>Файл готов к скачиванию.</p>
                        <p>Если файл не скачивается, нажмите на&nbsp;
                        <a href={downloadLink}
                           className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                           target="_blank">ссылку</a>, чтобы начать загрузку.</p>
                    </div>
                </div>
            }
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="mb-10">
                <h2 className="mb-5">Выгрузка файлов</h2>
            </div>

            {isLoading &&
                <div className="text-center flex justify-center items-center">
                    <Spinner/>
                    <p>Идет загрузка...</p>
                </div>
            }

            {!isLoading &&
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-normal justify-center w-full mb-5">
                        <div className="w-full sm:w-1/2">
                            <h2>Тип слов (Словарь)</h2>
                            <div className="flex flex-col py-3">
                                {spamTypeCheckboxList}
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-5">
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Выгрузить
                        </button>
                    </div>
                </form>
            }
        </div>
        </>
    )
}
