import React, { useEffect, useRef, useState } from 'react'
import { name_db, supabase } from "./../Component/Konfigurasi";
import { Icon, Modal, Button } from "semantic-ui-react";
import { Navigasi } from './Home';




export default function Delete() {

    // variabel
    const [all, setAll] = useState([]);
    const id = useRef(null);
    const popup = useRef(null);
    const read_page = useRef(null);
    const loading = useRef(null);


    // component membuat tabel
    const Read_all = ({ read }) => {
        return (
            <><div className='flex w-full justify-center text-white'>
                <span className='hover:bg-slate-700 flex justify-center items-center border-t-0 p-2 w-20 text-center border-r border-2 border-slate-400'>{read.id}</span>
                <h6 className='hover:bg-slate-700 flex justify-center items-center border-t-0 p-2 w-36 text-center border-l border-r border-2 border-slate-400'>{read.tanggal}</h6>
                <h1 className='hover:bg-slate-700 flex justify-center items-center border-t-0 p-2 w-52 border-l border-r border-2 border-slate-400'>{read.nama}</h1>
                <p className='hover:bg-slate-700 p-2 overflow-x-auto w-80 border-l border-t-0 border-r border-2 border-slate-400'>{read.isi}</p>
                <button onClick={() => { popup.current.style.scale = '1'; id.current.textContent = read.id }} className='active:bg-red-800 bg-red-700 border-l border-t-0 flex justify-center items-center p-2 w-20 min-w-[2.9rem] text-center border-r border-2 border-slate-400 relative'><Icon name='trash alternate' className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-75%]' /></button>
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
    const delete_data = async () => {
        loading.current.style.display = "block";
        try {
            await supabase
                .from(name_db)
                .delete()
                .eq('id', id.current.textContent)
                .then(() => {
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
                    <span className='bg-emerald-700 border-l flex justify-center items-center p-2 w-20 text-center border-r border-2 border-slate-400 font-[900]'>Delete</span>
                </div>
                <div ref={read_page}>
                    {all.map((read) => (
                        <Read_all key={read.id} read={read} />
                    ))}
                </div>

                <Navigasi url="/" />

                <section className='fixed inset-x-0 inset-y-0 select-none duration-75' style={{ scale: 0, backgroundColor: "rgba(0, 0, 0, 0.7)" }} ref={popup}>
                    <span ref={id} className='hidden select-none'></span>
                    <div className='absolute left-1/2 top-1/2 translate-x-[-50%] w-[320px] p-5 rounded-md bg-slate-100 text-black translate-y-[-50%]'>
                        <span className='text-3xl text-left font-bold'>Delete Data !</span>
                        <br /><br />
                        <p className='text-lg'>Antum Yakin Ingin Menghapus Data Ini?</p>
                        <hr className='bg-black h-[0.5x]' /><br />
                        <div className='flex justify-between'>
                            <Button negative onClick={() => { popup.current.style.scale = 0 }} >
                                No
                            </Button>
                            <Button positive onClick={delete_data} >
                                Yes
                            </Button>
                        </div>
                    </div>
                </section>

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

