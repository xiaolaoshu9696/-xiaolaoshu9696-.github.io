(function($) {
    var GalMenu = {
        defaults: {
            click_to_close: true,
            stay_open: false
        },
        init: function(options) {
            var o = options,
            $this = $(this);
            $this.each(function(i) {
                var $this = $(this),
                settings = $.extend({},
                GalMenu.defaults, o),
                $menu = $('.' + settings.menu);
                $this.on('mousedown',
                function(e) {
                    if (e.which !== 3 && $(e.target).parents('.GalMenu').length < 1 && settings.click_to_close) {
                        $this.find('.GalMenu').stop(true, false).animate({
                            opacity: 0
                        },
                        {
                            duration: 100,
                            queue: false,
                            complete: function() {
                                $(this).css('display', 'none').find('.active').removeClass('active').next().stop(true, true).slideUp('normal')
                            }
                        });
                        $(".circle").removeClass("open");
                        $("#overlay").hide();
                        $(".GalMenu").delay(400).hide(0);
                        audio.pause();
                        audio.currentTime = 0
                    }
                });
                $this.on('contextmenu',
                function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    GalMenu.getCoords(e);
                    $('.GalMenu_close_me').stop(true, false).animate({
                        opacity: 0
                    },
                    {
                        duration: 100,
                        queue: false,
                        complete: function() {
                            $(this).css('display', 'none')
                        }
                    });
                    var audio = $("#audio")[0];
                    var add = 150;
                    var top = Coords.clientY - add,
                    left = ($('body')[0] === e.target) ? Coords.clickX - add: Coords.clientX - add;
					//防止菜单超出可见区域，不需要可注释掉
                    var bodyHe= document.documentElement.clientHeight;
                    var bodyWi = document.documentElement.clientWidth;
                    if(top