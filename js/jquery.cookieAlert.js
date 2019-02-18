(function ($, window, document, undefined) {

    function saveToLS(key, val) {

        if (!("localStorage" in window)) return;

        window.localStorage.setItem(key, val);
    }

    function readFromLS(key) {

        if (!("localStorage" in window)) return;
        return window.localStorage.getItem(key);
    }


    //Plugin
    $.fn.cookieAlert = function (userOptions) {

      
        if (readFromLS("cookieKakaoAccepted") === "1") {
            return this;
        }
        var options = $.extend({}, $.fn.cookieAlert.defaults, userOptions);

        var div = $("<div></div>", {
            "class": options.containerClass
        }).hide();

        var p = $("<p></p>", {
            "class": options.textClass,
            "text": options.message
        });

        var span = $("<span></span>", {
            class: options.closeClass,
            "html": options.closeIcon
        });

        p.append(span);
        div.append(p);
        this.prepend(div);

        //animation
        div.slideDown(options.animSpeed);

        //event
        span.on("click", function () {

            saveToLS("cookieKakaoAccepted", 1);

            div.slideUp(options.animSpeed, function () {
                $(this).remove();
            });

        }); //.event

        return this;

    }; //.plugin


    //default options
    $.fn.cookieAlert.defaults = {
        message: "Informujemy, iż w celu optymalizacji treści dostępnych w naszym serwisie, dostosowania ich do Państwa indywidualnych potrzeb korzystamy z informacji zapisanych za pomocą plików cookies na urządzeniach końcowych użytkowników. Pliki cookies użytkownik może kontrolować za pomocą ustawień swojej przeglądarki internetowej. Dalsze korzystanie z naszego serwisu internetowego, bez zmiany ustawień przeglądarki internetowej oznacza, iż użytkownik akceptuje stosowanie plików cookies.",
        closeIcon: $('<img>', {
            src: "images/svg/icon-cancel-white.svg"
        }),
        animSpeed: 300,
        containerClass: "cookie",
        textClass: "cookie__text",
        closeClass: "cookie__close"
    };

})(jQuery, window, document);