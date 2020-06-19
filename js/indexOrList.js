$(function() {

    // 3. 文章热门排行
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function(data) {
            // console.log(data);
            if (data.code === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    $('.content_list li').eq(i).children('a').attr('href', './article.html?id=' + data.data[i].id);
                    $('.content_list li').eq(i).children('a').text(data.data[i].title);
                }
            }
        }
    })

    // 4. 最新评论
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success: function(data) {
            if (data.code === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    var sp = data.data[i].author[0];
                    // console.log(sp);
                    $('.content_list.comment_list li').eq(i).children('span').text(sp);
                    $('.content_list.comment_list li').eq(i).children('b').html('<em>' + data.data[i].author + '</em>' + data.data[i].date + '-' + data.data[i].time)
                    $('.content_list.comment_list li').eq(i).children('strong').text(data.data[i].intro)
                }
            }
        }
    })


    // 5. 焦点关注
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        success: function(data) {
            // console.log(data);
            if (data.code === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    $('.content_list.guanzhu_list>li').eq(i).children('a').attr('href', './article.html?id=' + data.data[i].id);
                    $('.content_list.guanzhu_list>li').eq(i).children('a').text(data.data[i].intro);
                }
            }
        }
    })

    // 6. 全部文章分类
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/category',
        success: function(data) {
            // console.log(data);
            var resHtml1 = template('article-category1', data);
            $('.level_two').html(resHtml1);
            var resHtml2 = template('article-category2', data);
            $('.left_menu.fl').html(resHtml2);
        }
    })

    // 7.点击搜索
    $('.search_btn').click(function() {
        var search = $('.search_txt').val().trim();
        if (search == '') {
            alert('请输入内容搜索');
            return;
        } else {
            window.location.href = './list.html?search=' + search;
        }
    })

    // 按回车也可以搜索
    $('.search_txt').keydown(function(e) {
        if (e.keyCode == 13) {
            $('.search_btn').click();
        }
    })
})