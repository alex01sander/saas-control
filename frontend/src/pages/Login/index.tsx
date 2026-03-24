import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../contexts/AuthContext";
import { loginFormSchema, LoginFormData } from "./schema";
import { LogIn } from "lucide-react";

export function LoginPage() {
    const { signIn } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
    });

    async function handleLogin(data: LoginFormData) {
        try {
            await signIn(data);
        } catch (error) {
            alert("Falha no login. Verifique suas credenciais.");
            console.error(error);
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center lg:text-left">
                <h2 className="text-xl font-semibold text-gray-900">Acesse sua conta</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Insira seus dados para continuar para o painel.
                </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                    </label>
                    <input
                        type="email"
                        placeholder="nome@exemplo.com"
                        {...register("email")}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs mt-1 block font-medium">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <input
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-xs mt-1 block font-medium">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Lembrar de mim
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <LogIn size={18} />
                            Entrar na plataforma
                        </>
                    )}
                </button>
            </form>

            <div className="text-center text-sm text-gray-500">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-500">
                    Crie sua conta agora
                </Link>
            </div>
        </div>
    );
}
