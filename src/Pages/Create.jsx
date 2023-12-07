import React, { useEffect, useState, useRef } from 'react'
import { name_db, supabase } from "./../Component/Konfigurasi";
import { Navigasi } from './Home';

export default function Create_FE() {

    // variabel
    const nama = useRef(null);
    const isi = useRef(null);
    const loading = useRef(null);
    const [id, setId] = useState("");
    const [tanggal, setTanggal] = useState("");


    // menampilkan jumlah kolom di database
    async function Id() {
        const { data, error } = await supabase.from(name_db).select("*")
        if (data) {
            setId(data.length);
        }
    }


    // menampilkan tanggal secara lokal
    useEffect(() => {
        function Tanggal() {
            const date = new Date();
            const localDate = date.toLocaleDateString();
            setTanggal(localDate);
        }
        Tanggal();
    })


    // mengirimkan ke database
    const kirim_db = async (event) => {
        loading.current.style.display = "block";
        event.preventDefault();
        try {
            await supabase
                .from(name_db)
                .insert({
                    id: id + 1,
                    tanggal: tanggal,
                    nama: nama.current.value,
                    isi: isi.current.value
                })
                .then(() => {
                    window.location.reload();
                }).catch(() => {
                    alert('gagal terkirim');
                });
        } catch (error) {

        }
    }

    Id();
    return (
        <>
            <section className='bg-gray-900 fixed inset-x-0 inset-y-0'>
                <form className='bg-slate-800 fixed inset-x-5 inset-y-5 rounded-lg p-5 overflow-y-auto font-sans' onSubmit={kirim_db}>
                    <div className='flex justify-between pb-5 gap-2'>
                        <div className='w-1/2'>
                            <p className='text-white font-mono font-semibold text-[13px]'>ID Pengirim <br /> <span className='text-[10px] text-emerald-600 italic'>{"(Read only)"}</span></p>
                            <input type="number" name='id' className="h-12 cursor-not-allowed bg-green-50 border border-green-800 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" disabled value={id} />
                        </div>
                        <div className='w-1/2'>
                            <p className='text-white font-mono font-semibold text-[13px]'>tanggal dikirim <br /><span className='text-[10px] text-emerald-600 italic'>{"(Read only)"}</span></p>
                            <input type="text" name='date' className="h-12 cursor-not-allowed bg-green-50 border border-green-800 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" disabled value={tanggal} />
                        </div>
                    </div>
                    <div className='w-full mb-5'>
                        <p className='text-white font-sans font-semibold text-base'>Masukan Nama Antum <span className='text-[10px] text-red-600 italic'>{"*"}</span></p>
                        <input type="text" placeholder='Example: Excalibur' name='nama' className="h-12 bg-green-50 focus:border-green-400 border-2 border-transparent text-green-700 font-semibold dark:text-green-400 outline-none placeholder-green-700 placeholder:opacity-60 dark:placeholder-green-500 text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 duration-300" ref={nama} required />
                    </div>
                    <p className='text-white font-sans font-semibold text-base'>Masukan Komentar Antum <span className='text-[10px] text-red-600 italic'>{"*"}</span></p>
                    <textarea ref={isi} required name='isi' className='focus:border-green-400 border-2 border-transparent duration-300 text-green-300 bg-gray-700 rounded-lg w-full h-44 outline-none p-1 placeholder-green-400 placeholder:opacity-60' placeholder='masukan text bebas terserah antum'></textarea>
                    <div className='w-full text-center'>
                        <button type='submit' className='w-72 mt-5 h-10 text-white rounded-md bg-sky-700 active:bg-sky-800'>KIRIM</button>
                    </div>
                </form>


                <Navigasi url="/" />


                <section className='fixed inset-x-0 inset-y-0 bg-gray-600 select-none hidden' ref={loading}>
                    <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-center'>
                        <span className='w-44 h-44 text-9xl animate-spin text-stone-900 rounded-full inline-block'>☯</span>
                        <br />
                        <span className='text-white text-2xl ml-4'>Loading ...</span>
                    </div>
                </section>
                <section className='fixed inset-x-0 inset-y-0 bg-gray-600 select-none hidden'>
                </section>
            </section>
        </>
    )
}
