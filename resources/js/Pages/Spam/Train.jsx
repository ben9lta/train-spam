import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import LoadFile from "@/Pages/Spam/Train/Partials/LoadFile.jsx";
import DownloadFile from "@/Pages/Spam/Train/Partials/DownloadFile.jsx";
import {useEffect, useState} from "react";
import List from "@/Pages/Spam/Train/Partials/List/List.jsx";
import IncomingList from "@/Pages/Spam/IncomingMessages/Partials/List/List.jsx";

export default function SpamTrain({auth}) {
    const [linkType, setLinkType] = useState(0);
    const LoadFileCollapsed = true;

    const LinkTypes = {
        'LOAD_FILE': 0,
        'LIST': 1,
        'INCOMING_LIST': 2,
        'DOWNLOAD_FILE': 3,
    }
    const renderLink = (type = LinkTypes.LOAD_FILE) => {
        switch(type) {
            case LinkTypes.LIST:
                return <List />;
            case LinkTypes.DOWNLOAD_FILE:
                return <DownloadFile />;
            case LinkTypes.INCOMING_LIST:
                return <IncomingList />;
            default:
                return <LoadFile collapsed={LoadFileCollapsed}/>;
        }
    }

    useEffect(() => {}, [linkType]);

    const linkStyle = "cursor-pointer p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800";
    const activeLinkStyle = "border-b-2 border-indigo-400 text-gray-900 focus:border-indigo-700";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight px-2">Обучение обнаружения спама</h2>}
            links={
                <ul className="flex">
                    <li onClick={() => setLinkType(LinkTypes.LOAD_FILE)}
                        className={(linkType === LinkTypes.LOAD_FILE ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Загрузка с файла</a>
                    </li>
                    <li onClick={() => setLinkType(LinkTypes.DOWNLOAD_FILE)}
                        className={(linkType === LinkTypes.DOWNLOAD_FILE ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Выгрузка файла</a>
                    </li>
                    <li onClick={() => setLinkType(LinkTypes.LIST)}
                        className={(linkType === LinkTypes.LIST ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Словарь</a>
                    </li>
                    <li onClick={() => setLinkType(LinkTypes.INCOMING_LIST)}
                        className={(linkType === LinkTypes.INCOMING_LIST ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Входящие сообщения с сайта</a>
                    </li>
                </ul>
            }
        >
            <Head title="Обучение обнаружения спама"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {renderLink(linkType)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
