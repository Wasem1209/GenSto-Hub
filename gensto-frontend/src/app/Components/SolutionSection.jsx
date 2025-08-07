import { Code, Users, Briefcase, Globe, Rpokecket, Rocket } from "lucide-react"


export default function Solutionsection() {
    return (
        <section className="by-white py-6 px-8 md:px-20">
            <h2 className="text-center text-3xl md:text-4xl mb-12 font-bold text-gray-800 ">Our Services & Solutions</h2>
            <div className="grid grid-col-1 md:grid-col-2 lg:grid-col-3 gap-8">
                <div className="bg-gray-50 rounded-lg shadow-md py-6 text-center hover:scale-105 transition-all">
                    <Code className="mx-auto mb-4 h-12  text-blue-600 w-12" />
                    <h3 className="mb-2 text-xl font-bold">Innovative Training</h3>
                    <p className="text-gray-600">We provide hands-on tech training to bridge the gap between school and skills </p>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-md py-6 text-center hover:scale-105 transition-all">
                    <Briefcase className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                    <h3 className="mb-2 text-xl font-bold">Custom Softwares</h3>
                    <p className="text-gray-600">We build scalable software products for startups, NGOs and organizations.</p>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-md py-6 text-center hover:scale-105 transition-all">
                    <Users className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                    <h3 className="mb-2 text-xl font-bold">Mentorship & Support</h3>
                    <p className="text-gray-600">Access to certifield mentors for project guidance and careere support.</p>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-md py-6 text-center hover:scale-105 transition-all">
                    <Rocket className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                    <h3 className="mb-2 text-xl font-bold">Career Empowerment</h3>
                    <p className="text-gray-600">Empowering students and workers to launch career in tech</p>
                </div>
            </div>
        </section>
    )
}