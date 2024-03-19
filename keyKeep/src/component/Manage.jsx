import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Manage = () => {
    const imgRef = useRef();
    const passRef = useRef();
    let [passwordsArray, setpasswordsArray] = useState([]);
    const [form, setform] = useState({ site: "", username: "", password: "" });


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const copyToClipBoard = (text) => {
        const t = navigator.clipboard.writeText(text);
        toast.success("Copied to Clipboard");
    }
    const toggleSrc = () => {
        // console.log(imgRef.current.src);
        // console.log(passRef.current.type);
        if (imgRef.current.src.includes('https://www.svgrepo.com/show/353106/eye.svg')) {
            imgRef.current.src = "https://img.freepik.com/premium-vector/show-password-icon-eye-symbol-vector-vision-hide-from-watch-icon-secret-view-web-design-element_87543-11126.jpg";
            passRef.current.type = "text";
        } else {
            imgRef.current.src = "https://www.svgrepo.com/show/353106/eye.svg";
            passRef.current.type = "password";
        }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        console.log("Save");
        // without using mongodb
        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {
            console.log(form);
            localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]));
            setpasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
            toast.success("Saved Successfully");
            setform({ site: "", username: "", password: "" });
        } else {
            toast.error("All Field must have more then 3 character");
            console.log("all filed Empty");
        }

        //using mongodb
        // if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
        //     console.log(form);
        //     try {
        //         const { site, username, password } = form;
        //         const data = await axios.post('http://localhost:5000/save', { site, username, password });
        //         // console.log(data);
        //         if (data) {
        //             // localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]));
        //             console.log(data);
        //             setpasswordsArray([...passwordsArray, data.data]);
        //             console.log(setpasswordsArray);
        //             toast.success("Saved Successfully");
        //         }
        //     } catch (err) {
        //         console.log(err);
        //         toast.error(`Error:${err}`);
        //     }
        // } else {
        //     toast.error("All Field must have more then 3 character");
        //     console.log("all filed Empty");
        // }
    }
    const handleEdit = (id) => {
        console.log("Edit");

        // without using mongodb
        const item = passwordsArray.filter((item) => item.id === id)[0];
        setform(item);

        //delete the password
        const updatedPasswordsArray = passwordsArray.filter((item) => item.id !== id);
        setpasswordsArray(updatedPasswordsArray);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswordsArray));

        //using mongodb
    }
    const handleDelete = async (id) => {
        console.log("Delete");

        // without using mongodb
        const updatedPasswordsArray = passwordsArray.filter((item) => item.id !== id);
        setpasswordsArray(updatedPasswordsArray);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswordsArray));
        toast.success("Deleted Successfully");


        //using Mongodb
        // try{
        //     const response=await axios.delete(`http://localhost:5000/delete/${id}`);
        //     const updatedPasswordsArray = passwordsArray.filter((item) => item.id !== id);
        //     setpasswordsArray(updatedPasswordsArray);
        //     console.log("After Deletion",updatedPasswordsArray);
        //     toast.success("Deleted Successfully");
        // }catch(err){
        //     console.log(err);
        // }
    }
    useEffect(() => {
        // without using mongodb
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordsArray(JSON.parse(passwords));
        }

        //using Mongodb
        // const fetchData = async () => {
        //     try {
        //         let response = await axios.get("http://localhost:5000");
        //         setpasswordsArray(response.data);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // fetchData();
    }, []);
    return (
        <>
            <div className='max-w-full flex flex-col mb-2'>
                {/* <div className="absolute top-0 -z-10 h-full w-full bg-blue-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div> */}

                <div className='min-h-[87.4vh] w-full md:w-[70vw] shadow-xl mx-auto flex flex-col bg-blue-50'>
                    <div className='text-center p-1'>
                        <h1 className='text-3xl'> <span className=''>Key<span className='text-green-300'>Keep</span></span></h1>
                        <p>Your Secure Password Manager</p>
                    </div>

                    <form action="" onSubmit={handleSave}>

                        <div className='px-4 py-8 flex flex-col items-center'>
                            <input type="text" name='site' id="site" placeholder='Enter Website Url' value={form.site} className='w-full rounded-md px-3 py-2  my-2 border-blue-100' onChange={handleChange} />
                            {/* flex flex-col */}
                            <div className='w-full md:flex gap-4 my-2'>
                                <input type="text" name="username" id="username" placeholder='Enter Username' value={form.username} className='w-full rounded-lg px-2 py-1 ' onChange={handleChange} />
                                <div className='relative my-4 md:my-0'>

                                    <input type="password" ref={passRef} name="password" id="password" placeholder='password' value={form.password} className='w-full rounded-lg px-2 py-1' onChange={handleChange} />
                                    <img src="https://www.svgrepo.com/show/353106/eye.svg" alt="" style={{ "width": "23px" }} className='absolute right-1 bottom-1 cursor-pointer' onClick={toggleSrc} ref={imgRef} />
                                </div>
                            </div>
                            <button className='flex items-center bg-green-300 px-4 py-1 text-slate-500 rounded-xl w-fit'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                    trigger="hover"
                                    style={{ "width": "25px", "height": "25px" }}>
                                </lord-icon> Save </button>
                        </div>
                    </form>

                    <div className='flex flex-col justify-center px-6 '>
                        <h1 className='text-lg my-2'>Your Passwords:</h1>
                        <div className='overflow-x-auto'>
                            <table className="table-auto ">
                                <thead className='border bg-gray-500 text-white '>
                                    <tr>
                                        <th>Website URL</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordsArray.length == 0 ? <div>No Password are Available</div> :
                                        passwordsArray.map((item, index) => (<tr key={index}>
                                            <td ><a href={item.site} target='_blank'>{item.site}</a></td>
                                            <td onClick={() => copyToClipBoard(item.username)}>{item.username}</td>
                                            <td onClick={() => copyToClipBoard(item.password)}>{item.password}</td>
                                            <td>
                                                <div className='flex gap-2'>
                                                    <div className='cursor-pointer' onClick={() => handleEdit(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </div>
                                                    <div className='cursor-pointer' onClick={() => handleDelete(item.id)}>

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Manage