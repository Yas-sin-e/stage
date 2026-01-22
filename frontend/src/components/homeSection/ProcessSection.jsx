// import { useAuth } from "../../context/auth";
// import { useNavigate } from "react-router-dom";

// const ProcessSection = () => {
//     const navigate = useNavigate();

//   const { isAuthenticated } = useAuth();
//   const steps = [
//     { 
//       number: '01', 
//       title: 'Inscription gratuite', 
//       description: 'Créez votre compte en 2 minutes et accédez à votre espace personnel',
//       icon: '✍️'
//     },
//     { 
//       number: '02', 
//       title: 'Parlez à l\'IA', 
//       description: 'Décrivez votre problème à l\'assistant intelligent disponible 24/7',
//       icon: '🤖'
//     },
//     { 
//       number: '03', 
//       title: 'Devis intelligent', 
//       description: 'L\'IA génère un devis personnalisé et vous conseille sur les options',
//       icon: '💰'
//     },
//     { 
//       number: '04', 
//       title: 'Suivi en temps réel', 
//       description: 'Notifications instantanées à chaque étape de la réparation',
//       icon: '📲'
//     }
//   ];

//   return (
//     <section className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      
//       {/* Background Elements */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6">
        
//         {/* Section Header */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//             <span className="text-blue-400 text-sm font-semibold">PROCESSUS INTELLIGENT</span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
//             Comment ça marche ?
//           </h2>
//           <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//             4 étapes simples pour gérer vos véhicules avec l'intelligence artificielle
//           </p>
//         </div>

//         {/* Steps Grid */}
//         <div className="grid md:grid-cols-4 gap-8">
//           {steps.map((step, i) => (
//             <div 
//               key={i} 
//               className="group relative"
//             >
//               {/* Connector Line (sauf dernier) */}
//               {i < steps.length - 1 && (
//                 <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent z-0" />
//               )}

//               {/* Card */}
//               <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                
//                 {/* Number Badge */}
//                 <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-3xl font-black mb-6 shadow-lg group-hover:scale-110 transition-transform">
//                   <span className="relative z-10">{step.number}</span>
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 blur transition-opacity" />
//                 </div>

//                 {/* Icon */}
//                 <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
//                   {step.icon}
//                 </div>

//                 {/* Content */}
//                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
//                   {step.title}
//                 </h3>
//                 <p className="text-slate-400 leading-relaxed">
//                   {step.description}
//                 </p>

//                 {/* Hover Glow Effect */}
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all pointer-events-none" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* AI Feature Banner */}
//         <div className="mt-20 max-w-4xl mx-auto">
//           <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               {/* Icon */}
//               <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/50">
//                 <span className="text-4xl">🤖</span>
//               </div>
              
//               {/* Content */}
//               <div className="flex-1 text-center md:text-left">
//                 <h3 className="text-2xl font-black text-white mb-2">
//                   Assistant IA disponible 24/7
//                 </h3>
//                 <p className="text-slate-300 leading-relaxed">
//                   Posez vos questions à tout moment, obtenez un diagnostic instantané et des conseils personnalisés pour votre véhicule
//                 </p>
//               </div>
              
//               {/* CTA */}
//               <button className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-bold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
//                 Essayer maintenant
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center mt-16">
//           <p className="text-slate-400 mb-6 text-lg">Prêt à profiter d'une gestion intelligente ?</p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!isAuthenticated&& 
//             <button onClick={() => navigate('/register')}className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2">
//               Créer un compte gratuit
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </button>
//             }
//             <button onClick={() => navigate('/services')}className="px-8 py-4 bg-white/5 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 backdrop-blur-sm">
//               En savoir plus
//             </button>
//           </div>
          
//           {/* Trust Badges */}
//           <div className="flex flex-wrap justify-center gap-4 mt-8">
//             {[
//               '✓ Gratuit',
//               '✓ Sans engagement', 
//               '✓ IA incluse',
//               '✓ Support 24/7'
//             ].map((badge, i) => (
//               <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm backdrop-blur-sm">
//                 {badge}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProcessSection;