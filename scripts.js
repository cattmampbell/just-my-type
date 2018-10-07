// .ready() event handler method on document
$(document).ready(() => {
    // Define/assign variables:
    const sentences = [
        `ten ate neite ate nee enet ite ate inet ent eate`, 
        `Too ato too nOt enot one totA not anot tOO aNot`, 
        `oat itain oat tain nate eate tea anne inant nean`, 
        `itant eate anot eat nato inate eat anot tain eat`, 
        `nee ene ate ite tent tiet ent ine ene ete ene ate`
    ];
    let sentenceIndex = 0;
    let letterIndex = 0;
   
    let keyCount = 0;
    let wordCount = 0;
    let mistakeCount = 0;

    let timeStart = 0;
    let timeEnd = 0;

    let currentSentence = sentences[0];
    let currentLetter = currentSentence[0];
    $('#target-letter').text(currentLetter); // Places currentLetter into #target-letter
    $('#sentence').append(sentences[sentenceIndex]); // Appends sentences[sentenceIndex] into #sentences

    // Hide uppercase on page load
    $(`#keyboard-upper-container`).hide();

    $(document).on(`keydown`, (event) => { 
        // Show uppercase, hide lowercase
        if(event.which === 16 || event.which === 20) { 
            $(`#keyboard-upper-container, #keyboard-lower-container`).toggle(); 
        }
    })
    .on(`keyup`, (event) => { 
        // Show lowercase, hide uppercase
        if(event.which === 16 || event.which === 20) { 
            $(`#keyboard-lower-container, #keyboard-upper-container`).toggle(); 
        }
        // Remove background-color: rgba(255, 201, 4, 0.550); via .highlight
        $(`.highlight`).removeClass(`highlight`);
    })

    $(document).on(`keypress`, (event) => { 
        let keyPress = event.which;
        // Add background-color: rgba(255, 201, 4, 0.550); via .highlight
        $(`#${keyPress}`).addClass(`highlight`);

        if(keyCount < 1) {
            // Add 1 to keyCount, each time .on(`keypress`, (event)) handler method runs 
            keyCount++; 
        }

        let currentSentence = sentences[sentenceIndex]; 
        let currentLetter = currentSentence[letterIndex];

        // Add 1 to letterIndex, each time .on(`keypress`, (event)) handler method runs
        letterIndex++; 
        let nextLetter = currentSentence[letterIndex];

        // Place nextLetter into into #target-letter, each time .on(`keypress`, (event)) handler method runs
        $('#target-letter').text(nextLetter); 

        // Move #yellow-block 17.5 pixels via .animate(), each time .on(`keypress`, (event)) handler method runs
        // $('#yellow-block').animate({left: '+=17.5px'}, {duration: 1}, {easing: 'linear'});
    })

})