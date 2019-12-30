function genIoContainer(car, book){
    let index = [[2, 5], [8], [4, 2, 4], [8], [2]];
    count = 0;

    $('.io-box.car'+car).append($('<div>',{
        'class': 'io-container car'+car
    })
        .each(function(){
            $(document).ready(function(){
                for (let i=0; i<5;i++){
                    count = genIoColumn(car, book, index[i], count);
                }
                if(count == 35){
                    count = 0;
                }
            })
        })
    )
}

function genIoColumn(car, book, index, count){
    let label;
    $('.io-container.car'+car).append($('<div>').addClass('io-column car'+car).each(function(){
        for(let i = 0; i<index.length; i++){
            // console.log('index.length: ' + index.length)
            $(this).append($('<div>').addClass('io-group').each(function(){
                for (let j=0; j<index[i]; j++){
                    label = genIoLabel(book);
                    $(this).append(label);
                    count++;
                    console.log(count);
                }        
            }));
        }
    })
    )
    return count;
} 

function genIoLabel(book){
    let label = $('<div>').addClass('io-label')
        // .append($('<div>').addClass('io-stat'));
    return label;
}

/*
function genCarDetails(car, io){
    let switches = Object.entries(io.switches);
    let relay = Object.entries(io);
    let mainIo = Object.entries(io.mainIo);

    $('#card'+car).append($('<div></div>')              //this div allows for collapse functionality
        .attr({
            'class': 'collapse',
            'id': 'car'+car+'Info',
            'data-parent': '.accordion.car'+car,
        })
        .append($('<div></div>').addClass('card-body-car')                  //literally here just so the collapse animation is smooth
            .append($('<div></div').addClass('io-box car'+car)        
                .append($('<div></div>').addClass('io-switch-relay car'+car)
                    .append($('<div></div>').addClass('io-switches')    
                        .each(function(){
                            for (let i = 0; i<3; i++){
                                let div = genTopSwitch(switches[i], i+2);
                                $(this).append(div);
                            }
                        })
                    )
                    .each(function(){
                        let div = genRelay(relay[1]);
                        $(this).append(div);
                    })
                )    
                .each(function(){
                    $(document).ready(function(){
                        genIoContainer(car, mainIo);
                    })
                })
            )
        )
    );
    $('.STOP').each(function(){
        $(this).css('background-color', '#c94444');
    });
}

function genTopSwitch(chapter, qty){                            //chapter = section of dictionary of names; type = switch or relay
    let div = $('<div></div>').addClass('io-switch-group')
        .each(function(){
            let toggle;
            for (let i=0; i<qty; i++){
                book = chapter[1];
                if (chapter[0]=="Inspection" && i>0){
                    toggle = genInspBtn(book, i);               //GOTO: buttons.js
                }
                else{
                    toggle = genSwitch(book, i);                //GOTO: buttons.js
                }
                $(this).append(toggle);
            }
        });
    return div;
}

function genRelay(chapter){
    let arr = [3, 2, 4];
    let count = 0;
    let div = $('<div></div>').addClass('io-relays')
        .each(function(){
            for(let i=0; i<3; i++){
                let qty = arr[i];
                $(this).append(
                    $('<div></div>').addClass('io-relay-group')
                    .each(function(){
                        for(let j=0; j<qty; j++){
                            let btn = genInspBtn(chapter[1], count);
                            $(this).append(btn);
                            count++;
                        }
                    })
                ) 
            }
        })
    return div;
}

function genIoContainer(car, book){
    let indexL = [2, 5, 8, 4, 2];
    let indexR = [4, 8 ,2];
    let index = [indexL, indexR];

    $('.io-box.car'+car).append($('<div>',{
        'class': 'io-container'
    })
        .each(function(){
            for (let i=0; i<2;i++){
                let div = genIoColumn(car, book[i], index[i]);                
                $(this).append(div);
            }
        })
    )
}

function genIoColumn(car, book, index){
    // left 2 5 8 4 2
    // right 4 8 2
    let count = 0;
    let label;
    let column = $('<div>').addClass('io-column car'+car).each(function(){
        for(let i = 0; i<index.length; i++){
            // console.log('index.length: ' + index.length)
            $(this).append($('<div>').addClass('io-group').each(function(){
                for (let j=0; j<index[i]; j++){
                    label = genIoLabel();
                    $(this).append(label);
                }        
            }));
        }
    })
    return column;
} 

function genIoLabel(){
    let label = $('<div>').addClass('io-label')
        // .append($('<div>').addClass('io-stat'));
    return label;
}
*/