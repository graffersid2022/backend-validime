import joi, {ObjectSchema} from "joi"
import Logging from "../library/Loggin";

import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../models/Author";
import { IBook } from "../models/Book";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) =>{
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({error});
        }
    }
};

export const Schema = {
    author: {
        create: joi.object<IAuthor>({
            name: joi.string().required()
        }),
        update: joi.object<IAuthor>({
            name: joi.string().required()
        })
    },
    book: {
        create: joi.object<IBook>({
            author: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: joi.string().required()
        }),
        update: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        title: joi.string().required()
    }
}