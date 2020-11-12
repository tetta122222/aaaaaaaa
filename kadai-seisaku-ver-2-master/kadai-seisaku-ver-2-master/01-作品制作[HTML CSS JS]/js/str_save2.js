// 表示させる件数total_hit_countを変える
//市別に表示させるようにする
var clicknum = 1;
var back_page = $('#back_page');
var next_page = $('#next_page');
var a = $(".page1");
let pageCount;
var ajax = new XMLHttpRequest();
var total_hit_count;
let offset_page = 1;
let page;
let paeg2;
let i = 0;
let j;
let count = 0;
let aaaaaa ;
let category_l = "RSFST01000";
function food(){
    console.log( i );
    $('.page1').remove();
    $('.hotel_box').remove();
    let areacodeL = "AREAL5406";
    let name = $("#search-input").val();
    let hit_per_page = 100;
    ajax.open("get", "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=5aca6cc18a0f24786df3e9e16531427e&pref=PREF46&hit_per_page=100&id&areacode_l="+ areacodeL + "&category_l="+ category_l + "&name=" + name + "&hit_per_page=" +hit_per_page +"&offset_page" +offset_page );
    ajax.responseType = 'json';
    ajax.send(null);
}

function  getfood() {
    const htmlList = document.querySelector("#list");
    ajax.onload = function (e) {
        
        let array = "";
        array = e.target.response.rest;
        total_hit_count ="";
        let textcontent;
        total_hit_count = e.target.response.total_hit_count;
        j = i + 10;
        console.log( i,j );
        for(  i; i < j; i++ ){
            textcontent =
            '<div class="hotel_box">' + '<img src ="' + array[i].image_url.shop_image1 + '" alt = "no_image" onerror="this.onerror = null; this.src="";">'+  
            '<ul><li>' + array[i].name + '</li>' + 
            '<li>' + array[i].name_kana + '</li>' + 
            '<li>' + array[i].address + '</li>' + '</ul>' + 
            '<div class = "hotel_child">' + '<p>予算￥'+array[i].budget +'～</p></div>'
            '<a href ="' + array[i].url + '"> 詳細情報へ</a></div></div>';
            htmlList.innerHTML += textcontent;
        };
        
        i = 0
        j = 0

        back_page.toggleClass('display_none');
        
        $(".page1").eq(0).on('click', function(){
            back_page.addClass("display_none");
        });
        
        $(".page1").eq(-1).on('click', function(){
            next_page.addClass("display_none");
        });
    };
    setTimeout("button()", 2000);
};

function button(){
    page =  Math.floor(total_hit_count/10 + 1);
    page2 = Math.floor(total_hit_count/10);
    let contents = "";
    
    for(let kkk = 1; kkk < page; kkk++){
        contents += '<button  class="page1" value="' +kkk+' "> ' +kkk+'</button>';
        $('#page_nam').append(contents);
        contents = "";
    }
    
    $(".page1").on('click', function(){
        $('.hotel_box').remove();
        var index = $('button.page1').index(this) ;
        console.log(index);
        offset_page = index
        i = clicknum * 10;
        if(i === 10){
            i = 0;
        }
        console.log(i);
        food();
        getfood();
    })
}
//-----------------------------------------
//ジャンル選択
//-----------------------------------------
$('.gener').on('click', function(){
    if(count === 0 ){
        count = 1;
        $('.cate').removeClass('display_none');
            }
   else{
       count = 0;
        $('.cate').addClass('display_none');
        
   }
})

$('.sort').on('click', function(){
    $('.hotel_box').remove();
    category_l = $(this).attr('data-value');
    $('.cate').addClass('display_none');
    count = 0;
    food();
    getfood();
})

// クリックされた番号のページに移動


// // 次ページへ
// $("#next_page").on('click', function(){ 
//     $('.hotel_box').remove();
//     // back_page.removeClass('display_none');
//     clicknum += 1;
//     let a = clicknum * 10;
//     console.log(clicknum);

//     if(clicknum === page2){
//         next_page.toggleClass("display_none");  
//     }
// });

// //前ページへ
// $("#back_page").on('click', function(){ 
//     $('.hotel_box').remove();
//     clicknum -= 1;
//     console.log(clicknum);
//     let a = clicknum * 10;
//     console.log(clicknum);
//     for( let i = a - 9; i < a; i++ ){
//         textcontent =
//         '<div class="hotel_box">' + '<img src ="' + array[i].image_url.shop_image1 + '">'+  
//         '<ul><li>' + array[i].name + '</li>' + 
//         '<li>' + array[i].name_kana + '</li>' + 
//         '<li>' + array[i].address + '</li>' + '</ul>' + 
//         '<div class = "hotel_child">' + '<p>予算￥'+array[i].budget +'～</p></div>'
//         '<a href ="' + array[i].url + '"> 詳細情報へ</a></div></div>';
//         console.log(textcontent)
//         htmlList.innerHTML += textcontent;   
//     };
//     if(clicknum === 1){
//         back_page.toggleClass("display_none");  
//     }
// });

$('#search-buttom').on('click', function(){
    food();
    getfood();
});

