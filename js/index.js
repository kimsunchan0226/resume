$('html, body').stop().animate({
    scrollLeft : 0
}, 1000)


$('#menu li').eq(0).addClass('on')
var cflag = false;
$('#menu li a, .depth1 li a, .openlist li a').on('click focus', function(e){
    e.preventDefault()
    $('.open').removeClass('on')
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()+1
    var secDist = $('section').eq(num).offset().left
    $('html, body').stop().animate({
        scrollLeft : secDist
    }, 1000, function(){
        cflag = false 
    }) 
})

// 왼쪽 끝에서부터 해당sect 까지 떨어진 해당 거리값
var sDist0 = $('#sect1').offset().left 
var sDist1 = $('#sect2').offset().left
var sDist2 = $('#sect3').offset().left
var sDist3 = $('#sect4').offset().left

// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect5').offset().left            

var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollLeft()
    if ( sct>=sDist0 && sct<sDist1 && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('#menu').removeClass('on')
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        $('#menu').addClass('on')
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
        $('#sect4').addClass('on')
    } 

})


// sect2 카드 뒤집기
$('#sect2 .cbtn').on('click', function(){
    if (!$('#sect2 .card').hasClass('on')) {
        $('#sect2 .card').addClass('on')
    } else {
        $('#sect2 .card').removeClass('on')
    }
})

function count(jumsu, cname, time) {
    let num = 0; 
    var stop = setInterval(function(){
        num++;
        if (num<=jumsu) {
            $(cname).find('.score').css({ height:num+'%', transition:'all 0s' })
            $(cname).find('.myscore').text(num+'%')
        } else {
            clearInterval(stop)
            $(cname).find('.score').css({ transition:'all 1s' })
        }
    }, time)
}

$('#sect3 .cbtn').on('click', function(){
    $(this).prev().fadeIn(300)
    $('.skillContainer').addClass('on')
    count(80, '.html',15)
    count(70, '.css',16)
    count(50, '.script',17)
    count(40, '.jquery',18)
    count(60, '.react',19) 
})

$('#sect3 .skillOuter').on('click',function(){
    $(this).fadeOut()
    $('.skillContainer').removeClass('on')
})

$('section').on('mousewheel', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollLeft: $(this).prev().offset().left
        }, 1000)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollLeft: $(this).next().offset().left
        }, 1000)
    }
})



// 햄버거 클릭시 메뉴박스 오픈하기
$('.open').on('click', function(){
    
    if ( $(this).hasClass('on') ) {
        $(this).removeClass('on')
        // $(this).find('i').removeClass('fa-times').addClass('fa-bars')
    } else {
        $(this).addClass('on')
        // $(this).find('i').removeClass('fa-bars').addClass('fa-times')
    }

})


$('body').on('keydown', function(e){
    
    if (e.key === 'ArrowRight') {
        $('h1').stop().animate({
            left:'+=50'
        }, 500)
    } else if (e.key === 'ArrowLeft') {
        $('h1').stop().animate({
            left:'-=50'
        }, 500)
    } else if (e.key === 'ArrowUp') {
        $('h1').stop().animate({
            top:'-=50'
        }, 500)
    } else if (e.key === 'ArrowDown') {
        $('h1').stop().animate({
            top:'+=50'
        }, 500)
    }
    
})

// 네번째 박스
var linum =0;
$('#sect4 ul li a').on('click',function(e){
    e.preventDefault()
    linum = $(this).parent().index()
    var src = $(this).find('img').attr('src')
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var desc = $(this).attr('data-desc')
    var font =$(this).attr('data-font')
    var color1 = $(this).attr('data-color1')
    var color2 = $(this).attr('data-color2')
    $('body').append('<div class="outlayer"><div class="inlayer"><img src="" alt""><div class="text"><h2></h2><p class="p1"></p><p class="p2"></p><p class="p3"><span></span><span></span></p></div></div></div>')
    $('.outlayer').css({
        position:'fixed',
        backgroundColor:'rgba(0,0,0,0.8)',
        zIndex:9999,
        top:0,
        left:0,
        right:0,
        bottom:0
    })
    $('.inlayer').css({
        position:'relative',
        top:'50%',
        transform:'translateY(-50%)',
        width:'1000px',
        margin:'0 auto',
        textAlign:'center',fontSize:'20px', color:'#fff'
    })
    .append('<button class="close"><i class="fas fa-times-circle"></i></button>')
    .append(`<div><a href="${href}" target="_blank">사이트 이동하기</a></div>`)
    .append('<button class=" prev"><i class="fas fa-angle-left"></i></button><button class=" next"><i class="fas fa-angle-right"></i></button>'
    )
    $('.inlayer button.close').css({
        border:'none',
        position:'absolute',
        top:'-25px', right:'-25px',
        backgroundColor:'none',
        color:'#fff',
        fontSize:'50px'
    })
    $('.inlayer .prev').css({
        position:'absolute',
        top:'50%', transform:'translateY(-50%)',
        left:'-100px',fontSize:'80px',color:'#fff',
        border:'none'
    })
    $('.inlayer .next').css({
        position:'absolute',
        top:'50%', transform:'translateY(-50%)',
        right:'-100px',fontSize:'80px',color:'#fff',
        border:'none'
    })
    $('.inlayer .text').css({
        display:'inline-block',
        width:"40%",
        height:'300px',
        backgroundColor:'#fff',
        verticalAlign:'middle',
        color:'#000'
    })
    $('.inlayer .text h2').text(title).css({
        fontSize:'30px',
        textAlign:'center',
        color:'green',
        margin:'10px 0'
    })
    $('.inlayer .text .p1').text(desc).css({
        padding: '10px',
        fontSize: '14px',
        marginBottom: '10px'
    })
    $('.inlayer .text .p2').text(font)
    $('.inlayer .text .p3 span').eq(0).before(color1)
    $('.inlayer .text .p3 span').eq(0).css({
        padding:'4px 30px',
        backgroundColor:color1,
        margin:'0 20px 0 5px'
    })
    $('.inlayer .text .p3 span').eq(1).before(color2)
    $('.inlayer .text .p3 span').eq(1).css({
        padding:'4px 30px',
        backgroundColor:color2,
        margin:'0 0 0 3px'
    })

    $('.inlayer img').attr('src', src).css({
        width:'50%',
        verticalAlign:'middle',
        marginRight:'10px'
    })
    
})

$('body').on('click','.outlayer', function(){
    // p.498
    $('.outlayer').remove()
})
$('body').on('click','.inlayer a, .inlayer img, .inlayer .text', function(e){
    e.stopPropagation()
})

function gallery(num) {
    let href = $('#sect4 ul li').eq(num).find('a').attr('href')
    let src = $('#sect4 ul li').eq(num).find('img').attr('src')
    let alt = $('#sect4 ul li').eq(num).find('img').attr('alt')
    $('.inlayer a').attr('href',href)
    $('.inlayer img').attr({
        'src' :src,
        'alt' :alt 
    })
}

$('body').on('click','.inlayer .next',function(e){
    e.preventDefault()
    e.stopPropagation()
    linum++
    if (linum>7) { 
        linum = 0
    }
    gallery(linum)
})
$('body').on('click','.inlayer .prev',function(e){
    e.preventDefault()
    e.stopPropagation()
    linum--
    if (linum<0) { 
        linum = 7
    }
   gallery(linum)
})