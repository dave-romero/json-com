//DFP TRACKING
/*
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') +
  '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();
*/

/*
googletag.cmd.push(function() {
  googletag.defineSlot('/1011593/www.json.com', [300, 120], 'div-gpt-ad-1368639456057-0').addService(googletag.pubads());
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});
*/

//CUSTOM TRACKING
/*
$.fn.trackConv = function(google_conversion_id, google_conversion_label){
  var img = $("<img>"); 
  img.attr('src',"http://www.googleadservices.com/pagead/conversion/"+google_conversion_id+"/?label="+google_conversion_label+"&script=0")
    .appendTo('body')
    .load(function(){
      $(this).remove();
    });
}
$(document).bind('DOMNodeInserted', function(event) {
  if($(event.target).prop('class') == 'carbonad-text' || $(event.target).prop('class') == 'carbonad-image'){
    $(event.target).find('a').click(function(){
      $.fn.trackConv("1020911558", "rJ_kCIqxvwQQxr_n5gM");
      ga('send', 'event', 'link', 'click', 'ad');
    })
  }; 
});
*/
