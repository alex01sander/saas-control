import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
            <div className="flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="h-10 w-10 bg-indigo-600 rounded-lg mb-4 flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            SaaS Control
                        </h1>
                        <p className="text-sm text-gray-500 mt-2">
                            Gerencie suas assinaturas de forma inteligente.
                        </p>
                    </div>

                    <Outlet />

                    <footer className="text-center lg:text-left text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} SaaS Control Inc.
                        Todos os direitos reservados.
                    </footer>
                </div>
            </div>

            <div className="hidden lg:flex bg-indigo-600 items-center justify-center p-12 relative overflow-hidden">
                <div className="relative z-10 max-w-lg text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        A infraestrutura que seu negócio merece.
                    </h2>
                    <p className="text-indigo-100 text-lg">
                        Integração nativa com Stripe, gestão de usuários e
                        relatórios em tempo real.
                    </p>
                </div>

                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>
        </div>
    );
}
