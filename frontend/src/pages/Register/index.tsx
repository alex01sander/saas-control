import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { registerFormSchema, RegisterFormData } from "./schema";

export function RegisterPage() {
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

            alert("Conta criada com sucesso! Faça login para continuar.");
            navigate("/login");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Erro ao criar conta.";
            alert(errorMessage);
        }
    }

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit(handleRegister)}>
                <h1>Criar Conta</h1>

                <input
                    type="text"
                    placeholder="Seu nome"
                    {...register("name")}
                />
                {errors.name && <span>{errors.name.message}</span>}

                <input
                    type="email"
                    placeholder="Seu e-mail"
                    {...register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>}

                <input
                    type="password"
                    placeholder="Sua senha"
                    {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <input
                    type="password"
                    placeholder="Confirme a senha"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                )}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "A processar..." : "Registar"}
                </button>
            </form>
        </div>
    );
}
