if(fw('#loadScript button') === undefined){
    fw('#loadScript').createChild('button').innerHTML = 'flip it';

    fw('#loadScript button').addListener('click', function(){
        fw('body').toggleClass('flipped');
    });
}

fw('body').addClass('flipped');