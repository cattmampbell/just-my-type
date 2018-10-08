$(document).ready(() => {
    // Define/assign variables:
    const sentences = [
        `ten ate neite ate nee enet ite ate inet ent eate`, // sentences[0], 11 words, 48 characters
        `Too ato too nOt enot one totA not anot tOO aNot`, // sentences[1], 11 words, 47 characters
        `oat itain oat tain nate eate tea anne inant nean`, // sentences[2], 10 words, 48 characters
        `itant eate anot eat nato inate eat anot tain eat`, // sentences[3], 10 words, 48 characters
        `nee ene ate ite tent tiet ent ine ene ete ene ate` // sentences[4], 12 words, 49 characters
        // sentences[], 54 words total, 240 characters total
    ];
    let sentenceIndex = 0;
    let letterIndex = 0;
    let keyCount = 0;
    let wordCount = 54;
    let mistakeCount = 0;
    let keyTimer = 0;
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
        keyCount++; // Adds 1 to keyCount
        
        let keyCode = event.which;
        $(`#${keyCode}`).addClass(`highlight`); // Add background-color: rgba(255, 201, 4, 0.550); to keyCode via .highlight

        if(keyTimer < 1) {
            timeStart = event.timeStamp; // Gets timeStamp for timeStart
            keyTimer++; // Add 1 to keyTimer
        }

        let currentSentence = sentences[sentenceIndex]; 
        let currentLetter = currentSentence[letterIndex];

        letterIndex++; // Add 1 to letterIndex
        let nextLetter = currentSentence[letterIndex]; // Stage nextLetter in currentSentence[letterIndex]

        $(`#target-letter`).text(nextLetter); // Place nextLetter in #target-letter
        $(`#yellow-block`).animate({ left: `+=20px` }, { duration: 100, easing: `linear` }); // .animate() #yellow-block left: 17.5 pixels

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

                $(`#yellow-block`).animate({ left: `15px`}, { duration: 100, easing: `linear` }); // .animate() #yellow-block left: 15 pixels
            } else if(sentenceIndex < sentences.length) { // else if(last sentence of sentences[])
                timeEnd = event.timeStamp; // Gets timeStamp for timeEnd
                let difference = timeEnd - timeStart;
                let seconds = difference / 1000;
                let minutes = (difference / 1000) / 60;

                // Equations from: http://indiatyping.com/index.php/typing-tips/typing-speed-calculation-formula
                // Gross WPM: (All typed entries / 5) / Total time taken (in minutes)   
                let grossWordsPerMinute = (keyCount / 5) / minutes;
                // Net Speed: ((All typed entires / 5) - Uncorrected errors) / Total time taken (in minutes)
                let netSpeed = ((keyCount / 5) - mistakeCount) / minutes;
                // Accuracy: (Net speed/Gross WPM) * 100 
                let accuracy = (netSpeed / grossWordsPerMinute) * 100;

                $(`#sentence, #target-letter, #feedback`).empty(); // Empty #sentence, #target-letter, #feedback <div> tags
                $(`#yellow-block, #keyboard-upper-container, #keyboard-lower-container, #space-key-container`).hide(); // Hide #yellow-block, #keyboard-upper-container, #keyboard-lower-container and #space-key-container

                let scores = `
                    <strong>Word Count:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${wordCount}</span><br>
                    <strong>Typed Entries:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${keyCount}</span><br>
                    <strong>Uncorrected Errors:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${mistakeCount}</span><br>
                    <strong>Seconds:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${seconds.toFixed(2)}</span><br>
                    <strong>Minutes:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${minutes.toFixed(2)}</span><br>
                    <strong>Gross WPM:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${grossWordsPerMinute.toFixed(2)}</span><br>
                    <strong>Net Speed:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${netSpeed.toFixed(2)}</span><br>
                    <strong>Accuracy:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${accuracy.toFixed(2)}%</span>
                `;

                $(`#sentence`)
                    .addClass(`text-center mt-4`)
                    .append(scores) // Append scores to #sentence
                    .hide()
                    .delay(250)
                    .fadeIn(250);

                $(`#sentence`)
                    .append(`<div class="h3" id="question"><strong>Try again?</strong></div>`)
                    .append(`<button class="col-12 btn btn-lg btn-dark py-4 px-2 my-4 mx-4" id="yesBtn">Yes</button>`)
                    .append(`<button class="col-12 btn btn-lg btn-dark py-4 px-2 my-4 mx-4" id="noBtn">No</button>`)
                    .hide()
                    .delay(750)
                    .fadeIn(250);

                $(`#yesBtn`).on('click', () => {
                    location.reload(); // Reloads page .on('click')
                })

                $(`#noBtn`).on('click', () => {
                    $(`#noBtn, #yesBtn, #question`)
                        .hide()
                        .delay(750)
                        .fadeOut(250)
                        .remove(); 
                })
            } 


        } 
    })

})