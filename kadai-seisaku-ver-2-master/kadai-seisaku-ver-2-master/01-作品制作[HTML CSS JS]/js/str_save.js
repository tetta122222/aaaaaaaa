//同じ数字を入力したら表示されるのが変わる
// 改ページボタンを消えるようにする
var clicknum = 1;
var back_page = $('#back_page');
var next_page = $('#next_page');
let pageCount ;



function  getHotels(pageValue){

 
  var keyword = $("#search-input").val(),
      //keyword = "ドーミーイン",
      mid_cd = 'kagoshima',
      hits = 10,
      page = 1;
  if( pageValue !== undefined ){
    page = pageValue;
  }
  // データを引っ張る
  $.ajax({
    url: 'https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&applicationId=1020173082905393111&keyword=' + keyword + '&middleClassCode=' + mid_cd  + '&page=' + page +'&hits=' + hits , 
    type: 'post',
    dataType:'jsonp'
  })
  
  .done(function(response) {
    pageCount = response.pagingInfo.recordCount;
    console.log(pageCount);
    let hotels = response.hotels;
    let contents = '';
    let i = 0;
    hotels.length;
    for( i; i<hotels.length; i++){
      let num1  = Math.floor(hotels[i].hotel[0].hotelBasicInfo.reviewAverage);
      let num2  = 5 - num1;
      /*店舗名～住所の表示*/
      contents +=
      '<div class="hotel_box"><img src="' + hotels[i].hotel[0].hotelBasicInfo. hotelImageUrl + '">'+
      '<ul><li>' + hotels[i].hotel[0].hotelBasicInfo.hotelName + '</li>'+
      '<li>' + hotels[i].hotel[0].hotelBasicInfo.hotelKanaName + '</li>'+
      '<li>' + hotels[i].hotel[0].hotelBasicInfo.address2 + '</li>';
      /*レビューの表示*/
      for(let j = 0; j < num1; j++){
         contents +='<img src="../img/star2.png" alt="星（黄）" class="image1 image">';
      } 
      for(let k = 0; k < num2; k++){
        contents +='<img src="../img/star1.png" alt="星（灰）" class="image1 image">';
      }
      /*料金とリンクボタンの表示*/
      contents +=
      '<li>' + hotels[i].hotel[0].hotelBasicInfo.telephoneNo + '</li></ul>'+
      '<div class="hotel_child"><p>最安料金￥' + hotels[i].hotel[0].hotelBasicInfo.hotelMinCharge + '～</p>'+
      '<a href ="' + hotels[i].hotel[0].hotelBasicInfo.hotelInformationUrl + '"> 詳細情報へ</a></div></div>';
      $('#list').append(contents);      
      
      sessionStorage.setItem("gdsjajo",hotels[i].hotel[0].hotelBasicInfo.hotelName);
      /*変数の中身を初期化*/
      contents  = "";
    }
  });
};



//serchボタンをクリック
$('#search-buttom').on('click', function(){
  $('.hotel_box').remove();
  //$('.page1').remove();
  getHotels();
  setTimeout("aaaaa()", 2000);
})

//次ページへ
$('body').on('click', '#next_page', function() {
  $('.hotel_box').remove();
  back_page.removeClass('display_none');
  clicknum += 1;
  getHotels(clicknum);
  let max_page = Math.floor( pageCount / 10 + 1 );
  if(clicknum === max_page){
    next_page.toggleClass('display_none');
    $('#back_page').click(function() {
      next_page.removeClass('display_none');
    });
  }
})


//前ページへ
$('body').on('click', '#back_page', function() {
  $('.hotel_box').remove();
  clicknum -= 1;
  getHotels(clicknum);
  if(clicknum === 1){
    back_page.toggleClass('display_none');
  }
});

//--------------
// 番号のページへ
//--------------
function aaaaa(){
  // var page_nam  = $('#page_nam');
  let contents ="";
  let page = Math.floor( pageCount / 10  + 2 );
  console.log(pageCount);
  // ページ数
  for(var i = 1; i < 10; i++){
    contents += '<button  class = "page1" value = "' +i+' "> ' +i+'</button>';
    $('#page_nam').append(contents);
    contents  = "";
  }
  
  //ページングの番号を押したとき
  $('.page1').on('click', function(){ 
    
    back_page.toggleClass('display_none');
    next_page.toggleClass('display_none');
    // var index = $('button.page1').index(this) + 1;
    // clicknum = index;
    // getHotels(clicknum);
    // $('.hotel_box').remove();
    // let max_page = Math.floor( pageCount / 10 + 1 );
    // console.log("max_page", max_page);
    // console.log("clicknum",clicknum);

  });  
}





 





