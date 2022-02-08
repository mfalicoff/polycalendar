import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import classController from '@controllers/class.controller';
import { CreateClassDto } from '@dtos/class.dto';

class ClassRoute implements Routes {
  public path = '/class';
  public router = Router();
  public classController = new classController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.classController.getClasses);
    this.router.get(`${this.path}/:id`, this.classController.getClassById);
    this.router.post(`${this.path}`, validationMiddleware(CreateClassDto, 'body'), this.classController.createClass);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateClassDto, 'body', true), this.classController.updateClass);
    this.router.delete(`${this.path}/:id`, this.classController.deleteClass);
  }
}

export default ClassRoute;
