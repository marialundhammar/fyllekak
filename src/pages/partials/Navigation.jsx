import React from 'react'

const Navigation = () => {
    return (
        <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-yellow-200 sm:items-baseline w-full">
            <div class="mb-2 sm:mb-0">
                <a href="/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</a>
            </div>
            <div>
                <a href="/admin" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4">Admin</a>
                <a href="/restaurant" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4">Restaurant</a>
            </div>
        </nav>
    )
}

export default Navigation