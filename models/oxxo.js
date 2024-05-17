import { readJSON } from "../utils.js";
import { randomUUID } from "crypto";
import fs from "node:fs"



export class OxxoModel {
    //Recuperrar todos los oxxos
    static getAll = async () => {
        const oxxos = readJSON("./oxxos.json")
        return oxxos
    }

    //Recuperar todos los oxxos aprovados
    static getAllApproved = async () => {
        const oxxos = readJSON("./oxxos.json")
        return oxxos.filter((oxxo) => oxxo.approved == true)
    }

    //Recuperar todos los oxxos con actualizacion pendiente
    static getAllPendingApproved = async () => {
        const oxxos = readJSON("./oxxos.json")
        return oxxos.filter((oxxo) => oxxo.approved == false)
    }

    //Recuperar un oxxo por su id
    static getById = async ({ id }) => {
        const oxxos = readJSON("./oxxos.json")
        const oxxo = oxxos.find((oxxo) => oxxo.id == id)
        return oxxo
    }

    //Crear un nuevo oxxo
    static async create({ input }) {
        const oxxos = readJSON("./oxxos.json")
        const newOxxo = {
            id: randomUUID(),
            ...input,
        }

        oxxos.push(newOxxo)
        fs.writeFileSync("oxxos.json", JSON.stringify(oxxos), 'utf-8');
        return newOxxo
    }

    //Eliminar un oxxo
    static async delete({ id }) {
        const oxxos = readJSON("./oxxos.json")
        const oxxoIndex = oxxos.findIndex((oxxo) => oxxo.id === id)
        if (oxxoIndex === -1) return false

        oxxos.splice(oxxoIndex, 1)
        fs.writeFileSync("oxxos.json", JSON.stringify(oxxos), 'utf-8');
        return true
    }

    //actualizar un oxxo
    static async update({ id, input }) {
        const oxxos = readJSON("./oxxos.json")
        const oxxoIndex = oxxos.findIndex((oxxo) => oxxo.id === id)
        if (oxxoIndex === -1) return false
        oxxos[oxxoIndex] = {
            ...oxxos[oxxoIndex],
            ...input,
        }
        fs.writeFileSync("oxxos.json", JSON.stringify(oxxos), 'utf-8');
        return oxxos[oxxoIndex]
    }

    //actualizar parcialmente un oxxo - aprobar subirlo a la plataforma
    static async partialUpdate({ id }) {
        const oxxos = readJSON("./oxxos.json")
        const oxxoIndex = oxxos.findIndex((oxxo) => oxxo.id === id)
        if (oxxoIndex === -1) return false
        oxxos[oxxoIndex] = {
            ...oxxos[oxxoIndex],
            approved: true
        }
        fs.writeFileSync("oxxos.json", JSON.stringify(oxxos), 'utf-8');
        return oxxos[oxxoIndex]
    }
}