$(function() {
    // var $genreItem = $('.genre__item');
    // var $mainListItem = $('.main-list__item');
    // $genreItem.on('click', function() {
    //     // 例えば<div data-genre-id="3">
    //     // これの取得方法は$(その要素).data('genre-id');
    //     var genreId = $(this).data('genre-id');
    //     if (genreId === 'all') {
    //         $mainListItem.show();
    //         return;
    //     }
    //     $mainListItem.hide();
    //     $mainListItem.each(function() {
    //         var _genreId = $(this).data('genre-id');
    //         if (genreId === _genreId) {
    //             $(this).show();
    //         }
    //     });
    // });
    var mainVisualHeight = $('.main-visual').height();
    $(window).scroll(function(e) {
        $('.main-visual').css('opacity', 1 - ((1 / mainVisualHeight) * $(this).scrollTop()));
        $('.main-visual').css('height', mainVisualHeight - $(this).scrollTop());
    });
});