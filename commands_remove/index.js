"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
command_2.command.find("list").signature.permissionLevel =
    command_1.CommandPermissionLevel.Operator;
command_2.command.find("me").signature.permissionLevel = command_1.CommandPermissionLevel.Operator;
command_2.command.find("msg").signature.permissionLevel = command_1.CommandPermissionLevel.Operator;
command_2.command.find("tell").signature.permissionLevel =
    command_1.CommandPermissionLevel.Operator;
command_2.command.find("w").signature.permissionLevel = command_1.CommandPermissionLevel.Operator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEwRDtBQUMxRCwwQ0FBdUM7QUFFdkMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWU7SUFDNUMsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0FBQ2xDLGlCQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0FBQy9FLGlCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0FBQ2hGLGlCQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlO0lBQzVDLGdDQUFzQixDQUFDLFFBQVEsQ0FBQztBQUNsQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLGdDQUFzQixDQUFDLFFBQVEsQ0FBQyJ9