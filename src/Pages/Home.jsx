import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

export default function Home() {
    return (
        <>
            <section className='fixed inset-x-0 inset-y-0 bg-slate-700 text-white'>
                <br />
                <h1 className='text-4xl uppercase text-center'>CRUD Sederhana</h1>
                <br />
                <div className='w-[320px] mr-auto ml-auto flex justify-center items-center gap-5'>
                    <Link className='hover:text-white w-20 text-center h-10 border-2 border-yellow-500 hover:bg-yellow-700 flex justify-center items-center' to={'/create'}>Create</Link>
                    <Link className='hover:text-white w-20 text-center h-10 border-2 border-emerald-500 hover:bg-emerald-700 flex justify-center items-center' to={'/read'}>Read</Link>
                    <Link className='hover:text-white w-20 text-center h-10 border-2 border-sky-500 hover:bg-sky-700 flex justify-center items-center' to={'/update'}>Update</Link>
                    <Link className='hover:text-white w-20 text-center h-10 border-2 border-red-500 hover:bg-red-700 flex justify-center items-center' to={'/delete'}>Delete</Link>
                </div>
                <div className='mt-32 ml-20'>
                    <h1 className='text-2xl underline mb-5'>Keterangan</h1>
                    <div className='flex bg-slate-800 w-[320px] p-2 items-center border-b-2'>
                        <span className='text-lg text-yellow-400 mr-2'>CREATE</span>
                        <span className='w-[2px] h-6 bg-white'></span>
                        <p className='text-lg ml-2'>Mengirimkan data ke database</p>
                    </div>
                    <div className='flex bg-slate-800 w-[320px] p-2 items-center border-b-2'>
                        <span className='text-lg text-emerald-400 mr-2'>READ</span>
                        <span className='w-[2px] h-6 bg-white'></span>
                        <p className='text-lg ml-2'>Menampilkan data dari database</p>
                    </div>
                    <div className='flex bg-slate-800 w-[320px] p-2 items-center border-b-2'>
                        <span className='text-lg text-sky-400 mr-2'>UPDATE</span>
                        <span className='w-[2px] h-6 bg-white'></span>
                        <p className='text-lg ml-2'>Mengubah data dari database</p>
                    </div>
                    <div className='flex bg-slate-800 w-[320px] p-2 items-center border-b-2'>
                        <span className='text-lg text-red-400 mr-2'>DELETE</span>
                        <span className='w-[2px] h-6 bg-white'></span>
                        <p className='text-lg ml-2'>Menghapus data dari database</p>
                    </div>
                </div>
            </section>
        </>
    )
}



export function Navigasi(props) {
    return (
        <>
            <Link className='fixed bottom-5 left-5 w-40 h-12 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 hover:text-white gap-1 flex justify-center items-center' to={props.url}>
                <Icon name='arrow left' className='text-6xl' />
                <h1>KEMBALI</h1>
            </Link>
        </>
    )
}