import {allPass, compose, equals, prop, propEq} from 'ramda';

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

const isRedStar = propEq('star', 'red');
const isGreenSquare = propEq('square', 'green');
const isWhiteCircle = propEq('circle', 'white');
const isWhiteTriangle = propEq('triangle', 'white');

const getStar = prop('star');
const getSquare = prop('square');
const getCircle = prop('circle');
const getTriangle = prop('triangle');

const isRed = color => equals(color, 'red');
const isGreen = color => equals(color, 'green');
const isBlue = color => equals(color, 'blue');
const isOrange = color => equals(color, 'orange');
const isWhite = color => equals(color, 'white');

const isGreenStar = compose(isGreen, getStar);
const isGreenCircle = compose(isGreen, getCircle);
const isGreenTriangle = compose(isGreen, getTriangle);

const isRedStarAndGreenSquareOtherWhite = allPass([isRedStar, isGreenSquare, isWhiteCircle, isWhiteTriangle]);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (obj) => isRedStarAndGreenSquareOtherWhite(obj);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (obj) => allGreen(obj);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
const allGreen = allPass([isGreenStar, isGreenCircle, isGreenTriangle, isGreenSquare]);
export const validateFieldN9 = (obj) => allGreen(obj);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
