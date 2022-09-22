import React from 'react'

const Navigation = () => {
    return (
        <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-yellow-200 sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0">
                <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</a>
            </div>
            <div>
                <a href="/admin" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4">Admin</a>
                <a href="/restaurant" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4">Restaurant</a>
                <a href="/usertips" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4">User tips</a>
                <a href="/login" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4">Login</a>
            </div>
        </nav>
    )
}

export default Navigation