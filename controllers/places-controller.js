const { v4: uuidv4 } = require("uuid")
const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")
const Place = require("../models/place")
const place = require("../models/place")

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
]

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid
  let place

  try {
    place = await Place.findById(placeId)
  } catch (e) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500,
    )
    return next(error)
  }

  if (!place) {
    const error = HttpError("Could not find a place for the provided id.", 404)
    return next(error)
  }

  res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid
  let place

  try {
    place = await Place.find({ creator: userId })
  } catch (e) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500,
    )
    return next(error)
  }

  if (!places || places.length === 0) {
    return next(
      HttpError("Could not find a place for the provided user id.", 404),
    )
  }

  res.json({ places: place.map((place) => place.toObject({ getters: true })) })
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError("Invalid inputs passed, please check your data.", 422)
  }

  const { title, description, coordinations, address, creator } = req.body
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinations,
    image: "",
    creator,
  })

  try {
    await createdPlace.save()
  } catch (e) {
    const error = new HttpError("Creating place failed, please try again", 500)
    return next(error)
  }

  res.status(201).json({ place: createdPlace })
}

const updatePlace = async (req, res, next) => {
  const { title, description } = req.body
  const placeId = req.params.pid
  let place

  try {
    place = await Place.findById(placeId)
  } catch (e) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500,
    )
    return next(error)
  }

  place.title = title
  place.description = description

  try {
    await place.save()
  } catch (e) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500,
    )
    return next(error)
  }

  res.status(200).json({ place: place.toObject({ getters: true }) })
}
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid
  let place

  try {
    place = await Place.findById(placeId)
  } catch (e) {
    "Something went wrong could not delete place.", 500
    return next(e)
  }

  res.status(200).json({ message: "Deleted place success." })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace
