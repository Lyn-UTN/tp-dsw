'use client';

import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Número 404 grande y llamativo */}
        <div className="relative mb-8">
          <h1 className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* msj principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ¡Ups! Página no encontrada
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          La página que estás buscando aún no está disponible o está en
          desarrollo.
        </p>

        {/* ilustracion para q quede mas fachero */}
        <div className="mb-10 flex justify-center gap-4">
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>

        {/* botones para ir a la pag anterior */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 min-w-[160px]"
          >
            ← Volver atrás
          </button>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 min-w-[160px] shadow-lg shadow-blue-600/30"
          >
            Ir al inicio
          </button>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Si crees que esto es un error, por favor contacta al soporte.
        </p>
      </div>
    </div>
  );
}
