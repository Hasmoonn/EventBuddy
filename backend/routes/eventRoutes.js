import express from "express";
import { createEvent, getEventById, updateEvent, getUserEvents, deleteEvent } from "../controllers/eventController.js";
import { userAuth } from "../middleware/userAuth.js";

const eventRouter = express.Router();

eventRouter.post("/", userAuth, createEvent);

eventRouter.get("/user", userAuth, getUserEvents);


eventRouter.put("/:id", userAuth, updateEvent);


eventRouter.delete("/:id", userAuth, deleteEvent);


eventRouter.get("/:id", userAuth, getEventById);

export default eventRouter;
