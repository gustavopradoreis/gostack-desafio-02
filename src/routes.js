import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
	return res.json({ ok: true });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Guard above routes with middleware "auth"
routes.use(authMiddleware);

routes.post('/meetups', MeetupController.store);
routes.put('/meetups', MeetupController.update);
routes.delete('/meetups', MeetupController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
