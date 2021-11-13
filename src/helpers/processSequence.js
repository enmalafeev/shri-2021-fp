/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { allPass, prop, length, gt, lt, match, compose, modulo, ifElse, andThen, otherwise, tap } from 'ramda';
import { round } from 'lodash';

const api = new Api();

const getValue = prop('value');
const getWriteLog = prop('writeLog');
const getHandleSuccess = prop('handleSuccess');
const getHandleError = prop('handleError');
const getResult = prop('result');

const isGreaterThanTwo = gt(2);
const isLessThanTen = lt(10);
const isPositive = gt(0);
const isFloatNumber = match(/^[0-9]*\.?[0-9]*$/);
const squareNumber = number => Math.pow(number, 2);
const moduloTree = number => modulo(number, 3);

const isValidLength = compose(allPass([isGreaterThanTwo, isLessThanTen]), length);
const isValidInput = compose(allPass([isValidLength, isPositive, isFloatNumber]), getValue);

const parseInput = compose(round, parseFloat, getValue);
const getNumberFromApi = api.get('https://api.tech/numbers/base');
const convertNumberToBinary = (value) => getNumberFromApi({from: 10, to: 2, number: value});
const getAnimalById = (id) => api.get(`https://animals.tech/${id}`)({});

const logError = (data) => getHandleError(data)('ValidationError');

const processSequence = (input) => {
    const writeLog = getWriteLog(input);
    const handleSuccess = getHandleSuccess(input);
    const logValue = compose(writeLog, getValue);

    const result = compose(
        ifElse(
            isValidInput, 
            compose(
                otherwise(logError),
                andThen(handleSuccess),
                andThen(getResult),
                andThen(getAnimalById),
                andThen(tap(writeLog)),
                andThen(moduloTree),
                andThen(tap(writeLog)),
                andThen(squareNumber),
                andThen(tap(writeLog)),
                andThen(length),
                andThen(tap(writeLog)),
                andThen(getResult),
                convertNumberToBinary,
                tap(writeLog),
                parseInput,
            ),
            tap(logError)
        ),
        tap(logValue),
    )
    result(input);
}

export default processSequence;
