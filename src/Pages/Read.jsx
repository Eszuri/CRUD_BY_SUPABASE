import React, { useEffect, useState } from 'react'
import { name_db, supabase } from "./../Component/Konfigurasi";
import { Navigasi } from './Home';


// component membuat tabel
const Read_all = ({ read }) => {
    return (
        <><div className='flex w-full justify-center text-white'>
            <span className='hover:bg-gray-700 flex justify-center items-center p-2 w-20 text-center border-r border-t border-2 border-slate-400'>{read.id}</span>
            <h6 className='hover:bg-gray-700 flex justify-center items-center p-2 w-36 text-center border-l border-r border-t border-2 border-slate-400'>{read.tanggal}</h6>
            <h1 className='hover:bg-gray-700 flex justify-center items-center p-2 w-52 border-l border-r border-2 border-t border-slate-400'>{read.nama}</h1>
            <p className='hover:bg-gray-700 p-2 overflow-x-auto w-80 border-l border-2 border-t border-slate-400'>{read.isi}</p>
        </div>
        </>
    )
}


export default function Read() {
    // variabel
    const [id, setId] = useState([]);
    const db = JSON.stringify(id);

    // membaca semua data di database
    async function read_all() {
        try {
            const { data, eror } = await supabase
                .from(name_db)
                .select("*")
            if (data != null) {
                setId(data);
            }
        } catch (error) {
            console.log(error);
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
                    <h1 className='bg-emerald-700 flex justify-center items-center p-2 w-52 border-l border-r border-2 border-slate-400 font-bold'>Nama</h1>
                    <p className='bg-emerald-700 flex justify-center items-center p-2 overflow-x-auto w-80 border-l border-2 border-slate-400 font-bold'>Komentar</p>
                </div>
                <div>
                    {id.map((read) => (
                        <Read_all key={read.id} read={read} />
                    ))}
                </div>
            </section >

            <Navigasi url="/" />
        </>
    )
}

