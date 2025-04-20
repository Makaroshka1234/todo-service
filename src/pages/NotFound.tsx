
import NotFoundMessage from '../components/NotFoundMessage'
import Header from '../components/Header'

const NotFound = () => {
    return (
        <div className='flex justify-center items-center bg-blue-400 w-full min-h-full'>
            <Header />
            <NotFoundMessage />
        </div>
    )
}

export default NotFound
