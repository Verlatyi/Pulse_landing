const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
});
   
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});



(function($) {
    $(function() {
     
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toogleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
            });
    };

    toogleSlide('.catalog-item__link');
    toogleSlide('.catalog-item__back');
    });

    //Modal Windows

    // !!заметка $('[data-modal=consultat]').fadeOut(); //для красивого скрытия элементов со страницы.

    $('[data-modal=consultat]').on('click', function() {
        $('.overlay, #consultat').fadeIn('slow');
    }); //скрипт для открытия модальных окон
    $('.modal__close').on('click', function() {
        $('.overlay, #consultat, #order, #thanks').fadeOut('slow');
    }); //скрипт для закрытия модальных окон

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('Slow');
        });
    });//отрытие кнопки купить ! c изменениями модели , которая подтянулось в окно из карточки товара


    function validateForm(form){
        $(form).validate({
            rules: {
                name: { 
                    required : true,
                    minlength: 2
                },
                phone: {
                    required : true,
                    minlength: 10
                },
                email: {
                    required: true,
                    email:true
                }
            },
            messages: {
                name: {
                    required: "Введите Ваше имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: {
                    required: "Введите Ваш номер телефона",
                    minlength: jQuery.validator.format("Введите {0} символов!")
                  },
                email: {
                    required: "Введите Вашу электронную почту",
                    email: "Вы не правильно ввели адрес"
                }
            }
        });
    };

    validateForm('#consultat form');
    validateForm('#consultation-form');
    validateForm('#order form');

    $('input[name=phone]').mask("+7 (999) 999-9999");


    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST", 
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultat, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    function windowSize(){
        if ($(window).width() > '991'){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    }  //адптивность под мобильную версию (кнопочка вверх)

    /*$(window).load(windowSize);
    $(window).resize(windowSize);*/

    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            windowSize();
        }  else {
            $('.pageup').fadeOut();
        } 
    });

    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    }); 

    new WOW().init();
    
})(jQuery);