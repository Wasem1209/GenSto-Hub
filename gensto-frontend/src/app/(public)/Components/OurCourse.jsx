import Link from "next/link"

export default function ourcourse() {
    return (
        <section className="relative bg-white py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/ourcours.svg')] bg-no-repeat bg-rigth-top opacity-10 pointer-events-none"></div>
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our School</h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"> Explore our specialized schools designed to help you <strong>master IT and tech skills</strong>.</p>
                <Link href="/courses" passHref>
                    <button className="bg-gray-400 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md">Course Overview →</button></Link>
            </div>
        </section>
    )
}