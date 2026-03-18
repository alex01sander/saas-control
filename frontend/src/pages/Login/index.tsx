import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../contexts/AuthContext";
import { loginFormSchema, LoginFormData } from "./schema";

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
        <div className="login-container">
            <form onSubmit={handleSubmit(handleLogin)}>
                <h1>Acessar SaaS</h1>

                <div>
                    <input
                        type="email"
                        placeholder="Seu e-mail"
                        {...register("email")}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Sua senha"
                        {...register("password")}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Carregando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
