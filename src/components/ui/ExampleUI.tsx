import Image from "next/image"

export default function ExampleUI() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenido a mi tienda virtual
        </h1>
        
        {/* Ejemplo de botones con DaisyUI */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button className="btn btn-primary">Botón Primario</button>
          <button className="btn btn-secondary">Botón Secundario</button>
          <button className="btn btn-accent">Botón Acento</button>
          <button className="btn btn-ghost">Botón Fantasma</button>
        </div>
        
        {/* Ejemplo de tarjeta con DaisyUI */}
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
          <figure>
            <Image
              src="https://plus.unsplash.com/premium_photo-1711031505781-2a45c879ceac?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW0lQzMlQTFnZW5lcyUyMGltcHJlc2lvbmFudGVzfGVufDB8fDB8fHww" 
              alt="Shoes"
              width={500}
              height={500}
              className="rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Zapatos!</h2>
            <p>Si te gustan los zapatos, este es el lugar para ti.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Comprar ahora</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}