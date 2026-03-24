import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../contexts/AuthContext';
import { profileFormSchema, ProfileFormData } from './schema';
import { api } from '../../lib/axios';
import { User, ShieldCheck, Mail, Camera, Save } from 'lucide-react';

export function ProfilePage() {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    }
  });

  async function handleUpdateProfile(data: ProfileFormData) {
    try {
      await api.put('/users/profile', data);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil.');
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-500 mt-1">Gerencie suas informações pessoais e configurações de segurança.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-indigo-600 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <div className="mt-6 w-full pt-6 border-t border-gray-50 text-left">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Status da Assinatura</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                {user?.subscriptionStatus || 'ATIVO'}
              </div>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center gap-2">
                <User size={20} className="text-indigo-600" />
                <h3 className="font-semibold text-gray-900">Dados Pessoais</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome Completo</label>
                  <input 
                    {...register('name')}
                    className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-sans"
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                    E-mail <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">Leitura</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      {...register('email')}
                      disabled
                      className="w-full p-3 pl-10 border border-gray-200 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center gap-2">
                <ShieldCheck size={20} className="text-indigo-600" />
                <h3 className="font-semibold text-gray-900">Segurança</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha Atual</label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    {...register('currentPassword')}
                    className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova Senha</label>
                  <input 
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    {...register('newPassword')}
                    className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-sans"
                  />
                  {errors.newPassword && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.newPassword.message}</span>}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
              >
                {isSubmitting ? (
                   <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
