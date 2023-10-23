export default function Card({children}) {
    let bgColor = 'blue';
    let footerValue = null;
    let footerValueClass = 'green';

    if (children?.bgColor) {
        bgColor = children.bgColor;
    }

    if (children?.footerValue) {
        footerValue = children.footerValue;
        footerValueClass = footerValue.includes('-') ? 'red' : 'green';
    }

    return (
        <div
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className={"bg-clip-border mx-4 rounded-xl bg-gradient-to-tr from-" + bgColor + "-600 to-" + bgColor + "-400 text-white shadow-" + bgColor + "-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"}>
                {children?.svg}
            </div>
            <div className="p-4 text-right">
                <p className={"block antialiased font-sans text-sm leading-normal font-normal text-" + bgColor + "-gray-600"}>
                    {children?.title}
                </p>
                <h4 className={"block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-" + bgColor + "-gray-900"}>
                    {children?.text}
                </h4>
            </div>
            <div className={"border-t border-" + bgColor + "-gray-50 p-4"}>
                <p className={"block antialiased font-sans text-base leading-relaxed font-normal text-" + bgColor + "-gray-600"}>
                    <strong className={"text-" + footerValueClass + "-500"}>{children?.footerValue}</strong>
                    &nbsp;{children?.footerInfo}
                </p>
            </div>
        </div>
    );
}
