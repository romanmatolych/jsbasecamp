function printedElText(el) {
    var text = el.innerHTML,
        i = 0,
        print = function (){
            i++;
            if( i <= text.length ){
                el.innerHTML = text.substr(0, i) + '|';
                setTimeout(print, 100);
            } else {
                el.innerHTML = text.substr(0,i);
            }
        };
        print();
};

printedElText(document.getElementById("type_text") );
    