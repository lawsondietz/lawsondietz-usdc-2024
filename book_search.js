/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    let lastContent = {}
    let edgeCaseContent = ""
    let lastLine = false

    // Loop through books
    for(let i = 0; i < scannedTextObj.length; i++) {
        
        const book = scannedTextObj[i]        

        // If content exists
        if(book.Content) {

            // Loop pages and lines
            for(let j = 0; j < book.Content.length; j++) {

                const content = book.Content[j]

                // If not first as it would not have an edgecase hyphen
                if(j != 0) {
                    var firstWord = content.Text.split(" ")

                    edgeCaseContent = lastContent.Text.replace("-", "") + firstWord[0]
                }

                // Special case where line includes search term and last line is hyphenated
                if(!lastLine && content.Text.includes(searchTerm) && edgeCaseContent.includes(searchTerm)) {
                    result.Results.push({
                        ISBN: book.ISBN,
                        Page: lastContent.Page,
                        Line: lastContent.Line
                    },
                    {
                        ISBN: book.ISBN,
                        Page: content.Page,
                        Line: content.Line
                    })
                    lastLine = true
                }
                // If line includes search, push results
                else if(content.Text.includes(searchTerm)) {
                    //console.log(content.Text)
                    //console.log(edgeCaseContent)
                    result.Results.push({
                        ISBN: book.ISBN,
                        Page: content.Page,
                        Line: content.Line
                    })
                    
                    // If found 
                    lastLine = true
                }
                // Statement for edge cases and not first line as it would not be checked in this iteration
                else if(!lastLine && edgeCaseContent.includes(searchTerm)) {
                    result.Results.push({
                        ISBN: book.ISBN,
                        Page: lastContent.Page,
                        Line: lastContent.Line
                    })
                }
                // Reset variable after 1 iteration
                else {

                    lastLine = false

                }

                // Find hyphenated words
                lastContent = content

            }

        }
        
    }

    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; darkness and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            },
            {
                "Page": 31,
                "Line": 11,
                "Text": "were, I asked myself how he had managed to see, and"
            }
        ] 
    },
    {
        "Title": "Thirty Thousand Leagues Under the Sea",
        "ISBN": "9780000528532",
        "Content": [
            {
                "Page": 32,
                "Line": 8,
                "Text": "The sea is everything. It covers seven tenths of the terr-"
            },
            {
                "Page": 32,
                "Line": 9,
                "Text": "estrial globe. Its breath is pure and healthy. It is an immense"
            },
            {
                "Page": 32,
                "Line": 10,
                "Text": "desert, where man is never lonely, for he feels life stirring"
            },
            {
                "Page": 32,
                "Line": 11,
                "Text": "on all sides. The sea is only the embodiment of a supernatural"
            }
        ] 
    }
]

const bookNoContent = [
    {
        "Title": "Nothing Exciting",
        "ISBN": "9780000528533",
        "Content": [] 
    }
]

const emptyBook = [ {} ]
    
/** Example output object */
const twentyLeaguesOutPos1 = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
                {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOutPos2 = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528532",
            "Page": 32,
            "Line": 8
        },
        {
            "ISBN": "9780000528532",
            "Page": 32,
            "Line": 11
        }
    ]
}

const twentyLeaguesOutPos3 = {
    "SearchTerm": "profound",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOutPos4 = {
    "SearchTerm": ";",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOutPos5 = {
    "SearchTerm": "-",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528532",
            "Page": 32,
            "Line": 8
        }
    ]
}

const twentyLeaguesOutNeg1 = {
    "SearchTerm": "?",
    "Results": []
}

const twentyLeaguesOutNeg2 = {
    "SearchTerm": "dolphin",
    "Results": []
}

const emptyBookNeg3 = {
    "SearchTerm": "dolphin",
    "Results": []
}

const noContentNeg4 = {
    "SearchTerm": "dolphin",
    "Results": []
}

const twentyLeaguesOutCase1 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528532",
            "Page": 32,
            "Line": 8
        },
        {
            "ISBN": "9780000528532",
            "Page": 32,
            "Line": 11
        }
    ]
}

const twentyLeaguesOutCase2 = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */

// Positive
const test1result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutPos1) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOutPos1);
    console.log("Received:", test1result);
}

const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutPos2) === JSON.stringify(test2result)) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOutPos2);
    console.log("Received:", test2result);
}

const test3result = findSearchTermInBooks("profound", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutPos3) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOutPos3);
    console.log("Received:", test2result);
}

const test4result = findSearchTermInBooks(";", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutPos4) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOutPos4);
    console.log("Received:", test4result);
}

const test5result = findSearchTermInBooks("-", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutPos5) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOutPos5);
    console.log("Received:", test5result);
}

// Negative

const test6result = findSearchTermInBooks("?", twentyLeaguesIn); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", twentyLeaguesOutNeg1.Results.length);
    console.log("Received:", test6result.Results.length);
}

const test7result = findSearchTermInBooks("dolphin", twentyLeaguesIn); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", twentyLeaguesOutNeg2.Results.length);
    console.log("Received:", test7result.Results.length);
}

const test8result = findSearchTermInBooks("dolphin", emptyBook); 
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", emptyBookNeg3.Results.length);
    console.log("Received:", test8result.Results.length);
}

const test9result = findSearchTermInBooks("dolphin", bookNoContent); 
if (test9result.Results.length == 0) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", noContentNeg4.Results.length);
    console.log("Received:", test9result.Results.length);
}

// Case-sensitive

const test10result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutCase1) === JSON.stringify(test10result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", twentyLeaguesOutCase1);
    console.log("Received:", test10result);
}

const test11result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutCase2) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", twentyLeaguesOutCase2);
    console.log("Received:", test11result);
}

