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

    // Hide uppercase on page load
    $(`#keyboard-upper-container`).hide();

    // .on(`keydown`, (event)) handler method on document
    $(document).on(`keydown`, (event) => { 
        // Show uppercase, hide lowercase
        if(event.which === 16 || event.which === 20) { 
            $(`#keyboard-upper-container, #keyboard-lower-container`).toggle(); 
        }
    })
    // .on(`keyup`, (event)) handler method on document
    .on(`keyup`, (event) => { 
        // Show lowercase, hide uppercase
        if(event.which === 16 || event.which === 20) { 
            $(`#keyboard-lower-container, #keyboard-upper-container`).toggle(); 
        }
        // Remove background-color: rgba(255, 201, 4, 0.550); via .highlight
        $(`.highlight`).removeClass(`highlight`);
    })

    // .on(`keypress`, (event)) handler method on document
    $(document).on(`keypress`, (event) => { 
        let keyCode = event.keyCode || event.which;
        // Add background-color: rgba(255, 201, 4, 0.550); via .highlight
        $(`#${keyCode}`).addClass(`highlight`);
    })
})