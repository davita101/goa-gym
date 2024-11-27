import backgroundImage from '../assets/background.png';

const Home = () => {
    return (
        <section className="h-screen w-full">
            {/* Container */}
            <div className="h-full w-full bg-green-950 flex items-center justify-between pr-32 pl-32">
                <div className='w-1/2 text-center'>
                    <h1 className='text-3xl font-bold text-white pb-10'>Push ups website</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptas dolore qui error nobis enim provident, ut aliquid quisquam dolor commodi vitae officiis tempora magni ab nostrum earum amet cumque aliquam reiciendis velit unde beatae. </p>
                </div>

                <img src={backgroundImage} alt="Background image" className="w-96 rounded-full cursor-pointer" />
            </div>
        </section>
    )
}

export default Home;