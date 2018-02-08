$(function(){

    //左边导航鼠标悬停
    var allList = $(".selectable");
	for(var i=0;i<allList.length;i++){
		allList[i].index = i;
		
		$(allList[i]).click(function(){
			var div_name = $(this).children().attr("class");
			//var h = $(div_name).offset().top;
			$('html, body').animate({  
				scrollTop: $(div_name).offset().top-162
			}, 500);  			
			//console.log(h);
		});
		$(allList[i]).mouseover(function(e) {  
			addNavStyle(this.index,allList);
		});
		$(allList[i]).mouseout(function(e) {  
			removeNavStyle(this.index,allList);
		}); 
	};
	
    //向下滚动左侧导航固定位置
	
	var left_height = $("#left_list").width()+30;  //固定
	//确定右边内容的宽度
	var nav_width_first = $("#content1").width()*0.95-left_height-10;
	console.log(nav_width_first);
	$(".b_right").css("width",nav_width_first+"px");

	//当浏览器宽度变化的时候，改变内容的宽度
	$(window).resize(checkRightWidth);
    $(window).scroll(function(){
        var nav_height = $(".top").height() + $(".b_title").height();
        var height = $(window).scrollTop();
		$("#hide_box").css("width",left_height+"px");

    });

   


	//dataTable
	//无排序的表格
	$('.table_basic').DataTable({
		
		"paging":   false,
		"info":     false,
		"ordering": false,
		"searching":false,
		"sScrollX": "100%",
		"sScrollXInner": "100%", 
	});  
	
	
    for(var i=0 ; i<p_n.length;i++){
		var name = p_n[i];
		$("."+name+" .carousel").jCarouselLite({
			btnNext: "."+name+" .next",
			btnPrev: "."+name+" .prev",
			mouseWheel: true,
			circular: false,
			visible: 1,
			afterEnd: function(){
				var style = $(this).attr("style").split(";");
				var len = style.length;
				var left = style[len-2];
				
				var re = /\d+/g;
				var num = re.exec(left)[0];
				var num = num/480+1;

				var name = $(this).attr("class");
				$("#"+name).text(num);
			}
		});
	}
	$("a#examplex").fancybox({
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over"><font color="white">' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</font></span>';
		}		
	});		
	
	//
	$(".next").click(function(){
		
	});
});
//加载流程图
$(function(){

	var nodeData=
	{
		'QC':{id:"youcan_001"},
		'Density':{id:"youcan_002"},
		'Saturation':{id:"youcan_003"},
		"SNP_INDEL":{id:"youcan_004"},
		"Assemble":{id:"youcan_005"},
		"AS":{id:"youcan_006"},
		"Novel":{id:"youcan_007"},
		"DE":{id:"youcan_008"},
		"PPI":{id:"youcan_009"},
		"GO":{id:"youcan_010"},
		"KEGG":{id:"youcan_011"}
	};

	//
	var nomalColor="rgb(142,217,255)";   //选择的模块颜色
	var unselectedColor="lightgray";     //没选的模块
	var finishedColor="rgb(2,121,177)";  //跑完的颜色



	var arrowColor="rgb(100,100,100)";
	var nodeNameColor="rgb(255,255,255)";
	var nodeBorderColor="rgb(167,167,167)";


	var $ = go.GraphObject.make;  // for conciseness in defining templates
	//	var diagram = new go.Diagram("myDiagramDiv");

	diagram =$(go.Diagram, "myDiagramDiv",
		 {
          initialContentAlignment: go.Spot.Center,
          allowDrop: false,  // must be true to accept drops from the Palette
          "animationManager.duration": 800, // slightly longer than default (600ms) animation
          "undoManager.isEnabled": false  // enable undo & redo
        });	
	
	//节点的样式
		diagram.nodeTemplate =
			$(go.Node, "Auto",

				new go.Binding("location", "loc", go.Point.parse),
			    $(go.Shape, "RoundedRectangle",
			   		{ fill: nomalColor ,
					parameter1: 5,  // the corner has a large radius
					stroke:nodeBorderColor,
					},
					new go.Binding("fill", "color")
				),     
										
			  	{
					selectionAdornmentTemplate:
					$(go.Adornment, "Auto",
						$(go.Shape, "RoundedRectangle",
						{ fill: null, stroke: nomalColor, strokeWidth: 1 }),
						$(go.Placeholder)
					)  // end Adornment
			 	 },
				
				$(go.TextBlock,{ font: "bold 14px sans-serif",
								stroke: nodeNameColor,
								margin: 10 },
					new go.Binding("text", "key"))
			);

		
	//连线的样式
		diagram.linkTemplate =
		  $(go.Link,  // the whole link panel
			{ curve: go.Link.Bezier, reshapable: true },
			// don't need to save Link.points, so don't need TwoWay Binding on "points"
			new go.Binding("curviness", "curviness").makeTwoWay(),  // but save "curviness" automatically
			$(go.Shape,  // the link shape
			  { strokeWidth: 2 ,stroke:arrowColor }),
	//		  new go.Binding("stroke", "color"),
			$(go.Shape,  // the arrowhead
			  { toArrow: "standard", stroke: null, fill:arrowColor })
		  );  
        
            var nodeDataArray = [
                        {key: "基本质控", loc:"0 0", color:finishedColor},
                        {key: "序列比对", loc:"-1 100", color:finishedColor},
                        {key: "高级质控", loc:"150 100", color:finishedColor},
                        {key: "SNP和InDel检测", loc:"123 200", color:finishedColor},
                        {key: "转录本组装", loc:"-7 200", color:finishedColor},
                        {key: "可变剪接分析", loc:"-150 200", color:finishedColor},
                        {key: "差异表达分析", loc:"-15 300", color:finishedColor},
                        {key: "蛋白质互作分析", loc:"-165 400", color:finishedColor},
                        {key: "GO富集分析", loc:"-13 400", color:finishedColor},
                        {key: "KEGG富集分析", loc:"135 400", color:finishedColor}
		  ];
            

        var linkDataArray = [
        {from: "基本质控", to:"序列比对", "curviness":0},
        {from: "序列比对", to:"高级质控", "curviness":0},
        {from: "高级质控", to:"SNP和InDel检测", "curviness":0},
        {from: "序列比对", to:"转录本组装", "curviness":0},
        {from: "转录本组装", to: "可变剪接分析", "curviness":0},
        {from: "转录本组装", to: "差异表达分析", "curviness":0},
        {from: "差异表达分析", to: "蛋白质互作分析", "curviness":-20},
        {from: "差异表达分析", to: "GO富集分析", "curviness":0},
        {from: "差异表达分析", to: "KEGG富集分析", "curviness":20}
      ];

    
	 diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);	
});


//左边导航的滚动监听
$(function(){

    $(window).scroll(function(){
        var top = $(document).scrollTop();
        var list = $(".selectable");           //定义变量，左边导航          //定义变量，获取滚动条的高度
        var p_list = $(".r_part_box");    //定义变量，查找.item

		//滚动时导航变化
		p_list.each(function(i){  
			var m = p_list[i];  
			var p_listTop = m.offsetTop-162;
			var h=$(m).parent().height();
            var top1 = 0;   
            
			if (typeof(top) == "object"){
				top1 = top.scrollY;
			}else{
				top1 = top;	
			};  
                
			if(  p_listTop-2 < top1 && top1< (p_listTop+h+30)){
				$(".selectable.active").removeClass("active");
				$(list[i]).addClass("active");
			};

		});
    });
});
//===========================函数========================

//左边导航的控制
function addNavStyle(i,allList){
	$(allList[i]).attr("style","background:#fff");
};
function removeNavStyle(i,allList){
	$(allList[i]).attr("style","");
};
//改变右边报告主体内容的宽度
function checkRightWidth(){
	var left_height = $("#left_list").width()+30;  //固定
	//left_height
	var nav_width = $("#content1").width()*0.99-left_height-10;
	$(".b_right").css("width",nav_width+"px");
};
