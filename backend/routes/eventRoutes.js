import express from "express";
import { createEvent, getEventById, updateEvent, getUserEvents, deleteEvent } from "../controllers/eventController.js";
import {userAuth} from "../middleware/userAuth.js";



export default eventRouter;
