"use client"
import CardSwap, { Card } from "./CardSwap"
import { ArrowRight, Mail, Phone, MapPin, VideoIcon } from "lucide-react"

const ContactSection = () => {
  const handleContactClick = () => {
    // Replace with your main website URL
    window.open("https://aenfinite.com", "_blank")
  }

  return (
    <section className="bg-gray-50 relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-8xl mx-auto flex items-center justify-center min-h-screen py-10 md:py-20">
        {/* Main Container Box */}
        <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl md:rounded-3xl shadow-lg drop-shadow-xl p-6 sm:p-8 md:p-10 lg:p-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Contact Information */}
            <div className="space-y-6 md:space-y-8 px-2 sm:px-4 lg:pl-12">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 font-champ leading-tight">
                  Let's Work
                  <span className="block text-blue-600">Together</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8 max-w-lg">
                  Ready to transform your digital presence? We're here to help bring your vision to life with
                  cutting-edge solutions and exceptional service.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 text-gray-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-sm sm:text-base md:text-lg font-medium break-all">hello@aenfinite.com</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 text-gray-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-sm sm:text-base md:text-lg font-medium">+1 (303) 419-9782</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 text-gray-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <VideoIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
                  </div>
                  <span className="text-sm sm:text-base md:text-lg font-medium" href="https://calendly.com/aenfinite/business-meeting">Book A Free Strategy Call</span>
                </div>
              </div>

              <div className="pt-4 md:pt-6">
                <button
                  onClick={handleContactClick}
                  className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-black text-white text-sm sm:text-base md:text-lg font-semibold rounded-xl md:rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg drop-shadow-lg hover:shadow-xl hover:drop-shadow-xl transform hover:-translate-y-1 md:hover:-translate-y-2"
                >
                  Contact Us
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right Side - CardSwap Component */}
            <div className="relative flex justify-center items-center mt-8 lg:mt-0 min-h-[400px] lg:min-h-[600px] max-[640px]:mx-auto max-[640px]:transform max-[640px]:translate-y-[-50px]">
              <div className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] relative w-full flex justify-center items-center max-[640px]:w-auto max-[640px]:mx-auto">
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={4000}
                  pauseOnHover={true}
                  width={400}
                  height={320}
                >
                  <Card>
                    <div className="bg-black text-white p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg drop-shadow-lg h-full flex flex-col justify-center items-center text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                        <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 font-champ">Get In Touch</h3>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed">
                        Ready to discuss your next project? Let's create something amazing together.
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <div className="bg-white text-gray-900 p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg drop-shadow-lg h-full flex flex-col justify-center items-center text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                        <Phone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-700" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 font-champ">Call Us Today</h3>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                        Speak directly with our team and discover how we can help transform your business.
                      </p>
                    </div>
                  </Card>

                  <Card>
  <div className="bg-blue-600 text-white p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg drop-shadow-lg h-full flex flex-col justify-center items-center text-center">
    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
      <VideoIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
    </div>
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 font-champ">
      Book a Consultation Online
    </h3>
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed">
      Schedule a free strategy call with our experts from anywhere in the world — let's bring your ideas to life.
    </p>
  </div>
</Card>

                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
