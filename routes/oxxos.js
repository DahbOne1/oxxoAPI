import { Router } from "express";
import { OxxoController } from "../controllers/oxxos.js";

//const oxxos = readJSON("./oxxos.json")

export const createOxxoRouter = ({ oxxoModel }) => {
    const oxxosRouter = Router()
    const oxxoController = new OxxoController({ oxxoModel })

    //consultar todos los oxxos
    oxxosRouter.get("/all", oxxoController.getAll)

    //Consultar todos los oxxos aprovados
    oxxosRouter.get("/", oxxoController.getAllApproved)

    //Consultar todos los oxxos por aprovar
    oxxosRouter.get("/pending", oxxoController.getAllPendingApproved)

    //Consultar un oxxo por su id
    oxxosRouter.get("/:id", oxxoController.getById)

    //Crear un nuevo oxxo
    oxxosRouter.post("/", oxxoController.create)

    //Eliminar un oxxo
    oxxosRouter.delete("/:id", oxxoController.delete)

    //Actualizar un oxxo
    oxxosRouter.put("/:id", oxxoController.update)

    //Aprovar la creacion
    oxxosRouter.patch("/:id", oxxoController.partialUpdate)

    return oxxosRouter
}