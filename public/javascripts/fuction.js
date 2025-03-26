$(document).ready(function() {
    $('#navbar li a').click(function(event){
        $('#navbar li a').removeClass('active');
        $(this).addClass('active');
        thisAttrHref = $(this).attr('href');
        thisAttrHrefOffset = $(thisAttrHref).offset().top;
        $('html,body').animate({scrollTop: thisAttrHrefOffset});
        event.preventDefault();
    });
});