
export default function Avtaar({firstName, lastName}){
    

    return <div className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-black bg-black text-white hover:bg-gray-800">
        <div>{firstName[0]}{lastName[0]}</div>
    </div>
}