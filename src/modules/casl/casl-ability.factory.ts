import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility, MongoQuery } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../users/entities/user.entity";
import { Role } from "src/common/enums/role.enum";
import { Action } from "src/common/enums/action.enum";


type Subjects = InferSubjects<typeof UserEntity> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: UserEntity) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, Conditions>);

        // Admins
        if (user.role === Role.Admin) {
            can(Action.Manage, 'all');
        } else {
            can(Action.Read, 'all'); // read-only access to everything
            cannot(Action.Delete, UserEntity).because('Only admin can delete an user.');
            cannot(Action.Update, UserEntity).because('Only admin can update an user.');
        }


        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
