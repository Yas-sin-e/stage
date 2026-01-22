// src/pages/client/ProfilePage.jsx
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (user && !isEditing) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, reset]);


 const onSubmit = async (data) => {
    try {
      // 1. On met à jour le contexte global
      await updateProfile(data);
      
      // 2. Succès
      toast.success('Profil mis à jour avec succès !');
      
      // 3. On quitte le mode édition SEULEMENT après le succès
      setIsEditing(false);
    } catch (error) {
      toast.error("Erreur lors de la modification");
    }
  };

  const handleCancel = () => {
    reset({
      name: user?.name, 
      email: user?.email, 
      phone: user?.phone 
    });
    setIsEditing(false);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
          
          {/* Header avec Avatar */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-black text-5xl border-4 border-slate-900 shadow-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 p-8">
            
            {/* User Info Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-white mb-2">{user?.name}</h1>
              <p className="text-slate-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Client AutoExpert
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Nom complet <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'Le nom est obligatoire',
                    minLength: { value: 2, message: 'Minimum 2 caractères' }
                  })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                    errors.name ? 'border-red-500' : 'border-slate-700'
                  } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email obligatoire',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email non valide'
                    }
                  })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-slate-700'
                  } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Téléphone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phone', { 
                    required: 'Téléphone obligatoire',
                    pattern: {
                      value: /^[0-9+\s()-]+$/,
                      message: 'Numéro invalide'
                    }
                  })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                    errors.phone ? 'border-red-500' : 'border-slate-700'
                  } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1.5">{errors.phone.message}</p>}
              </div>
                    
              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                {!isEditing && 
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Modifier le profil
                  </button>
                  } 
                  {isEditing&&(
                  <>
                    <button
                      type="submit"
                      
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Annuler
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        

         
        
      </div>
    </div>
  );
};

export default ProfilePage;