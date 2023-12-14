import { PartialType } from '@nestjs/swagger';
import { CreateFollowDto } from './create-follow.dto';

export class RemoveFollowDto extends PartialType(CreateFollowDto) {}
