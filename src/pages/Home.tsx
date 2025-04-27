import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import Header from '../components/Header'
import AboutProjectSection from '../components/AboutProjectSection'
import UsedTehnologies from '../components/UsedTehnologies'






const Home = () => {

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <AboutProjectSection />
            <UsedTehnologies />
        </div>
    )
}

export default Home
