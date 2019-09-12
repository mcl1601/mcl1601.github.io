var backgrounds = [
    "linear-gradient(rgba(100, 100, 100, 0.5),rgba(100, 100, 100, 0.5)),url('images/mountain2.jpg')",
    "linear-gradient(rgba(200, 70, 10, 0.15),rgba(100, 100, 100, 0.5)),url('images/mountain3.jpg')",
    "linear-gradient(rgba(100, 100, 100, 0.5),rgba(100, 100, 100, 0.5)),url('images/mountain.jpg')",
    "linear-gradient(rgba(100, 100, 100, 0.5),rgba(100, 100, 100, 0.5)),url('images/mountain5.jpg')",
    "linear-gradient(rgba(100, 100, 100, 0.5),rgba(100, 100, 100, 0.5)),url('images/woods_sm.jpg')"
];

var is_safari = false;
var is_edge = false;
var sidebar_animating = false;
var right;

window.onload = init;

function init(){
    
    checkBrowser();
    
    randomizeBG();
    
    $('.fade-in:first').animate({'opacity': '1'}, 800);
    
    setTimeout(fadeText, 2500);
    
    initHeaders();
    
    initRightVal();
    
    $(window).scroll(function(){
        checkForTop();
        
        scrollFade();
        
        navScrollHighlight();
    });
    
    $('.to-top, .logo-abbreviated').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    })
    
    $('.nav-button, .mobile-button').on('click', function(){
        var id = $(this).data('targetID');
        $('html, body').animate({
            scrollTop: $(".section-header").eq(id).offset().top - $('.top-navbar').outerHeight() - 50
        }, 800);
    });
    
    $('.nav-menu-icon').on('click', function(){
        $('.mobile-nav').slideToggle(400); 
    });
    
    $('.content-card').on('click', function(){
        if(!sidebar_animating){
            $('#sidebar').animate({
                right: 0
            }, 400, function(){sidebar_animating = false;});
            sidebar_animating = true;
            
            var id = $(this).data('id');
            $('.sidebar-page.active').fadeOut(400, function(){
                $(this).removeClass('active');
                $('#sidebar').scrollTop(0);
            })
            $('.sidebar-page[data-id='+id+']').fadeIn(400, function(){
                $(this).addClass('active');
            });
        }
    });
    
    $('.sidebar-container').scroll(function(){
        console.log("")
    })
    
    $('.sidebar-fixed').on('click', function(){
        if(!sidebar_animating){
            $('#sidebar').animate({
                right: right + "%"
            }, 400, function(){sidebar_animating = false;$('.sidebar-page').hide();});
            sidebar_animating = true;
        }
    })
    
    $(window).on('click', function(e){
        if((!$(e.target).closest('#sidebar').length > 0 && !sidebar_animating) || ($('.sidebar-fixed').is(e.target) && !sidebar_animating)){
            $('#sidebar').animate({
                right: right + "%"
            }, 400, function(){sidebar_animating = false;$('.sidebar-page').hide();});
            sidebar_animating = true;
        }
    });
    
    setEqualHeights();
    
    $(window).resize(function(){
        setEqualHeights();
        if(window.innerWidth < 820){
            right = -100;
        }
        else{
            right = -40;
        }
    });
    
    $('#bio-tab').height($('#skill-tab').height());
    
    $('#overlay').fadeOut(2000, function(){$('#overlay').remove();});
    $('#loading').fadeOut(1000);
}

function checkForTop(){
    var offset = $('.parallax').offset().top  - $(window).scrollTop();
    if(offset < -10){
        $('.top-navbar').addClass('not-top');
        if(is_safari || is_edge) $('.top-navbar').addClass('safari-test');
        $('.top-navbar .fade-out').addClass('fade');
        $('.top-navbar .mover').addClass('slide');
        $('.to-top').removeClass('offscreen');
    }
    else{
        $('.top-navbar').removeClass('not-top');
        if(is_safari || is_edge) $('.top-navbar').removeClass('safari-test');
        $('.top-navbar .fade-out').removeClass('fade');
        $('.top-navbar .mover').removeClass('slide');
        $('.to-top').addClass('offscreen');
    }
}

function scrollFade(){
    var faders = $('.fade-in');
    var winBot = $(window).scrollTop() + $(window).height();
    for(var i = 0; i < faders.length; i++){
//        var bottom = $(faders[i]).offset().top + ($(faders[i]).outerHeight() * 0.5);
        var bottom = $(faders[i]).offset().top;
        if(bottom < winBot){
            $(faders[i]).animate({'opacity': '1'}, 800);
            $(faders[i]).removeClass('fade-in');
        }
    }    
}

function navScrollHighlight(){
    var headers = $('.section-header');
    var boundary = $(window).height() * 0.5;
    var analyze = true;
    for(var i = headers.length - 1; i > -1; i--){
        var top = $(headers[i]).offset().top - $(window).scrollTop();

        if(top < boundary && analyze){
            $('.nav-button').eq($(headers[i]).data('id')).parent().addClass('highlighted');
            $('.mobile-button').eq($(headers[i]).data('id')).parent().addClass('highlighted');
            analyze = false;
        }
        else{
            $('.nav-button').eq($(headers[i]).data('id')).parent().removeClass('highlighted');
            $('.mobile-button').eq($(headers[i]).data('id')).parent().removeClass('highlighted');
        }
    }    
}

function checkBrowser(){
    is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var EdgeIndex = window.navigator.userAgent.indexOf('Edge');
    if(EdgeIndex > -1){
        var subStr = window.navigator.userAgent.substr(EdgeIndex);
        var version = subStr.split('/')[1];
        if(version >= 17) is_edge = true;
    }
}

function randomizeBG(){
    for(var i = 0; i < $('.parallax').length; i++){
        var random = Math.floor(Math.random() * backgrounds.length);
        $('.parallax' + (i+1)).css('background-image', backgrounds[random]);
        backgrounds.splice(random, 1);
    }
}

function setEqualHeights(){
    var containers = $('.content-row');
    for(var i = 0; i < containers.length; i++){
        var cards = $(containers[i]).find('.content-card');
        var max = 0;
        for(var j = 0; j < cards.length; j++){
            $(cards[j]).css('height', 'auto');
            var h = $(cards[j]).innerHeight();
            if(h > max){
                max = h;
            }
        }
        
        for(var k = 0; k < cards.length; k++){
            $(cards[k]).height(max);
        }
    }
    
    $('#bio-tab').height($('#skill-tab').height());
}

function initRightVal(){
    if(window.innerWidth > 820){
        right = -40;
    }
    else{
        right = -100;
        $('#sidebar').css('right', right + '%');
    }
}

function initHeaders(){
    var headers = $('.section-header');
    for(var i = 0; i < headers.length; i++){
        $(headers[i]).data('id', i);
        $('.nav-button').eq(i).data('targetID', i);
        $('.mobile-button').eq(i).data('targetID', i);
    }
}

function fadeText(){
    $('.hero-text:first').fadeOut(400, function(){
        $('.hero-text:first').text('Welcome to my portfolio');
        $('.hero-text:first').fadeIn(400);
    });
}