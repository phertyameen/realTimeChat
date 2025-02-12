import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { AdminService } from "./provider/admin.service";



@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService) {}


}