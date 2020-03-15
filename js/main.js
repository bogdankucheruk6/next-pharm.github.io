$(document).ready(function() {
    // burger menu
    let burger = $('.burger_menu');

    burger.on('click', function () {
        $(this).toggleClass('burger_dis');
        $('.nav_wrapper_mobile').toggleClass('nav_wrapper_mobile_dis');
    });

    // slider
    function slider (selector) {

        let itemLengthDiv = $(`${selector}`).children('div').length;
        let itemLengthDots = $('.dots_wrapper').children('div').length;
        let item = $(`${selector}`).children();
        let windowWidth = null;
        let wrapperWidth = null;

        item.wrapAll('<div class="slider__wrapper"></div>');
        item.wrap('<div class="slider__item"></div>');
        $('.slider__item').eq(0).addClass('slider__item_active');
        $('.dots').eq(0).addClass('dots_active');

        $(`${selector}`)
            .append('<div class="slider__navs"></div>')
            .children('.slider__navs')
            .append("<div class='slider__navs_left'></div>")
            .append("<div class='slider__navs_right'></div>");

        $(window).on('load resize', function () {
            windowWidth = $('.container').width();

            if (document.scrollHeight == document.offsetHeight) {
                windowWidth += 20;
            }

            wrapperWidth = itemLengthDiv * windowWidth;

            $('.slider__wrapper').css({
                width: wrapperWidth,
            });

            $('.slider__item').css({
                width: windowWidth,
            });

            $(`${selector}`).css({
                display: 'block',
                overflow: 'hidden',
            });
        });

        let i = 1;
        let itemLength = $('.slider__item').length;
        let n = 0;

        $('.slider__navs_left').on('click', function () {
            if (n > 0) {
                n--;
                $('.dots').eq(n).addClass('dots_active');
                $('.dots').eq(n + 1).removeClass('dots_active');
            } else if (n === 0) {
                n = 3;
                $('.dots').eq(n).addClass('dots_active');
                $('.dots').eq(n - 3).removeClass('dots_active');
            }


            if (i > 1) {
                i--;
            } else if (i === 1) {
                i = 4;
            }

            let prevItemWidth = ((windowWidth * i) - windowWidth);

            $('.slider__wrapper').css({
                transform: `translate(-${prevItemWidth}px)`,
            });

        });

        $('.slider__navs_right').on('click', function () {
            if (n < 3) {
                n++;
                $('.dots').eq(n).addClass('dots_active');
                $('.dots').eq(n - 1).removeClass('dots_active');
            } else if (n === 3) {
                n = 0;
                $('.dots').eq(n).addClass('dots_active');
                $('.dots').eq(n + 3).removeClass('dots_active');
            }

            if (i < itemLength) {
                i++;
            } else if (i === 4) {
                i = 1;
            }

            let nextItemWidth = (windowWidth * i) - windowWidth;

            $('.slider__wrapper').css({
                transform: `translate(-${nextItemWidth}px)`,
            });

        });
    }

    slider('.slider');

    // warning !

    $(window).on('load', function () {
        let popUp = $('.pop_up__wrapper');
        let btn1 = $('.warning_button_1');
        let btn2 = $('.warning_button_2');
        let product = $('.cataloge__product_container');

        popUp.css('display', 'flex');

        if (localStorage.getItem('display') == 'none') {
            popUp.css('display', 'none');
            $('body').css('overflowY', 'auto');
        } else if (localStorage.getItem('display') == 'block') {
            popUp.css('display', 'none');
            product.children('div').eq(0).css('display', 'none');
            $('body').css('overflowY', 'auto');
        }


        btn1.on('click', function () {
            localStorage.setItem('display', 'none');
            popUp.css('display', 'none');
            product.children('div').eq(0).css('display', 'none');
            $('body').css('overflowY', 'auto');
        });

        btn2.on('click', function () {
            localStorage.setItem('display', 'block');
            popUp.css('display', 'none');
            $('body').css('overflowY', 'auto');
        });
    });
});