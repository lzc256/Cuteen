


MathJax = {
	options: {
		renderActions: {
			addMenu: [0, '', '']
		}
	},
	tex: {
		inlineMath: [
			['$', '$'],
			['\\(', '\\)']
		]
	},
	svg: {
		fontCache: 'global',
		scale: 0.97,
		minScale: 0.6
	}
}

if (CUTEEN_SETTING.NOPA) {
((function() {
	var callbacks = [],
		timeLimit = 50,
		open = false;
	setInterval(loop, 1);
	return {
		addListener: function(fn) {
			callbacks.push(fn);
		},
		cancleListenr: function(fn) {
			callbacks = callbacks.filter(function(v) {
				return v !== fn;
			});
		}
	}
  
	function loop() {
		var startTime = new Date();
		debugger;
		if (new Date() - startTime > timeLimit) {
			if (!open) {
				callbacks.forEach(function(fn) {
					fn.call(null);
				});
			}
			open = true;
			window.stop();
			alert('大佬别扒了！');
			document.body.innerHTML = "";
		} else {
			open = false;
		}
	}
  })()).addListener(function() {
	window.location.reload();
  }); 
}



function isScrollTop() {
	return $(document).scrollTop() <= 60
}
$(function () {
	isScrollTop() ? addTopNav() : removeTopNav();
	$(window).scroll(function () {
		isScrollTop() ? addTopNav() : removeTopNav();
	});
	function addTopNav() {
		$('.nav').addClass('nobg').removeClass('hasbg');
	}
	function removeTopNav() {
		$('.nav').removeClass('nobg').addClass('hasbg');
	}
});

function switchNightMode() {
	$('<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><svg class="icon yueliang" aria-hidden="true"><use xlink:href="#icon-yueliang"></use></svg><svg class="icon taiyang" aria-hidden="true"><use xlink:href="#icon-taiyang1-copy-copy"></use></svg></div></div>').appendTo($("body"))
	$(".DarkMode").length > 0 ? ($('.yueliang').css('display', 'block'), $('.taiyang').css('display', 'none')) : ($('.taiyang').css('display', 'block'), $('.yueliang').css('display', 'none')), setTimeout(function () {
		var DarkMode = document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
		(DarkMode == '0') ? (setTimeout("$('html').addClass('DarkMode'),$('.taiyang').css('display','none'),$('.yueliang').css('display','block')", 900), document.cookie = "DarkMode=1;path=/", console.log('夜间模式开启'), $('#modeicon').attr("xlink:href", "#icon-sun")) : (setTimeout("$('html').removeClass('DarkMode'),$('.yueliang').css('display','none'),$('.taiyang').css('display','block')", 900), document.cookie = "DarkMode=0;path=/", console.log('夜间模式关闭'), $('#modeicon').attr("xlink:href", "#icon-_moon"))
			, setTimeout(function () {
				$(".Cuteen_DarkSky").fadeOut(1e3, function () {
					$(this).remove()
				})
			}, 2e3)
	}), 50
}




function checkNightMode() {
	if (CUTEEN_SETTING.THEME_COLOR == '2') {
		$("html").addClass("DarkMode");
		return;
	}
	else if (CUTEEN_SETTING.THEME_COLOR == '1') {
		$("html").removeClass("DarkMode");
		return;
	}
	if (CUTEEN_SETTING.THEME_COLOR == '0' && document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
		if (new Date().getHours() >= 20 || new Date().getHours() < 6) {
			$("html").addClass("DarkMode");
			document.cookie = "DarkMode=1;path=/";
			console.log('夜间模式开启');
		} else {
			$("html").removeClass("DarkMode");
			document.cookie = "DarkMode=0;path=/";
			console.log('夜间模式关闭');
		}
	} else {
		var DarkMode = document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
		if (DarkMode == '0') {
			$("html").removeClass("DarkMode");

		} else if (DarkMode == '1') {
			$("html").addClass("DarkMode");

		}
	}
} checkNightMode()




function ajaxnext() {
	$('.next').addClass("btn lan").click(function () {
		$this = $(this);
		$this.addClass('loading').text('正在努力加载');
		var href = $this.attr('href');
		if (href != undefined) {
			$.ajax({
				url: href,
				type: 'get',
				error: function (request) { },
				success: function (data) {
					$this.removeClass('loading').text('点击查看更多');
					var $res = $(data).find('.ajaxcard');
					$('#BLOG_CARD').append($res.fadeIn(500));
					var newhref = $(data).find('.next').attr('href');
					if (newhref != undefined) {
						$('.next').attr('href', newhref);
					} else {
						$('.next').remove();
					}
					
				}

			});
		}
		return false;
	});
}






function upstar() {
	a = $('.like').attr('data-pid');
	i = $.cookie('upstar');
	if (i == a) return $('.like').addClass("done"),
		iziToast.show({
			title: "您已经点过赞啦",
			class: 'noshadow',
			position: 'topRight',
			backgroundColor: 'var(--mzi)',
			titleColor: 'var(--bai)',
			iconColor: '#ffffff',
			progressBarColor: '#ffffff',
			icon: 'fa fa-grin-alt',
			timeout: 5000
		});
	$.post('action/like', { cid: a },
		function () {
			$.cookie('upstar', a, { expires: 7 });
			$('.like').find('span.likeCount').text(parseInt($('.like').find('span.likeCount').text()) + 1)
			iziToast.show({
				title: "点赞成功！感谢支持~",
				class: 'noshadow',
				position: 'topRight',
				backgroundColor: 'var(--mlv)',
				titleColor: 'var(--bai)',
				iconColor: '#ffffff',
				progressBarColor: '#ffffff',
				icon: 'fa fa-check',
				timeout: 5000
			});
		}
	);

}



function AjaxComment() {
	$('#comment-form').submit(function (event) {
		var commentdata = $(this).serializeArray();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: commentdata,
			beforeSend: function () {
				$('#comment-submit-button').css('display', 'none');
				$('#commenting').css('display', 'block');
			},
			error: function () {
				iziToast.error({
					title: '评论失败',
					message: '发生了未知错误，请刷新后重试',
					position: 'topRight',
				})
				$('#commenting').css('display', 'none');
				$('#comment-submit-button').css('display', 'none');
			},
			success: function (data) {
				$('#commenting').css('display', 'none');
				$('#comment-submit-button').css('display', 'unset');
				var error = /<title>Error<\/title>/;
				if (error.test(data)) {
					var text = data.match(/<div(.*?)>(.*?)<\/div>/i);
					var str = '发生了未知错误，请刷新后重试';
					if (text != null) str = text[2];
					iziToast.error({
						title: '评论失败',
						message: str,
						position: 'topRight',
					})
				} else {
					//评论框复位（清空文本，刷新高度）
					$('#textarea').val('');
					$('#textarea').css('height', '');
					//评论框复位（取消回复）
					if ($('#cancel-comment-reply-link').css('display') != 'none') $('#cancel-comment-reply-link').click();
					var target = '#comments',
						parent = true;
					$.each(commentdata, function (i, field) {
						if (field.name == 'parent') parent = false;
					});
                    /*                         if (!parent || !$('div.All_Pagination .prev').length) {
                                                var latest = -19260817;
                                                $('#comments', data).each(function() {
                                                    var id = $(this).attr('id'),
                                                        coid = parseInt(id.substring(8));
                                                    if (coid > latest) {
                                                        latest = coid;
                                                        target = '#' + id;
                                                    }
                                                });
                                            } */
					//获取新ID

					if ($('.All_Pagination .prev').length && !parent) {
						var dd = $(".prev a").attr("href"); //获取上页地址
						$(".prev a").attr("href", ""); //将地址清空
						dd = dd.replace(/comment-page-(.*?)#comments/, "comment-page-1#comments"); //将获取的地址页码改为1
						$(".prev a").attr("href", dd); //将地址放回去
						$('.prev a').get(0).click(); //点击这个超链接
					} else {

						new_id = '';
						// $('#commentcontent').html($('#commentcontent', data).html());

					} //判断当前评论列表是否在第一页,并且只会在母评论时候才会生效 */

					new_id = $(".comment-list", data).html().match(/id=\"?comment-\d+/g).join().match(/\d+/g).sort(function (a, b) {
						return a - b
					}).pop();
					$('#commentcontent').html($('#commentcontent', data).html()); //更新评论列表
					//下面是重载函数以及评论成功提示
					iziToast.success({
						title: '评论成功',
						message: '您的留言已收到',
						position: 'topRight'
					})
					//跳转到新ID
					if (new_id) {
						var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
						$body.animate({
							scrollTop: $('#comment-' + new_id).offset().top - 100
						}, 500);
					} else {
						$body.animate({
							scrollTop: $('#comments').offset().top - 100
						}, 500);
					}
				}
			}
		});
		return false;
	});
}AjaxComment()

function Entersearch() {
	$('#searchNameAccept').keydown(function (event) {
		if (event.keyCode == 13) {
			$('#searchbtn').trigger("click");
		}
	});
}

function startSearch(usePjax = false) {
	var c = $("#searchbox input").val();
	if (!c || c == "") {
		$("#searchbox input").attr("placeholder", "你还没有输入任何信息");
		return;
	}
	var t = CUTEEN_SETTING.SITE_URL + '/search/' + c;
	if (usePjax) {
		$.pjax({
			url: t,
			container: '#pjax',
			fragment: '#pjax',
			timeout: 8000,
		})
		$('#searchbox').iziModal('close')
	} else {
		window.open(t, "_self");
	}
}






$(function () {

	$(`.mobzk`).on(`click`, function (event) {
		var $this = $(this);
		$this.closest(`#nav`).find(`.mobzkcon`).slideToggle(300);
		if ($this.closest(`.mobfl`).hasClass(`active`)) {
			$this.closest(`.mobfl`).removeClass(`active`);
		} else {
			$this.closest(`.mobfl`).addClass(`active`);
		}
		event.preventDefault();
	});


});

function BackTOP() {
	$("#btn").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(window).scrollTop() > 50) {
				$("#btn").fadeIn(200);
			} else {
				$("#btn").fadeOut(200);
			}
		});
		$("#btn").click(function () {
			$('body,html').animate({
				scrollTop: 0
			},
				500);
			return false;
		});
	});
	$(function () {
		$("#say").click(function () {
			$('body,html').animate({
				scrollTop: $('html, body').get(0).scrollHeight
			},
				500);
			return false;
		});
	})
}

function MainToc() {
	if ($("#right-menu").length > 0) {
		var headerEl = 'h2,h3,h4,h5',
			content = '.duta';
		tocbot.init({
			tocSelector: '#MENU',
			contentSelector: content,
			headingSelector: headerEl,
			headingsOffset: 70
		});
	}
}


function mobilebar() {
	$('#left-menu').on('click', function () {
		$("#mobar").toggleClass("leftopen");
		$("body").toggleClass("mobile-nav-open")
	});
} mobilebar()


/* 折叠面板 */
function Acc() {
	if ($(".allpost").length > 0) {
		$(".allpost .accordion-thumb").last().addClass("lastyj");
		$(".allpost .accordion-thumb").first().addClass("firstyj");
		$(".allpost .accordion-item").first().addClass("open");
	};
	$(".accordion > .accordion-item.open").children(".accordion-panel").slideDown();
	$(".accordion > .accordion-item ").click(function () {
		$(this).siblings(".accordion-item").removeClass("open").children(".accordion-panel").slideUp();
		$(this).toggleClass("open").children(".accordion-panel").slideToggle("ease-out");
	});
}

/*TAB*/
function Tab() {
	$(".tabs-item:first").addClass("active");
	$(".tabs-content:first").addClass("active");
	$(".tabs-item").click(function () {
		$(this).addClass("active");
		$(this).siblings(this).removeClass("active");
		$(".tabs-content").siblings(".tabs-content").removeClass("active");
		$(".tabs-content").eq($(this).index()).addClass("active");
	});
}
function qjcbl() {
	if ($("#sidebar").length > 0) {
		(new SidebarFollow()).init({
			element: jQuery('.sidebar-2'),
			prevElement: jQuery('.sidebar-1'),
			distanceToTop: 60
		});
	};
}qjcbl()
function owo() {
	if ($(".OwO666").length > 0) {
		var OwO_demo = new OwO({
			logo: 'OwO666',
			container: document.getElementsByClassName('OwO')[0],
			target: document.getElementsByClassName('textarea')[0],
			api: CUTEEN_SETTING.STATIC_PATH + 'Static/Func/OwO/OwO.json',
			position: 'down',
			width: '100%',
			maxHeight: '250px'
		})
	};
}

function CodeLine() {
	if (typeof Prism !== 'undefined') {
		var pres = document.getElementsByTagName('pre');
		for (var i = 0; i < pres.length; i++) {
			if (pres[i].getElementsByTagName('code').length > 0)
				pres[i].className = 'line-numbers';
		}
		Prism.highlightAll(true, null);
	}
}
CodeLine()

$(function () {
	Acc()
	Tab()
	owo()
	MainToc()
	BackTOP()
	if (CUTEEN_SETTING.AJAX_PAGE || CUTEEN_SETTING.IS_MOBILE) {
		ajaxnext();
	}


	if ($("#searchbox").length > 0) {
		if (!CUTEEN_SETTING.IS_MOBILE) {
			$('#searchbox').iziModal({
				title: '搜索内容',
				headerColor: 'var(--mlv)',
				background: '#fff',
				width: '50%',
			})
		} else {
			$('#searchbox').iziModal({
				title: '搜索内容',
				headerColor: 'var(--mlv)',
				background: '#fff',
				width: '100%',
			})
		}
	};

})

function Pjaxreload() {
	
	
	qjcbl();
	ajaxnext();
	CodeLine();
	Acc();
	Tab();
	BackTOP();
	owo();
	MainToc();
	//if ($("#comments").length > 0) {
		AjaxComment();
	//};
}