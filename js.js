$(document).ready(function(){
  /*----------------------------------------------------------------------------*/
  $('.right-links').append('<li class="nav-a-line"><u></u></li>');
  $('.p-nav-list .p-navEl.is-selected .p-navEl-link').append('<u></u><u></u>');
  $('.nav-a-line').css('width',$('.right-links li:first-child').width());
  $('.right-links li').hover(function() {
    var pos = $(this).position().left,
  	lWidth = $(this).width(),
  	uWidth = $('.right-links').width(),
    r = ($('.right-links').width()-$(this).position().left)-lWidth;
    $('.nav-a-line').css({'width':$(this).width()+'px', 'right':r+'px'});
}, function() {
$('.nav-a-line').css({'width':$('.right-links li:first-child').width(), 'right':0});
});
$('.p-nav-opposite').appendTo('.hd-left');
  $('.notices--block li').each(function(index, el) {
  if ($(this).height() > 50) {
    $(this).addClass('note-d')
  }
});
$('.threads-silder').slick({
slidesToShow: 3,
dots:true,
slidesToScroll: 1,
speed: 1000,
focusOnSelect: true,
rtl:true,
autoplay:true,
arrows:false,
autoplaySpeed: 6000,
responsive: [{
				breakpoint: 780,
				settings: {
						vertical: false,
						slidesToShow: 2,
						slidesToScroll: 1,
				}
		},{
	breakpoint: 520,
	settings: {
vertical: false,
			slidesToShow: 1,
			slidesToScroll: 1,
	}
}]
});
  $('.notice-content').prepend('<u class="notice-ico"></u><i class="notc-icon icon-quote"></i>');
  $('.note-d .notice-content .notc-icon').attr('class','notc-icon icon-lightbulb');
  /*----------------------------------------------------------------------------*/
  $('.block[data-widget-section=onlineNow] .block-minorHeader,.block[data-widget-definition=forum_statistics] .block-body dl:nth-child(3)').prepend('<i class="icon-users"></i> ');
  $('.block[data-widget-section=staffMembers] .block-minorHeader').prepend('<i class="icon-user-male"></i> ');
  $('.block[data-widget-definition=new_posts] .block-minorHeader,.block[data-widget-definition=forum_statistics] .block-body dl:nth-child(2)').prepend('<i class="icon-chat"></i> ');
  $('.block[data-widget-definition=forum_statistics] .block-minorHeader').prepend('<i class="icon-flag"></i> ');
  $('.block[data-widget-definition=share_page] .block-minorHeader').prepend('<i class="icon-thumbs-up"></i> ');
  $('.block[data-widget-definition=forum_statistics] .block-body dl:nth-child(1)').prepend('<i class="fa fa-clipboard"></i> ');
  $('.block[data-widget-definition=forum_statistics] .block-body dl:nth-child(4),.p-navgroup-link--logIn').prepend('<i class="icon-user"></i> ');
  $('.p-navgroup-link--register').prepend('<i class="fa fa-user-plus"></i> ');
  $('.fot-links ul a').prepend('<i class="fa fa-angle-left"></i> ');
  /*----------------------------------------------------------------------------*/
  $('article.message--post').prepend('<div class="post-msg-header"></div>');
  $('article.message--post .message-attribution').each(function(index, el) {
  var hd = $(this).parent().parent().parent().parent().find('.post-msg-header');
  $(this).appendTo(hd)
  });
  $('.post-msg-header time').before('<i class="fa fa-clock-o"></i> ');
  $('.message-userExtras dl').each(function(index, el) {
  if ($(this).find('i').length == 0) {
    $(this).prepend('<i class="fa fa-angle-left"></i>');
  }
  });
  /*----------------------------------------------------------------------------*/
  $('.option-toggle').click(function () {
		$('body').toggleClass('open-op-panel');
		return false
});
$('.reset-theme').click(function () {
		delete_cookie('bgr_color');
		delete_cookie('option_values');
		delete_cookie('font_name');
    delete_cookie('body_custom_bgr');
    delete_cookie('admin_text_bgr');
    $('#wrapp').attr('class', currentC);
    cssBlock.innerHTML = '';
    $('body').removeClass('open-op-panel custom-bgr-on').css('background-image', '');
    $("body").removeClass(function (index, className) {
    return (className.match (/(^|\s)font-name-\S+/g) || []).join(' ');
    });
    $('#custom-forum-bgr').val('');
    cssBlock.innerHTML += ".at-t,.at-i{background-color:#"+CurrentBgr+";}";
    cssBlock.innerHTML += ".at-t:before{border-top-color:#"+CurrentBgr+";}";
		return false
});
$('#wrapp').click(function () {
		$('body').removeClass('open-op-panel');
});
$('.option-panel,.sub-cat-menu,.change-color-wrap').click(function (event) {
		event.stopPropagation();
});
$('.opt-tabs-nav a').click(function () {
		$('.opt-tabs-nav a').css('opacity', '0.5');
		$(this).css('opacity', '1');
		var ptab = $(this).attr('href');
		$('.opt-list').hide();
		$(ptab).fadeIn();
		return false
});
/*-------------*/
var CurrentBgr = Clighten('218c74', 75);
if (getCookie('admin_text_bgr') != '') {
    cssBlock.innerHTML += ".at-t,.at-i{background-color:#"+getCookie('admin_text_bgr')+";}";
    cssBlock.innerHTML += ".at-t:before{border-top-color:#"+getCookie('admin_text_bgr')+";}";
}else {
    cssBlock.innerHTML += ".at-t,.at-i{background-color:#"+CurrentBgr+";}";
    cssBlock.innerHTML += ".at-t:before{border-top-color:#"+CurrentBgr+";}";
}
$('.color-switcher li a').click(function (e) {
  e.preventDefault();
  var colorCode = $(this).css('background-color');
  cssBlock.innerHTML = ele+"{background-color:"+colorCode+";}";
  cssBlock.innerHTML += ele2+"{border-bottom-color:"+colorCode+";}";
  cssBlock.innerHTML += ele3+"{color:"+colorCode+";}";
  cssBlock.innerHTML += ele4+"{border-color:"+colorCode+";}";
  cssBlock.innerHTML += ele5+"{border-right-color:"+colorCode+";}";
  cssBlock.innerHTML += ele6+"{border-top-color:"+colorCode+";}";
  var Tcolor = rgb2hex(colorCode)
  var AdBgr = Clighten(Tcolor, 90);
  cssBlock.innerHTML += ".at-t,.at-i{background-color:#"+AdBgr+";}";
  cssBlock.innerHTML += ".at-t:before{border-top-color:#"+AdBgr+";}";
  createCookie('bgr_color', colorCode, 360);
  createCookie('admin_text_bgr', AdBgr, 360);

});
function rgb2hex(rgb) { rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); } return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);}
function Clighten(color, percent) {
    var num = parseInt(color,16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
$('.opt-switcher,.avatar-style,.c-info-style').click(function (e) {
  e.preventDefault();
  var x = $(this).attr('id');
  if ($(this).hasClass('avatar-style')) {
  $("#wrapp").removeClass(function (index, className) {
    return (className.match (/(^|\s)avatar-style-\S+/g) || []).join(' ');
   });
}
if ($(this).hasClass('c-info-style')) {
  $("#wrapp").removeClass(function (index, className) {
    return (className.match (/(^|\s)u-info-style-\S+/g) || []).join(' ');
   });
}

  if ($(this).hasClass('font-name-switcher')) {
    $("body,#wrapp").removeClass(function (index, className) {
    return (className.match (/(^|\s)font-name-\S+/g) || []).join(' ');
    });
    $('body').addClass(x)
    createCookie('font_name', x, 360);
  }
  $('#wrapp').toggleClass(x);
		var classes = $('#wrapp').attr('class');
		createCookie('option_values', classes, 360)
});
$('#custom-forum-bgr').keyup(function(event) {
  var img = $(this).val();
  if (img == '') {
    $('body').removeClass('custom-bgr-on');
    $('#wrapp').removeClass('header-non');
  }else{
    $('body').addClass('custom-bgr-on');
    $('#wrapp').addClass('header-non');
  }
  createCookie('body_custom_bgr', img, 360);
  $('body').css('background-image', 'url(' + img + ')');
  var classes = $('#wrapp').attr('class');
  createCookie('option_values', classes, 360)
});

if (getCookie('body_custom_bgr') != '') {
$('body').addClass('custom-bgr-on');
var bgr = getCookie('body_custom_bgr');
$('body').css('background-image', 'url(' + getCookie('body_custom_bgr') + ')');
$('#custom-forum-bgr').val(bgr)
}
var text        = $('.message--post .message-body');
var defaultSize = 100,
    sizeStep    = 20,
    minSize     = defaultSize - 2 * sizeStep,
    maxSize     = defaultSize +  8 * sizeStep;

var size        = defaultSize;
$('#fontBigger').click(function (event) {
    event.preventDefault();
    if( !$(this).parent().hasClass("active") ) {
        $(this).parent().addClass("active").siblings().removeClass("active");
    }
    size = Math.min(size + sizeStep, maxSize);
    setSize();
    return false;
});

$('#fontDefault').click(function (event) {
    event.preventDefault();
    if( !$(this).parent().hasClass("active") ) {
        $(this).parent().addClass("active").siblings().removeClass("active");
    }
    size = defaultSize;
    setSize();
    return false;
});

$('#fontSmaller').click(function (event) {
    event.preventDefault();
    if( !$(this).parent().hasClass("active") ) {
        $(this).parent().addClass("active").siblings().removeClass("active");
    }
    size = Math.max(size - sizeStep, minSize);
    setSize();
    return false;
});

function setSize() {
    $("#wrapp").removeClass(function (index, className) {
      return (className.match (/(^|\s)post-font-size-\S+/g) || []).join(' ');
     });
    $('#wrapp').addClass('post-font-size-'+size);
    var classes = $('#wrapp').attr('class');
    createCookie('option_values',classes,360)
}
  /*----------------------------------------------------------------------------*/
  $('.message--post').each(function(index, el) {
  var username = $(this).find('.message-userDetails .message-name a.username').text();
  $(this).find('aside.message-signature').prepend('<h3 class="sign-title clfx"><i class="icon-user"></i> <span>توقيع '+username+'</span></h3>')
  });
  if ($('.p-navgroup-link--user .avatar img').length) {
  var uAvtar = $('.p-navgroup-link--user .avatar img').attr('src');
  $('.avt-style a span img').attr('src',uAvtar)
}
  $('.qu-toggle').click(function(e) {
  e.preventDefault();
  $(this).parent().toggleClass('qu-full');
});
$('.qu-content').each(function(index, el) {
  if ($(this).height() < 110) {
    $(this).parent().addClass('no-q-over');
  }
});
$('.block[data-widget-definition=forum_statistics]').appendTo('#block-forum_statistics .f-stat');
$('.block[data-widget-section=onlineNow]').appendTo('#block-forum_statistics .u-online');
  /*----------------------------------------------------------------------------*/
  $('.social-icons a').tooltipster({
  animation: 'grow',
});
  $('.xf-ar').tooltipster({
	animation: 'grow',position : 'top',
	theme: 'xf-ar-tooltip tooltipster-default',
	interactive: true,
    content: $('<h1>تصميم وتطوير xenForo العربية</h1><b> موقعنا : xf-ar.com </b><b> البريد : turkialawlqy@gmail.com </b><ul><li><a href="http://xf-ar.com" target="_blank"><i class="fa fa-link"></i></a></li><li><a href="https://www.facebook.com/turkialawlqy" target="_blank"><i class="fa fa-facebook"></i></a></li><li><a href="http://twitter.com/turkialawlqy" target="_blank"><i class="fa fa-twitter"></i></a></li><li><a href="skype:turkyalawlqy?add" target="_blank"><i class="fa fa-skype"></i></a></li><li><a href="https://www.youtube.com/user/turkialawlqy" target="_blank"><i class="fa fa-youtube"></i></a></li><li><a href="https://www.instagram.com/xf-ar.com" target="_blank"><i class="fa fa-instagram"></i></a></li></ul>')
});
  /*----------------------------------------------------------------------------*/
});
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
