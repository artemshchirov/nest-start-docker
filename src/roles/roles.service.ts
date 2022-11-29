import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

  async createRole(dto: CreateRoleDto) {
    console.log('roles.service createRole(dto: ', dto);
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    console.log('roles.service getRoleByValue(value: ', value);
    const role = await this.roleRepository.findOne({ where: { value } })
    return role
  }

}
