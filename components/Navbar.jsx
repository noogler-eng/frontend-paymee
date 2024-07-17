import { userAtom } from "../store/atoms/user_atom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Avtaar from "./Avtaar";

export default function Navbar(){
    
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    
    const handelSignUp = () => {
        navigate('/');
    }

    const handelLogout = () => {
        localStorage.clear('token');
        navigate('/');
    }

    return <div className="w-screen flex justify-between items-center p-4">
        <h1 className="bg-gradient-to-r from-black via-purple-600 to-white bg-clip-text text-transparent text-5xl font-semibold">paymee</h1>
        <div className="flex gap-4 justify-center items-center">
            {user ? <button onClick={handelLogout} className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500">logout</button> : null}
            {user == null ? <button onClick={handelSignUp} className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-black bg-black text-white hover:bg-gray-800">sign-up</button> : <Avtaar firstName={user.firstname} lastName={user.lastname}/>}
        </div>
    </div>
}