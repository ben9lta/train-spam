import{r as a,j as e}from"./app-2b8c7948.js";import{C as j}from"./Tooltip-e1082433.js";import{S as g}from"./Spinner-0641cbcc.js";import{S as m}from"./SpamTypeHelper-95368d74.js";function S(){const[i,r]=a.useState(!1),[c,d]=a.useState(null),[u,o]=a.useState([]),x=t=>{const s=Number(t.target.dataset.value),l=t.target.checked;o(p=>{let n=[...p];return l&&!n.includes(s)?n.push(s):l||(n=n.filter(b=>b!==s)),n})},h=t=>{t.preventDefault(),d(null),r(!0),axios.post(route("download.files"),{spamTypeList:u}).then(s=>{const l=s.data.download_link;l&&(d(l),window.open(l,"_blank"))}).catch(s=>{console.log(s)}).finally(()=>{r(!1),o([])})},f=Object.entries(m.getList()).map(([t,s])=>e.jsxs("div",{className:"inline-flex",children:[e.jsx(j,{id:t,name:t,"data-value":s,onChange:l=>x(l)}),e.jsx("label",{htmlFor:t,className:"block mx-2 mb-2 text-sm font-medium text-gray-900 dark:text-white",children:m.translate(s)})]},t));return e.jsxs(e.Fragment,{children:[c&&e.jsx("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e.jsxs("div",{className:"text-center flex flex-col justify-center items-center",children:[e.jsx("p",{children:"Файл готов к скачиванию."}),e.jsxs("p",{children:["Если файл не скачивается, нажмите на ",e.jsx("a",{href:c,className:"font-medium text-blue-600 dark:text-blue-500 hover:underline",target:"_blank",children:"ссылку"}),", чтобы начать загрузку."]})]})}),e.jsxs("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:[e.jsx("div",{className:"mb-10",children:e.jsx("h2",{className:"mb-5",children:"Выгрузка файлов"})}),i&&e.jsxs("div",{className:"text-center flex justify-center items-center",children:[e.jsx(g,{}),e.jsx("p",{children:"Идет загрузка..."})]}),!i&&e.jsxs("form",{onSubmit:h,children:[e.jsx("div",{className:"flex flex-col items-normal justify-center w-full mb-5",children:e.jsxs("div",{className:"w-full sm:w-1/2",children:[e.jsx("h2",{children:"Тип слов (Словарь)"}),e.jsx("div",{className:"flex flex-col py-3",children:f})]})}),e.jsx("div",{className:"flex items-center justify-center w-full mt-5",children:e.jsx("button",{type:"submit",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Выгрузить"})})]})]})]})}export{S as default};
