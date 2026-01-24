import GlassLogin from "@/components/GlassLogin";

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">

            {/* 1. EL BACKGROUND (GIF) */}
            <div className="absolute inset-0 z-0">
                {/* TRUCO CSS: 'invert' vuelve el GIF blanco en negro.
           'opacity-60' lo hace sutil para que no distraiga.
           'object-cover' asegura que cubra toda la pantalla.
        */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/background.gif"
                    alt="Background Animation"
                    className="h-full w-full object-cover invert opacity-60"
                />

                {/* Capa extra para asegurar que el texto sea legible siempre */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 2. EL CONTENIDO (Z-Index bajo para no tapar el modal de World ID) */}
            <div className="relative z-10 px-4">
                <GlassLogin />
            </div>

        </main>
    );
}
