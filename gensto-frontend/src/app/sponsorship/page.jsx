'use client';

import { Trophy, DollarSign, Users, Star, Mail, MessageCircle, CheckCircle, Medal, Award, Crown, Gem } from 'lucide-react';

export default function SponsorshipPage() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Intro Section */}
        <div className="text-center mb-12 px-4 py-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Sponsor GenSto Hub Initiatives
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            Sponsorship with GenSto Hub means empowering innovation, education, and technology.
            Your support helps us deliver training programs, create scalable solutions, and
            impact communities for a better future.
          </p>
        </div>

        {/* Why Sponsor Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {[
            {
              icon: <Trophy className="w-12 h-12 mx-auto text-yellow-500 mb-4" />,
              title: "Brand Visibility",
              text: "Gain recognition by associating with innovation and EdTech transformation."
            },
            {
              icon: <DollarSign className="w-12 h-12 mx-auto text-green-600 mb-4" />,
              title: "Business Impact",
              text: "Sponsoring GenSto Hub opens access to diverse markets and communities."
            },
            {
              icon: <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />,
              title: "Community Engagement",
              text: "Show your commitment to education and skills by empowering future leaders."
            },
            {
              icon: <Star className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
              title: "Prestige & CSR",
              text: "Build a strong corporate social responsibility image through sponsorship."
            }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              {card.icon}
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{card.text}</p>
            </div>
          ))}
        </div>

        {/*  Sponsorship Opportunities Section */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8 sm:p-10 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Sponsorship Opportunities</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Whether you want to support a <strong>training program</strong>, a <strong>hackathon</strong>, or our <strong>educational initiatives</strong>,
            GenSto Hub provides multiple sponsorship tiers — from <strong>event sponsorships</strong> to <strong>long-term partnerships</strong>.
          </p>
        </div>

        {/* Sponsorship Tier Cards with icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {[
            {
              tier: 'Bronze',
              color: 'bg-orange-100',
              icon: <Medal className="w-10 h-10 text-orange-600 mx-auto mb-3" />,
              benefits: [
                'Logo on website',
                'Mention in newsletter',
                'Basic branding on events'
              ],
            },
            {
              tier: 'Silver',
              color: 'bg-gray-200',
              icon: <Award className="w-10 h-10 text-gray-600 mx-auto mb-3" />,
              benefits: [
                'All Bronze benefits',
                'Shoutouts on social media',
                'Logo on select event materials'
              ],
            },
            {
              tier: 'Gold',
              color: 'bg-yellow-100',
              icon: <Crown className="w-10 h-10 text-yellow-600 mx-auto mb-3" />,
              benefits: [
                'All Silver benefits',
                'Co-hosting opportunities',
                'Priority event invitations',
                'Logo on all event materials',
              ],
            },
            {
              tier: 'Platinum',
              color: 'bg-purple-100',
              icon: <Gem className="w-10 h-10 text-purple-600 mx-auto mb-3" />,
              benefits: [
                'All Gold benefits',
                'Keynote mentions',
                'Exclusive branding rights',
                'Featured in press releases'
              ],
            }
          ].map((tier, index) => (
            <div
              key={index}
              className={`${tier.color} rounded-xl shadow-md p-6 flex flex-col justify-between text-center hover:shadow-xl transition-shadow duration-300`}
            >
              <div>
                {tier.icon} {/* Tier-specific icon */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">{tier.tier} Sponsor</h3>

                {/* Benefits list displayed as UL */}
                <ul className="text-gray-700 mb-4 space-y-2 list-disc list-inside">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email CTA Button */}
              <a
                href={`mailto:sponsorship@genstohub.com?subject=I want to become a ${tier.tier} Sponsor`}
                className="mt-4 inline-block px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-500 transition text-center"
              >
                Become a {tier.tier} Sponsor
              </a>
            </div>
          ))}
        </div>


        {/* Final CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Become a Sponsor Today</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Join us in shaping the future of technology and education. Your sponsorship will help
            fund projects, trainings, and resources for thousands of learners and innovators.
          </p>

          {/*  Contact Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a
              href="mailto:sponsorship@genstohub.com"
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-blue-200 transition"
            >
              <Mail className="w-5 h-5" /> genstohub1@gmail.com
            </a>

            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-200 transition"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}