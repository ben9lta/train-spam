import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Card from "@/Components/Dashboard/Card.jsx";
import PersonIcon from "@/Components/Dashboard/Icons/PersonIcon.jsx";

export default function Dashboard({auth, textCount}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 auto-cols-auto">
                        {/*<Card>*/}
                        {/*    {{*/}
                        {/*        svg: <MoneyIcon />,*/}
                        {/*        title: 'Баланс',*/}
                        {/*        text: '0',*/}
                        {/*        bgColor: 'blue',*/}
                        {/*    }}*/}
                        {/*</Card>*/}
                        <Card>
                            {{
                                svg: <PersonIcon />,
                                title: 'Загруженного текста',
                                text: textCount,
                                bgColor: 'pink',
                                // footerValue: '+3%',
                                // footerInfo: 'than last month',
                            }}
                        </Card>
                        {/*<Card>*/}
                        {/*    {{*/}
                        {/*        svg: <PersonPlusIcon />,*/}
                        {/*        title: 'New Clients',*/}
                        {/*        text: '3,462',*/}
                        {/*        bgColor: 'green',*/}
                        {/*        footerValue: '-2%',*/}
                        {/*        footerInfo: 'than yesterday',*/}
                        {/*    }}*/}
                        {/*</Card>*/}
                        {/*<Card>*/}
                        {/*    {{*/}
                        {/*        svg: <ChartIcon />,*/}
                        {/*        title: 'Sales',*/}
                        {/*        text: '$103,430',*/}
                        {/*        bgColor: 'orange',*/}
                        {/*        footerValue: '+5%',*/}
                        {/*        footerInfo: 'than yesterday',*/}
                        {/*    }}*/}
                        {/*</Card>*/}
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
