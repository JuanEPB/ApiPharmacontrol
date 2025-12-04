import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { Rol } from './users/dto/roles.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  console.log('🌱 Iniciando seeder para la cuenta de servicio del Chatbot...');

  const chatbotEmail = 'chatbot-service@pharmacontrol.com';
  const chatbotPassword = process.env.CHATBOT_INITIAL_PASSWORD || 'ReemplazarConUnaContraseñaSeguraDesdeEnv';

  try {
    const existingUser = await usersService.findByEmail(chatbotEmail);
    if (existingUser) {
      console.log('✅ El usuario del Chatbot ya existe. No se requiere ninguna acción.');
    } else {
      await usersService.create({
        nombre: 'Chatbot',
        apellido: 'Servicio',
        email: chatbotEmail,
        contraseña: chatbotPassword,
        rol: Rol.CHATBOT,
      });
      console.log('✅ ¡Usuario del Chatbot creado exitosamente!');
    }
  } catch (error) {
    console.error('❌ Error al crear el usuario del Chatbot:', error);
  } finally {
    await app.close();
    console.log('🌱 Seeder finalizado.');
  }
}

bootstrap();