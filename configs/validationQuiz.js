const Joi = require('@hapi/joi')

const quizValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string()
            .required()
            .min(3),
        bacaan: Joi.string()
            .required()
            .min(3),
        soal:{
            question:Joi.string()
                .required()
                .min(3),
            answer:Joi.array()
                .required()
                .min(4),
            correctAnswer:Joi.required()
        }
    })

    return schema.validate(data)
}


module.exports = {
    quizValidation:quizValidation
}