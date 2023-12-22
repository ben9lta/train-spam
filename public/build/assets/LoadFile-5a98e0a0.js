import{r as i,W as v,j as e,y as S}from"./app-3d82188f.js";import{A as o}from"./Tooltip-78463a86.js";import{S as F}from"./Spinner-8d7698a0.js";import{S as c}from"./SpamTypeHelper-95368d74.js";function A({collapsed:g}){const[s,n]=i.useState([]),[x,m]=i.useState(!1),l=v({spam_type:c.HAM,file:[]}),u=Object.entries(c.getList()).map(([t,r])=>r!==c.COMMON&&e.jsx("option",{value:r,children:c.translate(r)},r)),f=t=>(t/1e6).toFixed(3),h=t=>{const r=t.target.name,p=t.target.value;if(r==="files"){let a=[];for(let d=0;d<t.target.files.length;d++)a.push(t.target.files[d]);n(a),l.setData("files",a);return}l.setData(a=>({...a,[r]:p}))},y=t=>{if(s&&s.length===0){alert("Необходимо загрузить хотя бы один JSON файл");return}t.preventDefault(),m(!0),S.post(route("spam.training"),l,{onSuccess:()=>{j()},onError:r=>{console.log(r)},onFinish:r=>{m(!1)}})},b=t=>{const r=s.filter((p,a)=>a!=t.target.dataset.id);n(r)},j=()=>{n([])};i.useEffect(()=>{l.setData("files",s)},[s]);const k=`[
    "Вам постоянно требуется текущий ремонт в офисе? ...",
    "Вы обязательно оцените все преимущества сотрудничества с нами...",
    ...
]`,N=`[
    "Вам постоянно требуется текущий ремонт в офисе? ...", 1,
    "Вы обязательно оцените все преимущества сотрудничества с нами...", 1,
    ...
]`,w=`0 - Не спам
1 - Спам
2 - Рекламный
3 - Другой`;return e.jsxs("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:[e.jsxs("div",{className:"mb-10",children:[e.jsx("h2",{className:"mb-5",children:"Загрузить и обучить с файла"}),e.jsx(o,{collapseAll:g,children:e.jsxs(o.Panel,{children:[e.jsx(o.Title,{children:"Как пользоваться?"}),e.jsxs(o.Content,{children:[e.jsxs("div",{className:"text-gray-500 dark:text-gray-400",children:[e.jsx("p",{className:"mb-2 text-gray-500 dark:text-gray-400",children:'JSON файл должен содержать ключ "array" и строки внутри этого массива.'}),e.jsxs("p",{children:["Пример:",e.jsx("code",{className:"block whitespace-pre pre overflow-x-auto",children:k})]}),e.jsx("p",{className:"my-2 text-gray-500 dark:text-gray-400",children:'После, выбрать тип слов для обучения, например "Спам" и приступить к загрузке и обучению.'})]}),e.jsxs("div",{className:"text-gray-500 dark:text-gray-400",children:[e.jsx("p",{className:"mb-2 text-gray-500 dark:text-gray-400",children:'Если есть необходимость в загрузке общего JSON файла, то необходимо указать тип слов как "общий" и JSON должен быть следующего вида:'}),e.jsxs("p",{children:["Пример:",e.jsx("code",{className:"block whitespace-pre pre overflow-x-auto",children:N})]}),e.jsx("p",{className:"my-2 text-gray-500 dark:text-gray-400",children:"где после текста, через запятую указать тип."}),e.jsxs("p",{children:["Типы:",e.jsx("code",{className:"block whitespace-pre pre overflow-x-auto",children:w})]})]})]})]})})]}),x&&e.jsxs("div",{className:"text-center flex justify-center items-center",children:[e.jsx(F,{}),e.jsx("p",{children:"Идет загрузка..."})]}),!x&&e.jsxs("form",{onSubmit:y,children:[e.jsxs("div",{className:"flex flex-col items-normal justify-center w-full mb-5",children:[e.jsx("label",{htmlFor:"spam_types",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Тип слов для обучения"}),e.jsx("select",{id:"spam_type",name:"spam_type",value:l.data.spam_type,onChange:h,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:u})]}),e.jsx("div",{className:"flex items-center justify-center w-full",children:e.jsxs("label",{htmlFor:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[e.jsx("svg",{className:"w-8 h-8 mb-4 text-gray-500 dark:text-gray-400","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"})}),e.jsxs("p",{className:"mb-2 text-sm text-gray-500 dark:text-gray-400",children:[e.jsx("span",{className:"font-semibold",children:"Нажмите для загрузки"})," или перетащите файл в эту область"]}),e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"JSON"})]}),e.jsx("input",{id:"dropzone-file",name:"files",type:"file",className:"hidden",multiple:"multiple",onChange:h})]})}),s&&s.length>0&&e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg",children:e.jsxs("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Файл"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Вес"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Действия"})]})}),e.jsx("tbody",{children:s.map((t,r)=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[e.jsx("td",{scope:"row",className:"px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.name}),e.jsxs("td",{scope:"row",className:"px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:[f(t.size)," МБ"]}),e.jsx("td",{scope:"row",className:"px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.jsx("a",{onClick:b,"data-id":r,className:"font-medium text-blue-600 dark:text-blue-500 hover:underline",children:"Удалить"})})]},r))})]})}),e.jsx("div",{className:"flex items-center justify-center w-full mt-5",children:e.jsx("button",{type:"submit",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Загрузить и обучить"})})]})]})}export{A as default};
