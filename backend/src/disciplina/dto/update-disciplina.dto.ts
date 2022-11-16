import { PartialType } from '@nestjs/swagger';
import { CreateDisciplinaDto } from './create-disciplina.dto';

export class UpdateDisciplinaDto extends PartialType(CreateDisciplinaDto) {}
