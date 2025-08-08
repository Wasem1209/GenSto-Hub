import Link from "next/link"

export default function about() {
    return (
        <section className="relative bg-whit
e py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/about-illustration.svg')] bg-no-repeat bg-right-top opacity-10 pointer-events-none"></div>
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    About GenSto Hub
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                    GenSto Hub is a forward-thinking tech platform dedicated to raising and building careers, nurturing professionals, and bridging the gap between school life and skill life. We empower students, workers, and tech enthusiasts by offering real-world projects, expert mentorship, and a strong community.
                </p>
                <Link href="/about" passHref>
                    <button className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md">
                        Get To Know Us More →
                    </button>
                </Link>
            </div>
        </section>

    )
}