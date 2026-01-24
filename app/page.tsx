import LoginCard from "@/components/LoginCard";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Elementos decorativos de fondo (Orbes de luz distantes y sutiles) */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

            {/* Login Card Component */}
            <div className="z-10 w-full flex justify-center">
                <LoginCard />
            </div>

            <footer className="absolute bottom-6 text-white/20 text-[10px] tracking-widest text-center w-full uppercase">
                Secured by World ID & Railway
            </footer>
        </main>
    );
}
