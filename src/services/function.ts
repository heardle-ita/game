
import { STRING_COMPARE_LOCALE } from '../components/utils/constants';
import { SongOption } from '../types/interfaces/options';
import { SongConfig } from '../types/interfaces/song';

const merge = (a: SongOption[], b: SongOption[], predicate = (a: SongOption, b: SongOption) => a.value === b.value) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(cItem, bItem)) ? null : c.push(bItem)))
    return c;
}

const checkStrings = (expected: string, userAnswer: string) => {
    const similarityScore = similarity(expected, userAnswer);

    let expectedTemp = (expected || "").toLowerCase().replace(/[0-9]/g, '').replace(/\s/g, '');
    let userAnswerTemp = (userAnswer || "").toLowerCase().replace(/[0-9]/g, '').replace(/\s/g, '');


    if (expected === userAnswer || expectedTemp === userAnswerTemp) {
        return true;
    }

    let expectedLocaleTemp = (expected || "").toLocaleLowerCase(STRING_COMPARE_LOCALE).replace(/[0-9]/g, '').replace(/\s/g, '');
    let userAnswerLocaleTemp = (userAnswer || "").toLocaleLowerCase(STRING_COMPARE_LOCALE).replace(/[0-9]/g, '').replace(/\s/g, '');

    return expectedLocaleTemp === userAnswerLocaleTemp;
}

const checkAnswer = (songConfig: SongConfig, userAnswer: string) => {

    let isOk = checkStrings(songConfig.trackName, userAnswer);

    if (isOk === false && songConfig.others && songConfig.others.length) {
        console.debug("checking alternatives userAnswer=", userAnswer)
        for (let index = 0; index < songConfig.others.length; index++) {
            isOk = checkStrings(songConfig.others[index], userAnswer);
            if (isOk) {
                break;
            }
        }
    }

    return isOk;
}



function getDayQueryParam() {
    const params = new URLSearchParams(window.location.search)
    const dayParam = params.get('day');

    if (dayParam && dayParam.length == 8 && !isNaN(Number(dayParam))) {
        return dayParam;
    }
    return null;
}

function getDayParts() {
    const now = new Date();

    const dayParam = getDayQueryParam();
    if (dayParam) {
        console.debug("dayParam found=", dayParam);
        return {
            'day': dayParam.slice(6),
            'month': dayParam.slice(4, 6),
            'year': dayParam.slice(0, 4),
        };;
    }

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    return {
        'day': day < 10 ? ("0" + day) : day,
        'month': month < 10 ? ("0" + month) : month,
        'year': year
    };
}

function getDayStrAsPath() {
    const { year, month, day } = getDayParts();
    return  `${year}/${month}/${day}`;
}

function getDayFormattedText() {
    const { year, month, day } = getDayParts();
    return `${day}/${month}/${year}`;
}

function getDayStr() {
    const { year, month, day } = getDayParts();

    let newFormat = `${year}${month}${day}`;
    return newFormat;
}

function similarity(s1: string, s2: string) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength + "");
}

function editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i === 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

 
const buildScore = (guessList: any[]): number => {
    let max = 100;
    let points = [82, 68, 54, 36, 12];
    let i;
    
    // punti persi: 12, 10, 8, 6, 4
    for (i = 0; i < guessList.length; i++) {
        if(guessList[i].isCorrect === true)
            break; 
        if (guessList[i].isSkipped || guessList[i].isCorrect === false) {
            max = points[i];
        }
    }

    if(i == 6)
        return 0;

    return max;
}

export { merge, checkAnswer, getDayStr, getDayStrAsPath, getDayFormattedText, similarity, buildScore }