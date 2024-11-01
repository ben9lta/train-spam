import {Pagination, Table, Spinner} from 'flowbite-react';
import {useEffect, useState, useCallback} from "react";
import {SpamTypeHelper} from "@/Helpers/SpamTypeHelper.jsx";
import Delete from "@/Pages/Spam/IncomingMessages/Partials/List/Delete.jsx";

export default function List() {
    const [paginate, setPaginate] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsLoading, setItemsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const queryParams = new URLSearchParams(window.location.search);

    const openModal = useCallback((item) => {
        if (!isDeleting) {
            setSelectedItem(item);
        }
    }, [isDeleting]);

    const closeModal = useCallback(() => {
        setSelectedItem(null);
    }, []);

    const handleItemDelete = useCallback((deletedId) => {
        // Удаляем запись с указанным ID из состояния
        setPaginate((prevPaginate) => ({
            ...prevPaginate,
            data: prevPaginate.data.filter(item => item.id !== deletedId),
        }));
    }, []);

    const onPageChange = useCallback((page) => {
        setCurrentPage(page);
        queryParams.set('page', page);
        window.history.replaceState(null, '', `?${queryParams.toString()}`);

        if (paginate.path) {
            getItems(page);
        }
    }, [paginate.path, queryParams]);

    const getItems = useCallback(async (paginatePage) => {
        setItemsLoading(true);
        try {
            const response = await axios.post(route('spam.incoming.paginate', paginatePage));
            setPaginate(response.data);
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setItemsLoading(false);
        }
    }, []);


    const transformTime = useCallback((time) => {
        return new Date(time).toLocaleString();
    }, []);

    useEffect(() => {
        getItems(currentPage);
    }, [currentPage, getItems]);

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            {isDeleting ? (
                <div className="text-center">
                    <Spinner /> Удаление...
                </div>
            ) : itemsLoading
                ? (
                    <div className="text-center">
                        <Spinner size="md"/> Загрузка...
                    </div>
                )
                : (
                    <>
                        {
                            selectedItem && <Delete
                                closeModal={closeModal}
                                item={selectedItem}
                                onDelete={handleItemDelete}
                                setIsDeleting={setIsDeleting}
                            />
                        }
                        <div className="overflow-x-auto">
                            <Table>
                            <Table.Head>
                                <Table.HeadCell>
                                    №
                                </Table.HeadCell>
                                <Table.HeadCell style={{minWidth: '24rem'}}>
                                    Текст
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Категория
                                </Table.HeadCell>
                                <Table.HeadCell style={{minWidth: '8rem'}}>
                                    Данные с запроса
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Время
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
                                            {item?.text.substring(0, 250) + '...'}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {SpamTypeHelper.translate(item?.spam_type)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item?.request}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {transformTime(item?.created_at)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <a
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                onClick={() => openModal(item)}
                                                href="#"
                                            >
                                                <p>
                                                    Удалить
                                                </p>
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                        </div>

                        <div className="flex items-center justify-center text-center">
                            {paginate?.data && paginate?.total > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    onPageChange={onPageChange}
                                    totalPages={paginate?.last_page}
                                    nextLabel={'Далее'}
                                    previousLabel={'Назад'}
                                />
                            )}
                        </div>
                    </>
                )
            }


        </div>
    )
}
