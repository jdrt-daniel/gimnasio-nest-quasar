import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenusController } from './menus/menus.controller';
import { MenusModule } from './menus/menus.module';
import { MenusService } from './menus/menus.service';
import { PrismaModule } from './prisma/prisma.module';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { ProveedorModule } from './proveedor/proveedor.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { InstructorModule } from './instructor/instructor.module';
import { TelefonoModule } from './telefono/telefono.module';
import { PlanModule } from './plan/plan.module';
import { DisciplinaModule } from './disciplina/disciplina.module';

@Module({
  imports: [PrismaModule, RolesModule, MenusModule, ProveedorModule, UsuarioModule, ClienteModule, InstructorModule, TelefonoModule, PlanModule, DisciplinaModule],
  controllers: [AppController, RolesController, MenusController],
  providers: [AppService, RolesService, MenusService],
})
export class AppModule {}
