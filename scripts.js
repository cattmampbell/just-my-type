$(document).ready(() => {
    // Define/assign variables:
    const sentences = [
        `ten ate neite ate nee enet ite ate inet ent eate`, // sentences[0]
        `Too ato too nOt enot one totA not anot tOO aNot`, // sentences[1]
        `oat itain oat tain nate eate tea anne inant nean`, // sentences[2]
        `itant eate anot eat nato inate eat anot tain eat`, // sentences[3]
        `nee ene ate ite tent tiet ent ine ene ete ene ate` // sentences[4]
    ];
    let sentenceIndex = 0;
    let letterIndex = 0;
   
    let keyCount = 0;
    let wordCount = 0;
    let mistakeCount = 0;

    let timeStart = 0;
    let timeEnd = 0;

    let currentSentence = sentences[0]; // First sentence 
    let currentLetter = currentSentence[0]; // First letter of first sentence

    $('#target-letter').text(currentLetter); // Place currentLetter into #target-letter
    $('#sentence').append(sentences[sentenceIndex]); // Append sentences[sentenceIndex] into #sentences

    $(`#keyboard-upper-container`).hide(); // Hide uppercase on page load

    $(document).on(`keydown`, (event) => { 
        if(event.which === 16 || event.which === 20) { 
            $(`#keyboard-upper-container, #keyboard-lower-container`).toggle(); // Show uppercase, hide lowercase
        }
    })
    .on(`keyup`, (event) => { 
        if(event.which === 16 || event.which === 20) { 
            $(`#keyboard-lower-container, #keyboard-upper-container`).toggle(); // Show lowercase, hide uppercase
        }
        $(`.highlight`).removeClass(`highlight`); // Remove background-color: rgba(255, 201, 4, 0.550); via .highlight
    })

    $(document).on(`keypress`, (event) => { 
        let keyCode = event.which;
        $(`#${keyCode}`).addClass(`highlight`); // Add background-color: rgba(255, 201, 4, 0.550); to keyCode via .highlight

        if(keyCount < 1) {
            timeStart = event.timeStamp; // Gets timeStamp for timeStart
            keyCount++; // Add 1 to keyCount
        }

        let currentSentence = sentences[sentenceIndex]; 
        let currentLetter = currentSentence[letterIndex];

        letterIndex++; // Add 1 to letterIndex
        let nextLetter = currentSentence[letterIndex]; // Stage nextLetter in currentSentence[letterIndex]

        $(`#target-letter`).text(nextLetter); // Place nextLetter in #target-letter
        $(`#yellow-block`).animate({ left: `+=17.5px` }, { duration: 100, easing: `linear` }); // .animate() #yellow-block left: 17.5 pixels

        if(sentenceIndex < sentences.length) { // if(not last sentence of sentences[])
            if(letterIndex < currentSentence.length) { // if(not last letter of currentSentence)
                if(keyCode === currentLetter.charCodeAt()) { // if(keyCode is correct)
                    $(`#feedback`).append(`<span class='glyphicon glyphicon-ok'></span>`); // Append .glyphicon-ok to #feedback
                } else { 
                    $(`#feedback`).append(`<span class='glyphicon glyphicon-remove'></span>`); // Append .glyphicon-remove to #feedback
                    mistakeCount++; // Adds 1 to mistakeCount
                }
            } else if(sentenceIndex < sentences.length - 1) { // else if(not last sentence of sentences[])
                $(`#feedback`).empty();
                sentenceIndex++; // Adds 1 to sentenceIndex

                $(`#sentence`).text(sentences[sentenceIndex]); // Place #sentence .text() on sentences[sentenceIndex]
                $(`#target-letter`).text(sentences[sentenceIndex].charAt(0)); // Place #target-letter .text() on .charAt(0) in sentences[sentenceIndex]
                letterIndex = 0; // Resets letterIndex to 0

                $(`#yellow-block`).animate({ left: `20px`}, { duration: 100, easing: `linear` }); // .animate() #yellow-block left: 15 pixels
            } else if(sentenceIndex < sentences.length) { // else if(last sentence of sentences[])
                timeEnd = event.timeStamp; // Gets timeStamp for timeEnd
                let difference = timeEnd - timeStart;
                let seconds = Math.floor(difference / 1000);
                let minutes = Math.floor(seconds / 60);
                let wordsPerMinute = Math.floor(wordCount / minutes - 2 * mistakeCount);

                $(`#sentence, #target-letter, #feedback`).empty(); // Empty #sentence, #target-letter, #feedback <div> tags
                $(`#yellow-block`).hide(); // Hide #yellow-block

                $(`#sentence`).append(`Congratulations, you completed the challenge in ${seconds} seconds! You typed ${wordsPerMinute} words per minute!`);
            } 
        } 
    })

})