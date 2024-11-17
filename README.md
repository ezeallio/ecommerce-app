# E-commerce App

## Recomendaciones previas

Tener la última versión de Nodejs (22.11.0) instalada para evitar problemas de compatibilidad. El proyecto se hizo con las últimas versiones de las librerías y hay algunas como por ejemplo React que aplicó algunos cambios en sus herramientas.

## Configuración

Instalar las dependencias

```bash
npm install
```

En el archivo Router.tsx reemplazar
```
const firebaseConfig: FirebaseOptions = {
  
};
```

con el que se encuentra adjunto en el comentario de la entrega del proyecto como medida de seguridad ya que son las credenciales de conexión a la base de datos de Firebase

## Ejecutar el proyecto

```bash
npm run dev
```
