"use client"
import CardSwap, { Card } from "./CardSwap"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

const ContactSection = () => {
  const handleContactClick = () => {
    // Replace with your main website URL
    window.open("https://aenfinite.com", "_blank")
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden min-h-screen flex items-center justify-center px-8 sm:px-10">
      <div className="w-full flex justify-center items-center" style={{ margin: "50px" }}>
        {/* Main Container Box */}
        <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-3xl shadow-lg drop-shadow-xl p-8 lg:p-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Contact Information */}
            <div className="space-y-8 pl-6 lg:pl-12" style={{ paddingLeft: "50px" }}>
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-champ leading-tight">
                  Let's Work
                  <span className="block text-blue-600">Together</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                  Ready to transform your digital presence? We're here to help bring your vision to life with
                  cutting-edge solutions and exceptional service.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-6 text-gray-700">
                  <div
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center m-2"
                    style={{ margin: "10px" }}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">hello@aenfinite.com</span>
                </div>
                <div className="flex items-center space-x-6 text-gray-700">
                  <div
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center m-2"
                    style={{ margin: "10px" }}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-6 text-gray-700">
                  <div
                    className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center m-2"
                    style={{ margin: "10px" }}
                  >
                    <MapPin className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-lg font-medium">Innovation District, Tech City</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleContactClick}
                  className="group inline-flex items-center px-10 py-5 bg-black text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg drop-shadow-lg hover:shadow-xl hover:drop-shadow-xl transform hover:-translate-y-2"
                  style={{ padding: "10px" }}
                >
                  Contact Us
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right Side - CardSwap Component */}
            <div className="relative flex justify-center items-center">
              <div style={{ height: "600px", position: "relative", transform: "translateX(140px)" }}>
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={4000}
                  pauseOnHover={true}
                  width={500}
                  paddingp
                  height={400}
                >
                  <Card>
                    <div className="bg-black text-white p-8 rounded-2xl shadow-lg drop-shadow-lg h-full flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <Mail className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-champ">Get In Touch</h3>
                      <p className="text-lg opacity-90">
                        Ready to discuss your next project? Let's create something amazing together.
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg drop-shadow-lg h-full flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Phone className="w-8 h-8 text-gray-700" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-champ">Call Us Today</h3>
                      <p className="text-lg text-gray-600">
                        Speak directly with our team and discover how we can help transform your business.
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg drop-shadow-lg h-full flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-champ">Visit Our Office</h3>
                      <p className="text-lg opacity-90">
                        Come see our creative workspace and meet the team behind the innovation.
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
