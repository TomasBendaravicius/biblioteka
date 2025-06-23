import express from "express";
import {
  newRegistracija,
  getUserRegistracijos,
  editRegistracija,
  removeRegistracija,
} from "../controllers/registracijaController.mjs";

// Jei turi auth middleware, importuok jį
// import { protect } from "../controllers/authController.mjs";

const registracijaRouter = express.Router();

// Sukurti naują knygos rezervaciją
registracijaRouter.post("/", /*protect,*/ newRegistracija);

// Gauti visas savo knygų rezervacijas
registracijaRouter.get("/", /*protect,*/ getUserRegistracijos);

// Atnaujinti rezervaciją (datą, komentarą)
registracijaRouter.patch("/:id", /*protect,*/ editRegistracija);

// Ištrinti rezervaciją (atšaukti užsakymą)
registracijaRouter.delete("/:id", /*protect,*/ removeRegistracija);

export default registracijaRouter;