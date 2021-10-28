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
    clickcount = num
    $('section').eq(num).addClass('on')
    $('section').eq(num).siblings().removeClass('on')
    var secDist = $('section').eq(num).offset().left
    $('html, body').stop().animate({
        scrollLeft : secDist
    }, 1000, function(){
        cflag = false 
        $('.sk i').eq(0).show()
        $('.sk i').eq(1).show() 
    })
    
})

// 왼쪽 끝에서부터 해당sect 까지 떨어진 해당 거리값
var sDist0 = $('#sect1').offset().left 
var sDist1 = $('#sect2').offset().left
var sDist2 = $('#sect3').offset().left
var sDist3 = $('#sect4').offset().left
var sDist4 = $('#sect5').offset().left

// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect6').offset().left            

var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollLeft()
    if ( sct>=sDist0 && sct<sDist1) {
        $('#menu').removeClass('on')
        $('.sk i').eq(0).hide()
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('#menu').addClass('on')
        $('.sk i').eq(0).show()
        $('section').eq(1).addClass('on')
    } else if ( sct>=sDist2 && sct<sDist3 && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        $('#menu').addClass('on')
        $('section').eq(1).siblings().removeClass('on')
    } else if ( sct>=sDist3 && sct<sDist4 && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#menu').addClass('on')
    } else if ( sct>=sDist4 && sct<lastSect && !cflag ) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
        $('#menu').addClass('on')
        $('.sk i').eq(1).show()
    } else if ( sct>=lastSect ) {
        $('#menu').removeClass('on')
        $('.sk i').eq(1).hide()
    }

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

$('.sk i').eq(0).hide()
var clickcount = 0
$('.sk i').eq(1).on('click', function(){
    if (clickcount<$('#wrap>section').length-1) {
        clickcount++
        console.log(clickcount)
        var moveright = $('#wrap>section').eq(clickcount).offset().left
        $('html,body').animate({
            scrollLeft:moveright
        },500)
    }
})
$('.sk i').eq(0).on('click', function(){
    if (clickcount>0) {
        clickcount--
        console.log(clickcount)
        var moveright = $('#wrap>section').eq(clickcount).offset().left
        $('html,body').animate({
            scrollLeft:moveright
        },500)
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
// sect3 
// function count(jumsu, cname, time) {
//     let num = 0; 
//     var stop = setInterval(function(){
//         num++;
//         if (num<=jumsu) {
//             $(cname).find('.score').css({ height:num+'%', transition:'all 0s' })
//             $(cname).find('.myscore').text(num+'%')
//         } else {
//             clearInterval(stop)
//             $(cname).find('.score').css({ transition:'all 1s' })
//         }
//     }, time)
// }
var arrChartColor = ['#e8670c', '#ff9e5a', '#ff710d', '#7f4f2d', '#cc5b0b', '#cc3a1a'];
        $('.skills').each(function(idx, el){
            $(this).easyPieChart({
                animate: 2000,       // 진행시간
                easing: 'easeOutBounce', // 속도함수
                barColor: arrChartColor[idx],   // 채워지는 색상
                trackColor: '#efefef', // 트색 색상
                scaleColor: false, // 눈금선 색상
                lineCap:'butt', // 선의 끝 모양(butt, round, square)
                lineWidth:20, // 선의 폭
                size:180, // 원형차트의 크기
                //onStart:$.noop, // 시작부분에서 호출되는 콜백함수(animate가 false가 아닐때만 작동)
                //onStop:$.noop, // 끝에서 호출되는 콜백함수(animate가 false가 아닐때만 작동)
			    onStep: function(from, to, percent) {  // 현재 값을 제공하는 애니메이션 중에 호출되는 콜백 함수
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            })
        })

var chartBool = true;
$('#sect3 .cbtn').on('click',function(){
    $(this).prev().fadeIn(300)
    $('.skills').each(function(idx, element) {
        var num = $(this).attr('data-percent');
        $('.skills').eq(idx).data('easyPieChart').disableAnimation().update(0).enableAnimation().update(num);
    });
    chartBool = false;
})
       

            

       
// $('#sect3 .cbtn').on('click', function(){
//     $(this).prev().fadeIn(300)
//     // $('.skillContainer').addClass('on')
//     // count(80, '.html',15)
//     // count(70, '.css',16)
//     // count(60, '.script',17)
//     // count(60, '.jquery',18)
//     // count(50, '.react',19) 
// })

$('#sect3 .skillOuter').on('click',function(){
    $(this).fadeOut()
    $('.skillContainer').removeClass('on')
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
    var src1 = $(this).attr('data-src1')
    var src2 = $(this).attr('data-src2')
    var src3 = $(this).attr('data-src3')
    var href = $(this).attr('href')
    var desc1 = $(this).attr('data-desc1')
    var desc2 = $(this).attr('data-desc2')
   
    $('body').append(`<div class="outlayer"><div class="inlayer"><img src="${src1}" alt="" width="30%"><img src="${src2}" alt="" width="30%" style="margin:0 10px"><img src="${src3}" alt="" width="30%"><div class="text"><h2></h2><p class="p1" style="margin-top:90px">${desc1} </p><p class="p1">${desc2}</p><span></span><span></span></div></div></div>`)
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
        position:'absolute', left:'50%',
        top:'50%',
        transform:'translate(-50%, -50%)',
        width:'1000px',
        margin:'0 auto',
        textAlign:'center',fontSize:'20px', color:'#fff'
    })
    .append('<button class="close"><i class="fas fa-times-circle"></i></button>')
    .append(`<div><a href="${href}" target="_blank">사이트 이동하기</a></div>`)
    .append('<button class="prev"><i class="fas fa-angle-left"></i></button><button class="next"><i class="fas fa-angle-right"></i></button>'
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
    $('.inlayer .text .p1').text(desc1).css({
        padding: '20px',
        fontSize: '14px',
        marginBottom: '10px',
        marginTop:'30px'
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
// isotope 플러그인 연결 (갤러리필터링)
$(window).on("load", function(){
    // skroll.recalcPosition();

    $(".grid").isotope({
       filter:"*",
       layoutMode:'masonry', // fitRows, masonry
       itemSelector:'.all',
   })

   $('.lodoing p').eq(0).stop().animate({opacity:1}, 400)
   $('.lodoing p').eq(1).stop().animate({opacity:1}, 1800)
   $('.lodoing p').eq(2).stop().animate({opacity:1}, 2900)
   $('.lodoing p').eq(3).stop().animate({opacity:1}, 4000, function(){
        $('.lodoing > div p').animate({
            margin:'0 -120px'
        },500, function(){
            $(this).addClass('on')
        })
   })

    $('.lodoing').delay(5000).fadeOut()

})
$('#sect4 .category a').on('click',function(){
    $(this).addClass('on')
    $(this).siblings().removeClass('on')
    var filterValue = $(this).attr('data-filter')
    $('.grid').isotope({
        filter:filterValue,
        layoutMode:'masonry', // fitRows, masonry
        itemSelector:'.all',
    })
    return false
})

$('#sect5 .formbox .btn button:first-child').on('click',function(){
    $(this).css({
        backgroundImage:'url(./img/csimg.png)',
        backgroundRepeat:'no-repeat',
        backgroundSize:'contain',
        ainmation:'none'
    })
    // 전송 버튼 누르면 옆으로 이동하는 애니메이션
    $('html, body').delay(1000).animate({
        scrollLeft:lastSect
    }, 500)
    
    return false
})
