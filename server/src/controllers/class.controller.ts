import { NextFunction, Request, Response } from 'express';
import { Class } from '@interfaces/class.interface';
import ClassService from '@services/class.service';
import { CreateClassDto } from '@dtos/class.dto';

class ClassController {
  public classService = new ClassService();

  public getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllClasses: Class[] = await this.classService.findAllClasses();

      res.status(200).json({ data: findAllClasses, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classId: string = req.params.id;
      const findOneClassData: Class = await this.classService.findClassById(classId);

      res.status(200).json({ data: findOneClassData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classData: CreateClassDto = req.body;
      const createClassData: Class = await this.classService.createClass(classData);

      res.status(201).json({ data: createClassData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classId: string = req.params.id;
      const classData: CreateClassDto = req.body;
      const updateClassData: Class = await this.classService.updateClass(classId, classData);

      res.status(200).json({ data: updateClassData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classId: string = req.params.id;
      const deleteClassData: Class = await this.classService.deleteClass(classId);

      res.status(200).json({ data: deleteClassData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ClassController;
