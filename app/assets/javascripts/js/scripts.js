function supportstorage() {
	if (typeof window.localStorage=='object') 
		return true;
	else
		return false;		
}

function handleSaveLayout() {
	var e = $(".demo").html();
	if (!stopsave && e != window.demoHtml) {
		stopsave++;
		window.demoHtml = e;
		saveLayout(false, false);
		stopsave--;
	}
}

var layouthistory;
function saveLayout(f, save){
		var data = layouthistory;
		if (!data) {
			data = {};
			data.count = 0;
			data.list = [];
		}
		if (data.list.length > data.count) {
			for (i = data.count; i < data.list.length; i++)
				data.list[i] = null;
		}
		data.list[data.count] = window.demoHtml;
		data.count++;
		if (supportstorage()) {
			localStorage.setItem("layoutdata", JSON.stringify(data));
		}
		layouthistory = data;
    if(f == true) {
		var res = []
		var items = $('.demo .column .view')
		for (i = 0; i < items.length; i++) {
			res.push(items[i].innerHTML)
		}
		var save_button = $('#save-name');
		var name = save_button.val();

        var d = $(".demo").html();
        if (save == true){
            $(".demo .lyrow .column .box .configuration").css('right', '0px')
          //  $("#download-layout").children().html($(".demo .lyrow"));
            var t = $(".demo").children();
            t.find(".drag").remove();
            t.find(".remove").remove();            
            $(".demo .lyrow .column").removeClass("ui-sortable");
            $(".demo .lyrow  .row-fluid")
			t.find(".edit-button").remove();
            var res = []
            var items = $(".demo")
            for (i = 0; i < items.length; i++) {
                res.push(items[i].innerHTML)
            }
            var contenteditable_tags = t.find(".change-class")
            $("div.change-class *").removeAttr('contenteditable')

            t.find(".preview .configuration").remove();
            var items1 = $(".demo");
            var res1 = []

            for (i = 0; i < items1.length; i++) {                
                res1.push(items1[i].innerHTML)
            }
            form_data = new FormData();
            form_data.append("layout_with_buttons",  res.join());
            form_data.append("layout_without_edit_button",  res1.join());
            form_data.append("name", name);

        } else {
            form_data = new FormData();
            var demoData = $(".demo").html();
            form_data.append("html",  demoData);
            form_data.append("name", name);
        }


        $.ajax({
            method: "POST",
            url: "/component/save_component",
            data: form_data,
            dataType: 'html',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
				$('#saveModal').modal('hide');
                if(save == true){
                    clearDemo();
                    $(".demo").append(d);
                    $('#elmComm').append(data);
                    $('#elmComm').hide("fast");
                    $('#elmComm').show("fast");
                }
                draggable_init();
			},
			error: function(){
				$('#error-msg').show();
			}
		});
	}
}

function updateComponent(){
    var data = layouthistory;
    if (!data) {
        data = {};
        data.count = 0;
        data.list = [];
    }
    if (data.list.length > data.count) {
        for (i = data.count; i < data.list.length; i++)
            data.list[i] = null;
    }
    data.list[data.count] = window.demoHtml;
    data.count++;
    if (supportstorage()) {
        localStorage.setItem("layoutdata", JSON.stringify(data));
    }
    layouthistory = data;

        var res = []
        var items = $('.demo .column .view')
        for (i = 0; i < items.length; i++) {
            res.push(items[i].innerHTML)
        }
        var save_button = $('#save-name');
        var name = save_button.val();

        var d = $(".demo").html();

            $(".demo .lyrow .column .box .configuration").css('right', '0px')
            //  $("#download-layout").children().html($(".demo .lyrow"));
            var t = $(".demo").children();
            t.find(".drag").remove();
            t.find(".remove").remove();
            $(".demo .lyrow .column").removeClass("ui-sortable");
            $(".demo .lyrow  .row-fluid")
            t.find(".edit-button").remove();
            var res = []
            var items = $(".demo")
            for (i = 0; i < items.length; i++) {
                res.push(items[i].innerHTML)
            }
            var contenteditable_tags = t.find(".change-class")
            $("div.change-class *").removeAttr('contenteditable')

            t.find(".preview .configuration").remove();
            var items1 = $(".demo");
            var res1 = []

            for (i = 0; i < items1.length; i++) {
                res1.push(items1[i].innerHTML)
            }
            form_data = new FormData();
            form_data.append("layout_with_buttons",  res.join());
            form_data.append("layout_without_edit_button",  res1.join());
            form_data.append("name", name);
        $.ajax({
            method: "POST",
            url: "/component/update_component",
            data: form_data,
            dataType: 'html',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $('#saveModal').modal('hide');
                    clearDemo();
                    $(".demo").append(d);
                draggable_init();
            },
            error: function(){
                $('#error-msg').show();
            }
        });
}


function downloadLayout(){
	$.ajax({
		type: "POST",
		url: "/build/download",
		data: { layout: $('#download-layout').html() },
		success: function(data){
			document.location.href = "/build/download_file/zip";
		}
	});
}

function downloadHtmlLayout(){
	$.ajax({
		type: "POST",
		url: "/build/download",
		data: {layout: $('#download-layout').html()},
		success: function (data) {
			document.location.href = "/build/download_file";
		}
	});
}

function loginPage(){

	$.ajax({
		type: "GET",
		url: "/users/sign_in",
		data: {    },
		success: function(data) { window.location.href = '/ld/download'; }
	});
}

function undoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.count<2) return false;
		window.demoHtml = data.list[data.count-2];
		data.count--;
		$('.demo').html(window.demoHtml);
		if (supportstorage()) {
			localStorage.setItem("layoutdata",JSON.stringify(data));
		}
		return true;
	}
	return false;
	/*$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			undoOperation(data);
		}
	});*/
}

function redoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.list[data.count]) {
			window.demoHtml = data.list[data.count];
			data.count++;
			$('.demo').html(window.demoHtml);
			if (supportstorage()) {
				localStorage.setItem("layoutdata",JSON.stringify(data));
			}
			return true;
		}
	}
	return false;
	/*
	$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			redoOperation(data);
		}
	});*/
}

function handleJsIds() {
	handleModalIds();
	handleAccordionIds();
	handleCarouselIds();
	handleTabsIds()
}
function handleAccordionIds() {
	var e = $(".demo #myAccordion");
	var t = randomNumber();
	var n = "accordion-" + t;
	var r;
	e.attr("id", n);
	e.find(".accordion-group").each(function(e, t) {
		r = "accordion-element-" + randomNumber();
		$(t).find(".accordion-toggle").each(function(e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r)
		});
		$(t).find(".accordion-body").each(function(e, t) {
			$(t).attr("id", r)
		})
	})
}
function handleCarouselIds() {
	var e = $(".demo #myCarousel");
	var t = randomNumber();
	var n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function(e, t) {
		$(t).attr("data-target", "#" + n)
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n)
}
function handleModalIds() {
	var e = $(".demo #myModalLink");
	var t = randomNumber();
	var n = "modal-container-" + t;
	var r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n)
}
function handleTabsIds() {
	var e = $(".demo #myTabs");
	var t = randomNumber();
	var n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function(e, t) {
		var n = $(t).attr("id");
		var r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
	})
}
function randomNumber() {
	return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e)
}
function gridSystemGenerator() {
	$(".lyrow .preview input").bind("keyup", function() {
		var e = 0;
		var t = "";
		var n = $(this).val().split(" ", 12);
		$.each(n, function(n, r) {
			e = e + parseInt(r);
			t += '<div class="col-md-' + r + ' column"></div>'
		});
		if (e == 12) {
			$(this).parent().next().children().html(t);
			$(this).parent().prev().show()
		} else {
			$(this).parent().prev().hide()
		}
	})
}
function configurationElm(e, t) {
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}
function removeElm() {
	$(".demo").delegate(".remove", "click", function(e) {
		e.preventDefault();
		$(this).parent().remove();
		if (!$(".demo .lyrow").length > 0) {
			clearDemo()
		}
	})
}
function clearDemo() {
    console.log("FFFFFFFFFFFFFFFFFFF");
	$(".demo").empty();
	layouthistory = null;
	if (supportstorage())
		localStorage.removeItem("layoutdata");
}
function removeMenuClasses() {
	$("#menu-layoutit li button").removeClass("active")
}
function changeStructure(e, t) {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}
function cleanHtml(e) {
	$(e).parent().append($(e).children().html())
}
function downloadLayoutSrc() {
	var e = "";
	$("#download-layout").children().html($(".demo").html());
	var t = $("#download-layout").children();
	t.find(".preview, .configuration, .drag, .remove").remove();
	t.find(".lyrow").addClass("removeClean");
	t.find(".box-element").addClass("removeClean");
	t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".removeClean").remove();
	$("#download-layout .column").removeClass("ui-sortable");
	$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
	if ($("#download-layout .container").length > 0) {
		changeStructure("row-fluid", "row")
	}
	formatSrc = $.htmlClean($("#download-layout").html(), {
		format: true,
		allowedAttributes: [
			["id"],
			["class"],
			["data-toggle"],
			["data-target"],
			["data-parent"],
			["role"],
			["data-dismiss"],
			["aria-labelledby"],
			["aria-hidden"],
			["data-slide-to"],
			["data-slide"]
		]
	});
	$("#download-layout").html(formatSrc);
	$("#downloadModal textarea").empty();
	$("#downloadModal textarea").val(formatSrc)
}

var currentDocument = null;
var timerSave = 1000;
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;
$(window).resize(function() {
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160)
});

function restoreData(){
	if (supportstorage()) {
		layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
		if (!layouthistory) return false;
		window.demoHtml = layouthistory.list[layouthistory.count-1];
		if (window.demoHtml) $(".demo").html(window.demoHtml);
	}
}

function initContainer(){
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		stop: function(e,t) {
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	playVideo();
    $("body").addClass("edit");
	configurationElm();
}

function passDataToModel(element, data){
	$('#changeModal').modal('show');
	$("#changeModal textarea").val(data);
}
function openEditablePopup(element){
	passDataToModel('changeModal', $(element).find('.change-class')[0].innerHTML);
	window.editing = element;
}

function draggable_init(){
	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			$(".demo .column").sortable({
				opacity: .35,
				connectWith: ".column",
				start: function(e,t) {
					if (!startdrag) stopsave++;
					startdrag = 1;
				},
				stop: function(e,t) {
					if(stopsave>0) stopsave--;
					startdrag = 0;
				}
			});
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function() {
            $(".demo #editComponent").hide();
			playVideo();
			handleJsIds();
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	$(".sidebar-nav .custom").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function() {
            $(".demo #editComponent").hide();
			playVideo();
			handleJsIds();
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	initContainer();
}


function ShowDef(element){
  if(element.parents(".sidebar-nav").attr('class') == 'sidebar-nav'){
	document.getElementById("messageBox").style.display="block";
	var customElement = element.clone();
	customElement.find('.remove').remove();
	customElement.find('.drag').remove();
	customElement.find('.preview').remove();
	customElement.find('.edit-button').remove();
	  window.test = customElement;
	$('#messageBox').html(customElement);
	$('#messageBox').css("position",'relative');
	$('#messageBox').css("top","-350px");
	$('#messageBox').css("left","0px");
	$('#messageBox').css("z-index", "1");
  }
}
function HideDef(){
	document.getElementById("messageBox").style.display="none";
}

function playVideo(){
	var video = $(".video-flash-player");
	for(i =0; i < video.length; i++){
		if ($(video[i]).parents(".sidebar-nav").attr('class') != 'sidebar-nav'){
			video[i].play();
		}
	}
}

function openContainerWithSelectedComponent(d){
    var id = $(d).find('#component_id')[0].innerHTML
    $.ajax({
        async: false,
        url: '/container_comp/'+id,
        method: 'GET',
        success: function(data){
            document.location.href = '/component_display/';
        }
    });
}

$('#editComponent').click(function(){
    openContainerWithSelectedComponent();
});


$(document).ready(function() {
    $('#saveModal').on('hidden.bs.modal', function () {
        $('#save-name').val('');
        $('#error-msg').hide();
    });
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
	if ($(".mr20").length == 1){
		$(".login-button").hide();
	}
	draggable_init();
	$('body.edit .demo').on("click","[data-target=#editorModal]",function(e) {
		e.preventDefault();
		currenteditor = $(this).parent().parent().find('.view');
		var eText = currenteditor.html();
		//contenthandle.setData(eText);
	});
	$("#savecontent").click(function(e) {
		e.preventDefault();
		currenteditor.html(contenthandle.getData());
	});
	$("[data-target=#downloadModal]").click(function(e) {
		e.preventDefault();
		downloadLayoutSrc();
	});
	$("[data-target=#changeModal]").click(function(e) {
		e.preventDefault();
		//downloadLayoutSrc();
	});
	$("#home").click(function(e){
		location.href = "/"
	});
	$("#change").click(function(e){
		var d = $("#changeModal textarea").val();
		var item = $(editing).find('.change-class')[0];
		item.innerHTML = d;
		$('#changeModal').modal('hide');
	});
	$("[data-target=#shareModal]").click(function(e) {
		e.preventDefault();
		handleSaveLayout();
	});
	$("#download").click(function() {
		downloadLayout();
		return false;
	});
	$("#downloadhtml").click(function() {
		downloadHtmlLayout();
		return false
	});
	$("#downloadhtmlzip").click(function() {
		downloadLayout();
		return false;
	});
	$("#edit").click(function() {
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
        $(".nav-side-menu").show();
        $("body").css("margin-left", '0px');
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#clear").click(function(e) {
		e.preventDefault();
		clearDemo()
	});
	$("#devpreview").click(function() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#sourcepreview").click(function() {
        //$("body").css("margin-left", -$(".nav-side-menu").width())
        //$("body").removeClass("edit");
        //$(".nav-side-menu").hide();
        //$("body").addClass("devpreview sourcepreview");
        //removeMenuClasses();
       // $(this).addClass("active");
        window.open('/preview');
		return false
	});
	$("#fluidPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container-fluid");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$("#fixedPage").click(function(e) {
		e.preventDefault();
		changeStructure("container-fluid", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$(".nav-header").click(function() {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown()
	});
	$('#undo').click(function(){
		stopsave++;
		if (undoLayout()) initContainer();
		stopsave--;
	});
    $('#save').click(function(){
        saveLayout(true , true);
	});
    $('#update').click(function(){       
        updateComponent();
	});
    $('#savewithoutmodal').click(function(){
        saveLayout(true , false);
	});
    $('#login').click(function(){
        loginPage()
	});
	$('#redo').click(function(){
		stopsave++;
		if (redoLayout()) initContainer();
		stopsave--;
	});
	removeElm();
	gridSystemGenerator();
})