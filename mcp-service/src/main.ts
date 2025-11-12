import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    });

    // Añadir header para Private Network Access (preflight)
    // Algunos navegadores (Chrome) requieren que el servidor responda
    // con Access-Control-Allow-Private-Network: true cuando el cliente
    // solicita recursos en la red local desde un contexto más público.
    // Esto solo tiene efecto en las respuestas OPTIONS (preflight).
    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Private-Network', 'true');
        }
        next();
    });

    const port = 3000;
    await app.listen(port);
    console.log(`Servidor backend escuchando en http://localhost:${port}`);


}

bootstrap().catch(err => {
    console.error('Error al iniciar la aplicación:', err);
    process.exit(1);
});