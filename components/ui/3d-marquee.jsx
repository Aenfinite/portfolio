"use client"

import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export const ThreeDMarquee = ({ testimonials, className }) => {
  // Create multiple copies to fill the grid and split into 5 columns
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials]
  const chunkSize = Math.ceil(extendedTestimonials.length / 5)
  const chunks = Array.from({ length: 5 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return extendedTestimonials.slice(start, start + chunkSize)
  })
  return (
    <div className={cn("w-full block h-[600px] overflow-hidden max-sm:h-100", className)}>
      <div className="flex size-full items-center justify-center">
        <div className="w-[1600px] h-[1500px] shrink-0 scale-[0.4] sm:scale-[0.6] lg:scale-[0.8] xl:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-5 gap-3 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-4"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((testimonial, testimonialIndex) => (
                  <div className="relative" key={testimonialIndex + testimonial.id}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.div
                      whileHover={{
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={testimonialIndex + testimonial.id}
                      className="rounded-lg ring-2 ring-gray-300 hover:ring-gray-400 hover:shadow-xl bg-gray-100 border-2 border-gray-400 hover:border-gray-500 p-4 flex flex-col justify-between transition-all duration-300"
                      style={{ width: 300, height: 320 }}
                    >
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-3 " style={{ paddingTop: "30px" }}>
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                        </svg>
                      </div>

                      {/* Content */}
                      <p
                        className="text-gray-800 text-base leading-relaxed mb-2 flex-grow text-center font-semibold"
                        style={{ paddingTop: "20px", paddingLeft: "10px", paddingRight: "10px" }}
                      >
                        "
                        {testimonial.content.length > 120
                          ? testimonial.content.substring(0, 120) + "..."
                          : testimonial.content}
                        "
                      </p>

                      {/* Rating */}
                      <div className="flex justify-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>

                      {/* Author */}
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover shadow-sm"
                        />
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-900 text-sm font-champ">{testimonial.name}</h4>
                          <p className="text-gray-600 text-xs">
                            {testimonial.role.length > 25
                              ? testimonial.role.substring(0, 25) + "..."
                              : testimonial.role}
                          </p>
                          <p className="text-gray-500 text-xs font-medium" style={{ paddingBottom: "20px" }}>
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const GridLineHorizontal = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px", //-100px if you want to keep the line inside
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}

const GridLineVertical = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px", //-100px if you want to keep the line inside
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}
