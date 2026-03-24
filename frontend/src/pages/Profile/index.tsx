import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../contexts/AuthContext';
import { profileFormSchema, ProfileFormData } from './schema';
import { api } from '../../lib/axios';
import { ShieldCheck } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-200 bg-gray-50 flex items-center gap-4">
          <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm">Membro desde {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleUpdateProfile)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input 
                {...register('name')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail (Não alterável)</label>
              <input 
                {...register('email')}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" /> Segurança
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="password"
                placeholder="Senha atual"
                {...register('currentPassword')}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input 
                type="password"
                placeholder="Nova senha"
                {...register('newPassword')}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}
