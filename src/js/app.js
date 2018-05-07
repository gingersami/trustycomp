import facebook from '../images/sprites/icons/sp-facebook.png';
import twitter from '../images/sprites/icons/sp-twitter.png';
import google from '../images/sprites/icons/sp-google.png';
$('.answer').on('click', function () {
    $(this).addClass('selected');
    $(this).data('checked');
    $(this).siblings().data('');
    $(this).siblings().removeClass('selected');
});
console.log('JS Running');


/*hover*/
/*
$('.search-results-filter-left p').hover(function(){
    $(this).siblings('.area-filter').css('display','flex')
},function(){
    $(this).siblings('.area-filter').hide()
});
*/
