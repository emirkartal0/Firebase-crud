import React, { useEffect, useState } from 'react'
import db, { auth } from './firebase'
import Person from './Person'

function Home({ user }) {
    const [name, setName] = useState('')
    const [uid, setUid] = useState(user.uid)
    const [surname, setSurname] = useState('')
    const [person, setPerson] = useState([])

    useEffect(() => {
        db.collection('contacts').onSnapshot(item => {
            setPerson(item.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    const addPerson = (e) => {
        e.preventDefault();
        db.collection('contacts').add({
            owner: uid,
            name: name,
            surname: surname,
        })
        setName('');
        setSurname('');
    }

    return (
        <div>
            <h1 className=' text-center mt-4 text-xl font-bold'>Hoşgeldiniz {user.displayName}</h1>
            <div className='flex flex-col items-center mt-10'>
                <form onSubmit={addPerson} className='flex flex-col'>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ad" required />
                    <label htmlFor="last_name" className=" mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                    <input value={surname} onChange={(e) => setSurname(e.target.value)} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Soyad" required />
                    <button type='submit' className="relative mt-5 ml-2 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span className=" px-16 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Kaydet
                        </span>
                    </button>
                </form>

                <ul>
                    {person.map(({id, data:{name, surname}}) => (
                        <Person 
                            key={id} 
                            id={id}
                            name={name}  
                            surname={surname}
                        />
                    ))}
                </ul>

                <button onClick={() => auth.signOut()} className=' bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl mt-10'>
                    Çıkış yap!
                </button>

            </div>
        </div>
    )
}

export default Home