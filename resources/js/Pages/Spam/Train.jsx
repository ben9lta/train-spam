import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import LoadFile from "@/Pages/Spam/Train/Partials/LoadFile.jsx";
import {useEffect, useState} from "react";
import List from "@/Pages/Spam/Train/Partials/List/List.jsx";

export default function SpamTrain({auth}) {
    const [linkType, setLinkType] = useState(0);
    const LoadFileCollapsed = true;

    const renderLink = (type = 0) => {
        switch(type) {
            case 1:
                return <List />;
            case 2:
                return 123;
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
                    <li onClick={() => setLinkType(0)}
                        className={(linkType === 0 ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Загрузка с файла</a>
                    </li>
                    <li onClick={() => setLinkType(1)}
                        className={(linkType === 1 ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Список</a>
                    </li>
                    <li onClick={() => setLinkType(2)}
                        className={(linkType === 2 ? activeLinkStyle : null) + " " + linkStyle}>
                        <a>Что-то еще</a>
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
