import { validateOxxo, validatePartialOxxo } from "../schemas/oxxos.js"

export class OxxoController {
    constructor({ oxxoModel }) {
        this.oxxoModel = oxxoModel
    }

    //Recuperar todos los oxxos
    getAll = async (req, res) => {
        const oxxos = await this.oxxoModel.getAll()
        if (oxxos == null) {
            res.json("No se encontraron resultados")
        }
        res.json(oxxos)

    }

    //Recuperar todos los oxxos aprovados
    getAllApproved = async (req, res) => {
        const oxxos = await this.oxxoModel.getAllApproved()
        if (oxxos == null) {
            res.json("No se encontraron resultados")
        }
        res.json(oxxos)
    }

    //Recuperar todos los oxxos con actualizacion pendiente
    getAllPendingApproved = async (req, res) => {
        const oxxos = await this.oxxoModel.getAllPendingApproved()
        if (oxxos == null) {
            res.json("No se encontraron resultados")
        }
        res.json(oxxos)
    }

    //Recuperar un oxxo por su id
    getById = async (req, res) => {
        const { id } = req.params
        const oxxo = await this.oxxoModel.getById({ id })
        if (oxxo == null) {
            res.json("No se encontraron resultados")
        }
        res.json(oxxo)
    }

    //Crear un nuevo oxxo
    create = async (req, res) => {
        const result = validateOxxo(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newOxxo = await this.oxxoModel.create({ input: result.data })
        res.status(201).json(newOxxo)
    }

    //Eliminar un oxxo
    delete = async (req, res) => {
        const { id } = req.params
        const deletedOxxo = await this.oxxoModel.delete({ id })
        if (deletedOxxo === false) {
            return res.status(404).json({ message: "No se encontro el Oxxo" })
        }
        return res.json(deletedOxxo)
    }

    //Actualizar un oxxo
    update = async (req, res) => {
        const result = validatePartialOxxo(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const updatedOxxo = await this.oxxoModel.update({
            id,
            input: result.data,
        })
        return res.json(updatedOxxo)
    }

    //Actualizar parcialmente un oxxo
    partialUpdate = async (req, res) => {
        const { id } = req.params
        const updatedOxxo = await this.oxxoModel.partialUpdate({ id })
        res.json(updatedOxxo)
    }


}