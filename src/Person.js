import React from 'react'
import { FcDeleteRow } from 'react-icons/fc';
import { GrUpdate } from 'react-icons/gr';
import db from './firebase';
import toast, { Toaster } from 'react-hot-toast';

function Person({ id, name, surname }) {

    const deleteCard = () => {
        db.collection('contacts').doc(id).delete();
    }
    const updateCard = () => {

        toast.success('Successfully Updated!')
        toast.promise(
            db.collection('contacts').doc(id).update({
                name: '',
                surname: ''
            }),
            {
                loading: 'Saving...',
                success: <b>Settings saved!</b>,
                error: <b>Could not save.</b>,
            }
        );
    }


    return (
        <div className=' flex flex-row items-start justify-between gap-5'>
            {id} <br />
            {name} {surname}
            <FcDeleteRow onClick={deleteCard} className='w-7 h-7 cursor-pointer' />
            <GrUpdate onClick={updateCard} className='w-5 h-5 mt-2 cursor-pointer' />
            <Toaster />
            <hr />
        </div>
    )
}

export default Person