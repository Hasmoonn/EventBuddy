import express from 'express';
import { getEventGuests, createGuest, updateGuest, deleteGuest} from  "../controllers/guestController.js";
import {userAuth} from "../middleware/userAuth.js";
import guestRouter from '../../../../../Downloads/backend-oshada/routes/guestRoutes';


export default guestRouter;
