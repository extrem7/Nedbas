$(window).scroll(function () {
    if (document.body.scrollTop > $('header').height()) {
        $('.navbar-fixed-top').slideDown();
    } else {
        $('.navbar-fixed-top').slideUp();
    }
});
$('.category .btn').click(function () {
    $('.category .btn').removeClass('active');
    $(this).addClass('active');
});
let button = false;
$('.toggle-btn').click(function () {
    $('.menu-mobile').slideToggle();
    if (button === false) {
        $(this).find('span:first-child').css({
            transform: "rotate(45deg)",
            top: '9px',
            width: "35px"
        })
        $(this).find('span:nth-child(2)').css({
            opacity: 0
        })
        $(this).find('span:nth-child(3)').css({
            transform: "rotate(-45deg)",
            bottom: '9px',
            width: "35px"
        })
        button = true
    } else {
        $(this).find('span:first').css({
            transform: "rotate(0)",
            top: '0px',
            width: "35px"
        })
        $(this).find('span:nth-child(2)').css({
            opacity: 1
        })
        $(this).find('span:nth-child(3)').css({
            transform: "rotate(0)",
            bottom: '0px',
            width: "35px"
        })
        button = false
    }
});

const filter_category = {
        controller: function () {
            $('.category .open-dropdown .mdi').click(function () {
                $(this).toggleClass('open');
                $(this).parent().parent().parent().next('li').find('> .dropdown').slideToggle().css("display", "flex");
            })
        }
    },
    item_catalog = {
        controller: function () {
            $('.cart .buy').click(function (e) {
                if (e.target == this) {
                    let href = $(this).parent().parent().find('.name').attr('href');
                    location.href = href;
                }
            })

            $('.add-cart').click(function (e) {
                e.preventDefault();
                //todo
            })
        }
    }
item_shop = {
    controller: function () {
        $('.miniatures img').click(function () {
            let src = $(this).attr('src');
            $('.big').fadeOut('fast', function () {
                $(this).attr('src', src);
                $(this).fadeIn();
            })
        });
        $('.item .head .answers').click(function (e) {
            e.preventDefault();
            $('.tabs .controll a[href="#answers"]').click();
            $('body').animate({
                scrollTop: $('.tabs').offset().top - 100
            }, 1500);
        })
        $('.heart').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            //todo
        });
        $('.form i').click(function () {
            $('form i').removeClass('active');
            $(this).addClass('active').prevAll().addClass('active');
        })
    }
};

item_catalog.controller();
filter_category.controller();
item_shop.controller();
