import { allPass, compose, equals, prop, values, filter, gt, not, anyPass } from 'ramda';

/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const getStar = prop('star');
const getSquare = prop('square');
const getCircle = prop('circle');
const getTriangle = prop('triangle');
const getLength = prop('length');

const isRed = equals('red');
const isGreen = equals('green');
const isBlue = equals('blue');
const isOrange = equals('orange');
const isWhite = equals('white');

const isGreaterThenOne = number => gt(number, 1);
const isGreateThanTwo = number => gt(number, 2);
const countGreen = compose(getLength, filter(isGreen), values);
const countRed = compose(getLength, filter(isRed), values);
const countBlue = compose(getLength, filter(isBlue), values);
const countOrange = compose(getLength, filter(isOrange), values);

const countBlueIsEqualCountRed = (figures) => equals(countBlue(figures), countRed(figures));

const minThreeGreen = compose(isGreateThanTwo, countGreen);
const minThreeRed= compose(isGreateThanTwo, countRed);
const minThreeBlue = compose(isGreateThanTwo, countBlue);
const minThreeOrange = compose(isGreateThanTwo, countOrange);
const minTreeSameColor = anyPass([minThreeGreen, minThreeRed, minThreeBlue, minThreeOrange])

const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);
const isWhiteCircle = compose(isWhite, getCircle);
const isWhiteTriangle = compose(isWhite, getTriangle);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteCircle, isWhiteTriangle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isGreaterThenOne, countGreen);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = countBlueIsEqualCountRed;

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = minTreeSameColor;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = {};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
