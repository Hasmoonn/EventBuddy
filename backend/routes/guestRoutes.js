import express from 'express';
import { getEventGuests, createGuest, updateGuest, deleteGuest} from  "../controllers/guestController.js";
import {userAuth} from "../middleware/userAuth.js";
import guestRouter from '../../../../../Downloads/backend-oshada/routes/guestRoutes';

const guestRouter = express.Router();

guestRouter.get('/:eventId', userAuth, getEventGuests);
guestRouter.post('/:eventId', userAuth, createGuest);
guestRouter.put('/:eventId/:guestId', userAuth, updateGuest);
guestRouter.delete('/:eventId/:guestId', userAuth, deleteGuest);

export default guestRouter;
