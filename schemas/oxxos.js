import z from "zod"

const oxxoSchema = z.object({
    name: z.string({
        invalid_type_error: "El nombre del Oxxo debe ser una cadena de texto.",
        required_error: "El nombre del Oxxo es requerido"
    }),
    direction: z.string({
        invalid_type_error: "La dirección del Oxxo debe ser una cadena de texto.",
        required_error: "La dirección del Oxxo es requerido."
    }),
    city: z.string({
        invalid_type_error: "La ciduad del Oxxo debe ser una cadena de texto.",
    }),
    rate: z.number().min(0).max(10).default(5),
    pendingUpdate: z.boolean(),
    approved: z.boolean(),
    oppened: z.boolean()
})

export function validateOxxo(input) {
    return oxxoSchema.safeParse(input)
}

export function validatePartialOxxo(input) {
    return oxxoSchema.partial().safeParse(input)
}