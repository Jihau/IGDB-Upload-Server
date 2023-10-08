import {Request, Response, NextFunction} from 'express';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';

const uploadPost = async (req: Request, res: Response<{}, { coords: Point }>, next: NextFunction) => {
    try {
        if (!req.file) {
            const err = new CustomError('file not valid', 400);
            throw err;
        }

        const response = {
            message: 'file uploaded', data: {
                filename: req.file.filename, thumbnail: req.file.filename + '-thumbnail', location: res.locals.coords,
            },
        };
        res.json(response);
    } catch (error) {
        next(new CustomError((error as Error).message, 400));
    }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            const err = new CustomError('file not valid', 400);
            throw err;
        }
        const response = {
            message: 'file deleted', data: {
                filename: req.file.filename, thumbnail: req.file.filename + '-thumbnail', location: res.locals.coords,
            },
        };
        res.json(response);
    } catch (error) {
        next(new CustomError((error as Error).message, 400));
    }
}

const replacePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            const err = new CustomError('file not valid', 400);
            throw err;
        }
        const response = {
            message: 'file replaced', data: {
                filename: req.file.filename, thumbnail: req.file.filename + '-thumbnail', location: res.locals.coords,
            },
        };
        res.json(response);
    } catch (error) {
        next(new CustomError((error as Error).message, 400));
    }
}

export {uploadPost};
