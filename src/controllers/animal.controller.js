const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { animalService } = require('../services');

const createAnimal = catchAsync(async (req, res) => {
  const animal = await animalService.createAnimal(req.body);
  res.status(httpStatus.CREATED).send(animal);
});

const getAnimals = catchAsync(async (req, res) => {
  const trim = pick(req.query, ['trim']);
  const lang = pick(req.query, ['lang']);
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await animalService.queryAnimals(filter, options, trim.trim, lang.lang);
  res.send(result);
});

const getAnimalById = catchAsync(async (req, res) => {
  const category = await animalService.getAnimalById(req.params.animalId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Animal not found');
  }
  res.send(category);
});

module.exports = {
  createAnimal,
  getAnimals,
  getAnimalById,
};
