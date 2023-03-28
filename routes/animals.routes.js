const { response } = require("express")
const express = require("express")
const router = express.Router()
const Animal = require("../models/animals.model")
const auth = require("../middlewares/auth.middleware")

router.get("/animals", async function(req, res, next) {
    try {
        let result = await Animal.find()
        return res.status("200").json(result)
    } catch (err) {
        return next(err)
    }
})

router.get("/animals/:id", async function(req, res, next) {
    try {
        let result = await Animal.findById(req.params.id)
        return res.status(200).json(result)
    } catch (err) {
        return next(err)
    }
})

// add an animal
router.post("/animals", auth, async function(req, res, next) {
    try {
        let updatedAnimal = await Animal.create(req.body)
        return res.status(201).json(updatedAnimal)
    } catch (err) {
        return next(err)
    }
})

// update an anmial by id
router.patch("/animals/:id", auth, async function(req, res, next) {
    try {
       let animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json(animal)
    } catch (err) {
        return next(err)
    }
})

// delete an anmial by id
router.delete("/animals/:id", auth, async function(req, res, next) {
    try {
        await Animal.findByIdAndDelete(req.params.id)

        return res.status(204).end()
    } catch (err) {
        return next(err)
    }
})



module.exports = router