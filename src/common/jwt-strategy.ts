import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'domain/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/user.repository';
import { JwtPayload } from 'common/type';
import { User } from 'domain/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserLocalRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user = await this.userRepository.getOneUser({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}