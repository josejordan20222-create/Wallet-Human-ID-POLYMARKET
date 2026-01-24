import GlassLogin from "@/components/GlassLogin";

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">

            {/* 1. EL BACKGROUND (GIF) */}
            <div className="absolute inset-0 z-0">
                {/* Overlay oscuro para legibilidad */}
                <div className="absolute inset-0 z-10 bg-black/60" />

                {/* Etiqueta de imagen para el GIF */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/background.gif"
                    alt="Background Animation"
                    className="h-full w-full object-cover opacity-80"
                />
            </div>

            {/* 2. EL CONTENIDO (Z-Index alto para estar encima del fondo) */}
            <div className="relative z-20 px-4">
                <GlassLogin />
            </div>

        </main>
    );
}
