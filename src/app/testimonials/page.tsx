"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const allTestimonials = [
  {
    text: "Having 3 implants done is not a bowl of cherries! I must say however that Freeman's Bay Dental Centre on College Hill were very good and competent and I'm happy with the result. Very nice people.",
    author: "Bill Mathews - Google Review, March 2025"
  },
  {
    text: "Thank you so much Sandeep for taking such great care of me and my teeth. I’m someone who had had a huge irrational fear of dentists for a long time, but the team have always put me at ease and made sure I’m comfortable and calm. I happily commute from west Auckland to visit this dental centre. Looking forward to trying some teeth whitening in future! Cheers :)",
    author: "Jaimee Spray - Google Review, Aug 2024"
  },
  {
    text: "Im amazed at how caring the staff are.\nThey are amazing .\nI was so petrified of going to dentists with the past experiences ive had and my god they deserve a medal fot for putting up with me.\nTruly caring and pain free.\nThey let me know every step of the way what my options were.\nNow i look forward to next appt.\n100% recommend them.",
    author: "Christine Herk- Google Review, Sept 2023"
  },
  {
    text: "Absolutely excellent service. Extraction of my Wisdom tooth - made quite sure that the area was completely numb before extraction 😊\nInformed me before of what to expect - and then my after care.\nThank you",
    author: "Hilda Thompson - Google Review, Oct 2022"
  },
  {
    text: "Thank you so much to Sandeep and his team for the kindness and care they gave to someone who is petrified of dentist, very professional and took every measure to make it as comfortable as they could. Absolutely recommend this practice.",
    author: "Leigh Jefferis - Google Review, June 2020"
  },
  {
    text: "Went in terrified of getting my first fillings, now I feel confident and at ease for future dental visits. Very gentle and painless. Everything was explained to me in depth. Highly recommend! Wouldnt go anywhere else now.",
    author: "Eleanor Wales - Google Review"
  },
  {
    text: "I have been a patient at Freemans Bay Dental for 10yrs. I appreciate the friendly reception from Monika and Sandeep's personal approach to carry for my teeth.",
    author: "Shawn Cooper - Teacher | 26/04/2019"
  },
  {
    text: "Sandeep & Monika are always great to deal with. The quality of the work has been great.",
    author: "David Porter - Banker | 24/04/2019"
  },
  {
    text: "Freemans Bay Dental was amazing as I was very nervous they eased my pain and yes you were kind and gentle while repairing my broken tooth it was truly pain free. I will now happily go back to the dentist for regular checkups. Thank you Freemans Bay Dental so much for restoring my trust after a very bad experience with a dentist in London years ago.",
    author: "Kate Henry | Dec. 2018"
  },
  {
    text: "Fantastic- painless, wouldn’t go anywhere else",
    author: "Deborah Freeman - Sales | July 2018"
  },
  {
    text: "Great service overall, nothing to complain about. Every procedure is explained clearly and done so in a way which can be clearly understood by the patient. Best dentist to go to!",
    author: "Chantelle Conroy - Student | March 2018"
  },
  {
    text: "Great Experience! Painless, quick & easy! Thank you very much",
    author: "Claire C. - Retail Manager | May 2018"
  },
  {
    text: "I’ve never been a fan of dental visits, especially the clean & polish. However, I can always feel at ease when having check-up, clean & polish at Freemans Bay Dental. No sensitivity, pain or discomfort, just great results!",
    author: "Janet Shyu - Designer | Jan 2018"
  },
  {
    text: "The Whitening was great! So happy I found this place. Definitely will come back some day. Really good results!",
    author: "Andrea Chavez - Student | October 2016"
  },
  {
    text: "The people at Freemans Bay Dental Centre are very friendly and provide a great service.",
    author: "Peter Harrison- Google Review, Dec 2024"
  },
  {
    text: "Freemans Bay Dental Centre is consistently the best dentist work I have ever had. The pain management is perfect and all the staff are fantastic. I totally recommend this Dentistry.",
    author: "Tanya Hackney - Google Review, Nov 2021"
  },
  {
    text: "I've been going to Sandeep now for a number of years and am very happy with the professionalism and his \"bedside manner\"...very important when you are in vulnerable position and when someone has a drill close to your teeth!.\nAbsolutely no hesitating him or recommending him to others.",
    author: "Roscoe Thorby - Google Review, July 2019"
  },
  {
    text: "I've always been a fearful dental patient and had some 'awful' experiences, until now. I've been treated with respect, listened to and more importantly heard. Everything has been explained clearly ,my welfare has been constantly checked and I've had a pain free experience each time I've returned. I have no hesitation in recommending this dental practice with its kind, caring and professional people. Dare I say a pleasurable experience.\nMany Thanks.",
    author: "B&Brown\nBrenda Brown - Administration Officer | 27/04/2019"
  },
  {
    text: "Great, friendly service. Very trustworth, professional opinion as well.\nThanks a lot!",
    author: "Kalpana Naidu - Insurance | 24/04/2019"
  },
  {
    text: "Visiting the dentist is always something we’d rather not do, but when you have to go, it’s reassuring to be in the hands of someone as caring and considerate as Sandeep. He can be highly recommended!",
    author: "Gilbert & Tina Egdell - Retired | July 2018"
  },
  {
    text: "Best dentist I’ve been to! Extraction was easy & I felt relaxed instead of the usual anxiety of having a tooth pulled. The dentist regularly checked up on how I was doing which was very reassuring. The dental assistants were great and overall helped make my extraction a breeze. Thank you!",
    author: "Aidan Francis O’loughlin | June 2018"
  },
  {
    text: "I had Beyond in-House with Dr. Sandeep who was very friendly and thoughtful. The treatment worked so well, I could clearly see my teeth had whitened 4-5 shades on the scale- very impressive – and I had no sensitivity compared to another product I tried years ago! I would highly recommend Freemans Bay Dental for professionally guided whitening as I know many are not and have risks involved. Thank you Sandeep & Rebecca!",
    author: "Denine N. - Manager | May 2018"
  },
  {
    text: "Very nice feeling of cleaning, no pain, no scare and high quality polish. Thanks a lot",
    author: "Wendy Xu - Architect | Jan 2018"
  },
  {
    text: "Dr. Nagpal was the most gentle dentist I have ever had. Staff are lovely, interested and caring. I will be back now that I have found a dentist who is so gentle!",
    author: "Donna Brookbanks - actor | Feb. 2017"
  },
  {
    text: "Outstanding whitening results, great practice and I would definitely come to Freemans Bay Dental again.",
    author: "Andrew Buckthought - Project Manager | February 2013"
  }
];

export default function TestimonialsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 md:px-24 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-brand-blue-400" />
              <span className="text-[10px] text-brand-blue-400 font-bold uppercase tracking-[0.3em]">Patient Stories</span>
            </div>
          </Reveal>
          <TextReveal 
            text="Real Experiences. Honest Feedback." 
            className="text-5xl md:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tight mb-8"
          />
          <Reveal delay={0.2}>
            <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              We take pride in the relationships we build with our patients. Here is what they have to say about their journey with Freemans Bay Dental.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {allTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-brand-blue-400 fill-brand-blue-400" />
                  ))}
                </div>
                
                <p className="text-slate-800 font-serif text-lg leading-relaxed mb-8 whitespace-pre-line">
                  {testimonial.text}
                </p>
                
                <div className="pt-6 border-t border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 leading-relaxed whitespace-pre-line">
                    {testimonial.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
