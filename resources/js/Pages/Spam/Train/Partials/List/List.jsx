import {Pagination, Table, Spinner} from 'flowbite-react';
import {useEffect, useState} from "react";
import Edit from "@/Pages/Spam/Train/Partials/List/Edit.jsx";
import {translate} from "@/Helpers/SpamTypeHelper.jsx";

export default function List() {
    const [paginate, setPaginate] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsLoading, setItemsLoading] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const refreshItems = () => {
        getItems(currentPage);
    }

    const openModal = (item) => {
        setSelectedItem(item);
    }

    const closeModal = () => {
        setSelectedItem(null);
    }

    const onPageChange = (page) => {
        setCurrentPage(page);

        if (paginate.path) {
            getItems(page);
        }
    }

    const getItems = (paginatePage) => {
        setItemsLoading(true);

        axios.post(route('spam.paginate', paginatePage))
            .then(response => {
                setPaginate(response.data);
            })
            .finally(() => {
                setItemsLoading(false);
            })
    }

    useEffect(() => getItems(currentPage), []);

    useEffect(() => {}, [currentPage]);
    useEffect(() => {}, [paginate]);

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            {
                itemsLoading
                ? (
                    <div className="text-center">
                        <Spinner size="md"/> Загрузка...
                    </div>
                )
                : (
                    <>
                        {
                            selectedItem && <Edit closeModal={closeModal} item={selectedItem} refresh={refreshItems} />
                        }
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>
                                    №
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Текст
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Категория
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Действия
                                </Table.HeadCell>
                            </Table.Head>

                            <Table.Body className="divide-y">
                                {paginate?.data && paginate.data.map((item) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                                        <Table.Cell
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item?.id}
                                        </Table.Cell>
                                        <Table.Cell className="break-all">
                                            {item?.text}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {translate(item?.spam_type)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <a
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                onClick={() => openModal(item)}
                                                href="#"
                                            >
                                                <p>
                                                    Изменить
                                                </p>
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>

                        <div className="flex items-center justify-center text-center">
                            {
                                paginate?.data && paginate?.total > 0 &&
                                <Pagination
                                    currentPage={currentPage}
                                    onPageChange={onPageChange}
                                    totalPages={paginate?.last_page}
                                    nextLabel={'Далее'}
                                    previousLabel={'Назад'}
                                />
                            }
                        </div>
                    </>
                )
            }


        </div>
    )
}
