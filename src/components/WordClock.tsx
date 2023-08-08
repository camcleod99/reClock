import '../css/WordClock.css'
import React from "react";

interface WCProps{
    time?: Date
}

const WorldClock: React.FC<WCProps> = (props) => {

    // Array of letters
    // Each 12 Letters is a row
    // For Space Reasons, we could just do this as long lines but this helps quickly reference the letters
    const letters: string[] = [
        'I', 'T', 'T', 'I', 'S', 'I', 'T', 'W', 'E', 'N', 'T', 'Y',
        'Q', 'U', 'A', 'R', 'T', 'E', 'R', 'H', 'A', 'L', 'F', 'M',
        'T', 'E', 'N', 'F', 'I', 'V', 'E', 'E', 'P', 'A', 'S', 'T',
        'T', 'O', 'A', 'T', 'W', 'E', 'L', 'V', 'E', 'O', 'N', 'E',
        'T', 'W', 'O', 'T', 'H', 'R', 'E', 'E', 'F', 'O', 'U', 'R',
        'F', 'I', 'V', 'E', 'S', 'I', 'X', 'S', 'E', 'V', 'E', 'N',
        'E', 'I', 'G', 'H', 'T', 'N', 'I', 'N', 'E', 'T', 'E', 'N',
        'N', 'D', 'D', 'E', 'L', 'E', 'V', 'E', 'N', 'A', 'T', 'E',
        'T', 'O', "'", 'C', 'L', 'O', 'C', 'K', 'I', 'M', 'E', 'A'
    ]

    // Create an array of objects for each potential word. This will be used for quick reference
    interface listObject {
        [key: string]: number[];
    }

    // Create an array of objects using the wordObject interface. Each object is a key value pair of the word and the index of the letters. The first object has the key of 'IT' and it's index array is [0, 1]
    const wordList: listObject[] = {
        'IT_IS': [0, 1, 3, 4],
        'TWENTY': [6, 7, 8, 9, 10, 11],
        'QUARTER': [12, 13, 14, 15, 16, 17, 18],
        'HALF': [19, 20, 21, 22],
        'TEN':[24, 25, 26],
        'FIVE': [27, 28, 29, 30],
        'PAST': [32, 33, 34, 35],
        'TO': [36, 37],
        'O_CLOCK': [97, 98, 99, 100, 101, 102, 103]
    }

    const numberList: listObject[] = {
        'ONE': [45, 46, 47],
        'TWO': [48, 49, 50],
        'THREE': [51, 52, 53, 54, 55],
        'FOUR': [56, 57, 58, 59],
        'FIVE': [60, 61, 62, 63],
        'SIX': [64, 65, 66],
        'SEVEN': [67, 68, 69, 70, 71],
        'EIGHT': [72, 73, 74, 75, 76],
        'NINE': [77, 78, 79, 80],
        'TEN': [81, 82, 83],
        'ELEVEN': [87, 88, 89, 90, 91, 92],
        'TWELVE': [39, 40, 41, 42, 43, 44],
    }

    interface clockLetterObject {
        index: number,
        letter: string,
        active: string,
    }

    let clockGrid: clockLetterObject[] = []

    function resetClockGrid(){
        clockGrid = []
        for (let i = 0; i < letters.length; i++) {
           clockGrid.push({
                index: i,
                letter: letters[i],
                active: "inactive"
            })
        }
    }


    // Initialise the clockGrid
    resetClockGrid()

    // Get the time
    const time: Date = props.time ? props.time : new Date()

    // Get The Words
    function getWords() : number[] {
        let words: number[] = []

        //"It is" is always the first two words
        words = words.concat(wordList.IT_IS)

        // Get the hour and minute
        const minute: number = time.getMinutes()
        let hour: number = time.getHours()


        // Determine the words to add
        if (minute < 5) {
            words = words.concat(wordList.O_CLOCK)
        }
        if (minute >= 5 && minute <= 9) {
            words = words.concat(wordList.FIVE)
            words = words.concat(wordList.PAST)
        }
        if (minute >= 10 && minute <= 14) {
           words = words.concat(wordList.TEN)
           words = words.concat(wordList.PAST)
        }
        if (minute >= 15 && minute <= 19) {
            words = words.concat(wordList.QUARTER)
            words = words.concat(wordList.PAST)
        }
        if (minute <= 20 && minute >= 29) {
            words = words.concat(wordList.TWENTY)
            words = words.concat(wordList.PAST)
        }
        if (minute >= 30 && minute <= 39) {
            words = words.concat(wordList.HALF)
            words = words.concat(wordList.PAST)
        }

        // From here add 1 to the hour
        if (minute >= 40 && minute <= 44) {
            hour ++
            words = words.concat(wordList.TWENTY)
            words = words.concat(wordList.TO)
        }
        if (minute >= 45 && minute <= 49) {
            hour ++
            words = words.concat(wordList.QUARTER)
            words = words.concat(wordList.TO)
        }
        if (minute >= 50 && minute <= 54) {
            hour ++
            words = words.concat(wordList.TEN)
            words = words.concat(wordList.TO)
        }
        if (minute >= 55 && minute <= 59) {
            hour ++
            words = words.concat(wordList.FIVE)
            words = words.concat(wordList.TO)
        }

        // Account for 12 Hour Clock
        if (hour > 12) {
            hour = hour - 12
        }

        // Get the hour (Case this)
        switch (hour) {
            case 1:
                words = words.concat(numberList.ONE)
                break;
            case 2:
                words = words.concat(numberList.TWO)
                break;
            case 3:
                words = words.concat(numberList.THREE)
                break;
            case 4:
                words = words.concat(numberList.FOUR)
                break;
            case 5:
                words = words.concat(numberList.FIVE)
                break;
            case 6:
                words = words.concat(numberList.SIX)
                break;
            case 7:
                words = words.concat(numberList.SEVEN)
                break;
            case 8:
                words = words.concat(numberList.EIGHT)
                break;
            case 9:
                words = words.concat(numberList.NINE)
                break;
            case 10:
                words = words.concat(numberList.TEN)
                break;
            case 11:
                words = words.concat(numberList.ELEVEN)
                break;
            case 12:
                words = words.concat(numberList.TWELVE)
                break;
            default:
                break;
        }
        return words
    }

    const letterIndex: number[] = getWords()

    for (let i = 0; i < letterIndex.length; i++){
        clockGrid[letterIndex[i]].active="active"
    }


    return (
        <>
            <div id="wordClock">
            {clockGrid.map(({ index, letter, active }) => (
                <span key={index} className={index+" "+active}> {letter} </span>
            ))}
            </div>
        </>
    )
}

export default WorldClock