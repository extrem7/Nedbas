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
$('header .toggle-btn').click(function () {
    $('header .menu').slideToggle();
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
            $(this).parent().parent().next('.dropdown').slideToggle().css("display","flex");
        })
    }
}

filter_category.controller();
