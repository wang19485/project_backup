$("button").click(function(){
  $("h1").css("color","purple");
  setTimeout(function(){
    $("h1").css("color","black");
  },100);
});

$(document).on("keydown",function(event){
  $("h1").text(event.key);
});
