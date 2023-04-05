

import { useState, useEffect } from 'react'



const UserData = () => {

    // FUNCTION FOR GET DATA FROM API
    const [userlist, setUserlist] = useState([]);

    const getUser = () => {
        let url = 'http://localhost:1234/users'
        fetch(url)
            .then(Response => Response.json())
            .then(serRes => {
                setUserlist(serRes)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    //FUNCTION FOR PAGINATION

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = userlist.slice(firstIndex, lastIndex);
    const npage = Math.ceil(userlist.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changeCPage(id) {
        setCurrentPage(id)

    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }

    //STATE FOR SEARCH FILTER

    const [search, setSearch] = useState("");
   


    return (
        <div>
            <div className='row'>
                <div className='col-lg-6'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type='search'
                                        className='form-control'
                                        placeholder='Search...'
                                        onChange={(e) => setSearch(e.target.value)}
                                    />

                                </th>
                             
                                <th className='text-center p-3 '>Filter</th>
                                <td>
                                    <select className='form-select' id="">
                                        <option value='selected'>All</option>
                                       
                                    </select>
                                </td>
                            </tr>
                            <tr>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>



            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>CITY</th>
                        <th>PHONE</th>

                    </tr>
                </thead>
                <tbody>
                    {

                        records.filter((user) => {
                            return search.toLowerCase() === '' ? user : user.name.toLowerCase().includes(search);
                        })
                            .map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address.city}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                )
                            })
                    }

                </tbody>
            </table>

            <nav >
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link'
                            onClick={prevPage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => {
                            return (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                </li>
                            )

                        })
                    }

                    <li className='page-item'>
                        <a href='#' className='page-link'
                            onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>

        </div>
    )






}

export default UserData