import { Router } from "express";
import { Controller } from "@src/default/controller";

export default function defaultRoutes() {
  const router = Router();

  const controller = new Controller();

  // Public Routes
  router.post("/", controller.post);
  router.get("/:id", controller.get);

  // Protected Routes

  return router;
}
