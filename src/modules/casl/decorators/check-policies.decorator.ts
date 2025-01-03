import { SetMetadata } from "@nestjs/common";
import { AppAbility } from "../casl-ability.factory";
import { Action } from "src/common/enums/action.enum";
import { UserEntity } from "src/modules/users/entities/user.entity";

interface IPolicyHandler {
    action: Action;
    subject: any; // Adjust the type as per your application's subject types
    handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers);

export class UpdateUserPolicyHandler implements IPolicyHandler {
    action = Action.Update;
    subject = UserEntity;

    handle(ability: AppAbility) {
        return ability.can(this.action, this.subject);
    }
}

export class DeleteUserPolicyHandler implements IPolicyHandler {
    action = Action.Delete;
    subject = UserEntity;

    handle(ability: AppAbility) {
        return ability.can(this.action, this.subject);
    }
}