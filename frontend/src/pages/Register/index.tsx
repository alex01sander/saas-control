import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../contexts/AuthContext";
import { registerFormSchema, RegisterFormData } from "./schema";
import { api } from "../../lib/axios";
import { UserPlus } from "lucide-react";

export function RegisterPage() {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    });

    async function handleRegister(data: RegisterFormData) {
        try {
            await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            // Auto login after registration
            await signIn({ email: data.email, password: data.password });
            navigate("/dashboard");
        } catch (error) {
            alert("Erro ao criar conta. Tente novamente.");
            console.error(error);
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center lg:text-left">
                <h2 className="text-xl font-semibold text-gray-900">Crie sua conta</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Junte-se a nós e comece a gerenciar suas assinaturas.
                </p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        placeholder="João Silva"
                        {...register("name")}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-xs mt-1 block font-medium">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                    </label>
                    <input
                        type="email"
                        placeholder="nome@exemplo.com"
                        {...register("email")}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs mt-1 block font-medium">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1 block font-medium">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-xs mt-1 block font-medium">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                    {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <UserPlus size={18} />
                            Criar minha conta
                        </>
                    )}
                </button>
            </form>

            <div className="text-center text-sm text-gray-500">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-500">
                    Faça login aqui
                </Link>
            </div>
        </div>
    );
}
