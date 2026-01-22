import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  

  const onSubmit = async (data) => {
  
    
    

    console.log("Données envoyées :", data);
    toast.success("Message envoyé avec succès !");
    
    reset();
  };

  const contactInfo = [
    { 
      icon: '📍', 
      title: 'Adresse', 
      value: 'Nabeul Sidi Achour, Tunisie',
      gradient: 'from-blue-600 to-cyan-500'
    },
    { 
      icon: '📞', 
      title: 'Téléphone', 
      value: '+216 22 94 99 44 ',
      gradient: 'from-purple-600 to-pink-500'
    },
    { 
      icon: '✉️', 
      title: 'Email', 
      value: 'yassineaounallah22@gmail.com',
      gradient: 'from-amber-600 to-orange-500'
    }
  ];

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 scroll-mt-20 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
            CONTACTEZ-NOUS
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Parlons de votre projet
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Une question ? Besoin d'un devis ? Notre équipe est à votre écoute pour vous accompagner
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Nos coordonnées
              </h3>
             
            </div>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, i) => (
                <div 
                  key={i} 
                  className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {contact.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wide">
                        {contact.title}
                      </h4>
                      <p className="text-white font-medium text-lg">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Horaires d'ouverture
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Lundi - Vendredi</span>
                  <span className="text-white font-medium">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Samedi</span>
                  <span className="text-white font-medium">8h00 - 13h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dimanche</span>
                  <span className="text-red-400 font-medium">Fermé</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Success Message */}
              {/* {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-medium flex items-center gap-2 animate-fade-in">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  {success}
                </div>
              )} */}

              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Nom complet <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                    errors.name ? "border-red-500" : "border-slate-700"
                  } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                  {...register("name", {
                    required: "Le nom est obligatoire",
                    minLength: { value: 2, message: "Minimum 2 caractères" },
                  })}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Adresse email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                    errors.email ? "border-red-500" : "border-slate-700"
                  } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                  {...register("email", {
                    required: "Email obligatoire",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email non valide",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Votre message <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows="5"
                  placeholder="Comment pouvons-nous vous aider ?"
                  className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                    errors.message ? "border-red-500" : "border-slate-700"
                  } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none text-white placeholder-slate-500 transition-all`}
                  {...register("message", {
                    required: "Message obligatoire",
                    minLength: { value: 10, message: "Minimum 10 caractères" },
                  })}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] disabled:cursor-not-allowed relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Vos données sont protégées et ne seront jamais partagées
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;