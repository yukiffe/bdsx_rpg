import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";

//기본명령어 제거 help는 어떻게 지우는지 모르겠음
command.find("list").signature.permissionLevel = CommandPermissionLevel.Operator;
command.find("me").signature.permissionLevel = CommandPermissionLevel.Operator;
command.find("msg").signature.permissionLevel = CommandPermissionLevel.Operator;
command.find("tell").signature.permissionLevel = CommandPermissionLevel.Operator;
command.find("w").signature.permissionLevel = CommandPermissionLevel.Operator;
