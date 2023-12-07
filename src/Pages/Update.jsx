import React, { useEffect, useRef, useState } from 'react'
import { name_db, supabase } from "./../Component/Konfigurasi";
import { Icon } from 'semantic-ui-react';
import { Navigasi } from './Home';



export default function Update() {

    // variabel
    const [all, setAll] = useState([]);
    const formupdate = useRef(null);
    const id = useRef(null);
    const date = useRef(null);
    const nama = useRef(null);
    const isi = useRef(null);
    const loading = useRef(null);

    // component membuat tabel
    const Read_all = ({ read }) => {
        const tanggal = new Date;
        const editLast = tanggal.toLocaleDateString();
        return (
            <><div className='flex w-full justify-center text-white'>
                <span className='hover:bg-slate-700 flex justify-center items-center border-t-0 p-2 w-20 text-center border-r border-2 border-slate-400'>{read.id}</span>
                <h6 className='hover:bg-slate-700 flex justify-center items-center border-t-0 p-2 w-36 text-center border-l border-r border-2 border-slate-400'>{read.tanggal}</h6>
                <h1 className='hover:bg-slate-700 flex justify-center items-center border-t-0 p-2 w-52 border-l border-r border-2 border-slate-400'>{read.nama}</h1>
                <p className='hover:bg-slate-700 p-2 overflow-x-auto w-80 border-l border-t-0 border-r border-2 border-slate-400'>{read.isi}</p>
                <button onClick={() => { formupdate.current.style.scale = '1'; id.current.value = read.id; nama.current.value = read.nama; isi.current.value = read.isi; date.current.value = editLast }} className='active:bg-blue-800 bg-blue-700 border-l border-t-0 flex justify-center items-center p-2 w-20 min-w-[2.9rem] text-center border-r border-2 border-slate-400 relative'><Icon name='edit' className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-75%]' /></button>
            </div>
            </>
        )
    }


    // membaca semua data di database
    async function read_all() {
        try {
            const { data, eror } = await supabase
                .from(name_db)
                .select("*")
            if (data != null) {
                setAll(data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    // update 
    const update_data = async (e) => {
        e.preventDefault();
        try {
            await supabase
                .from(name_db)
                .update({ nama: nama.current.value, isi: isi.current.value, tanggal: date.current.value })
                .eq('id', id.current.value)
                .then(() => {
                    loading.current.style.display = "block";
                    window.location.reload();
                })
        } catch (error) {
            alert(error);
        }
    }

    // memanggil function
    useEffect(() => {
        read_all();


    }, []);

    return (
        <>
            <section className='fixed inset-x-0 inset-y-0 bg-gray-900'>
                <br />
                <div className='flex w-full justify-center text-white'>
                    <span className='bg-emerald-700 flex justify-center items-center p-2 w-20 text-center border-r border-2 border-slate-400 font-bold'>ID</span>
                    <h6 className='bg-emerald-700 flex justify-center items-center p-2 w-36 min-w-[6rem] text-center border-l border-r border-2 border-slate-400 font-bold'>Tanggal terkirim</h6>
                    <h1 className='bg-emerald-700 flex justify-center items-center p-2 w-52 min-w-[5rem] border-l border-r border-2 border-slate-400 font-bold'>Nama</h1>
                    <p className='bg-emerald-700 flex justify-center items-center p-2 border-r overflow-x-auto w-80 border-l border-2 border-slate-400 font-bold'>Komentar</p>
                    <span className='bg-emerald-700 border-l flex justify-center items-center p-2 w-20 text-center border-r border-2 border-slate-400 font-[900]'>Edit</span>
                </div>
                <div>
                    {all.map((read) => (
                        <Read_all key={read.id} read={read} />
                    ))}
                </div>

                <Navigasi url="/" />

                <form className="w-[50%] mx-auto p-5 bg-blue-950 rounded-md mt-5 relative duration-300 max-md:w-[80%]" style={{ scale: 0 }} ref={formupdate} onSubmit={update_data}>
                    <div className="mb-5 flex gap-3">
                        <div className='block w-1/2'>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                ID <br /><span className='text-[13px] text-emerald-600 italic'>{"(Read only)"}</span>
                            </label>
                            <input
                                type="number"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                readOnly
                                disabled
                                ref={id}
                            />
                        </div>
                        <div className='block w-1/2'>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Last Edited <br /><span className='text-[13px] text-emerald-600 italic'>{"(Read only)"}</span>
                            </label>
                            <input
                                type="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                readOnly
                                disabled
                                ref={date}
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Nama
                        </label>
                        <input
                            type="text"
                            className="shadow-sm bg-gray-50 border duration-300 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required=""
                            ref={nama}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            komentar
                        </label>
                        <input
                            type="text"
                            className="shadow-sm bg-gray-50 border duration-300 border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required=""
                            ref={isi}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                    >
                        Oke
                    </button>
                    <button
                        type="button"
                        className="absolute right-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                        onClick={() => { formupdate.current.style.scale = "0" }}
                    >
                        Batal
                    </button>
                </form>
                <section className='fixed inset-x-0 inset-y-0 bg-gray-600 select-none hidden' ref={loading}>
                    <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-center'>
                        <span className='w-44 h-44 text-9xl animate-spin text-stone-900 rounded-full inline-block'>☯</span>
                        <br />
                        <span className='text-white text-2xl ml-4'>Loading ...</span>
                    </div>
                </section>
            </section >
        </>
    )
}

