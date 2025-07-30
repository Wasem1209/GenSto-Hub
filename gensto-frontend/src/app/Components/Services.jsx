import Link from "next/link"

export default function services() {
    return(
<section className="relative bg-whit
e py-8 px-6 md:px-12 lg:px-20 overflow-hidden">
  <div className="absolute inset-0 bg-[url('/images/about-illustration.svg')] bg-no-repeat bg-right-top opacity-10 pointer-events-none"></div>
  <div className="max-w-6xl mx-auto text-center relative z-10">
    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          At GenSto Hub, we deliver cutting-edge tech solutions, training, and consultation to help individuals, teams, and organizations grow with technology.
        </p>
    <Link href="/service" passHref>
      <button className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md">
        Let us serve you → 
      </button>
    </Link>
  </div>
</section>

)
}