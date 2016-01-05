var PersonalData = function(){};

/**
语言使用
name: 语言
time: 使用时长 单位月
*/
Object.defineProperty(PersonalData,"skillsData_languages",{
	value:[
		{name:"java",time:14},
		{name:"javscript",time:18},
		{name:"node.js",time:12},
		{name:"html",time:18},
		{name:"flex",time:3},
		{name:"python",time:1},
		{name:"c",time:1},
		{name:"shell",time:3},
		{name:"mongodb",time:6}
	]
})

Object.defineProperty(PersonalData,"getSkillDataOfLanguages",{
	value:function(){
		return PersonalData.skillsData_languages;
	}
})

/*
*框架使用
name:框架名称  level掌握情况,分为以下几等:
1 ： 了解
2 ： 熟悉
3 ： 熟练
4 ： 精通
*/

Object.defineProperty(PersonalData,"skillsData_framework",{
	value:[
		{name:"struts2",level:2},
		{name:"spring3",level:2},
		{name:"Mybaties",level:1},
		{name:"Meteor(nodejs)",level:4},
		{name:"d3",level:1},
		{name:"jquery",level:3},
		{name:"Bootstrap",level:2},
		{name:"fastjsonweb",level:4},
		{name:"angularjs",level:2}
	]
})

Object.defineProperty(PersonalData,"getSkillDataOfFramework",{
	value:function(){
		return PersonalData.skillsData_framework;
	}
})

/*
*开发工具使用
name:工具名称,level 使用情况,同上.
*/
Object.defineProperty(PersonalData,"skillsData_tools",{
	value:[
		{name:"git",level:3},
		{name:"sublime",level:3},
		{name:"vim",level:2},
		{name:"eclipse",level:3},
		{name:"nodepad++",level:3},
		{name:"LibreOffice Draw",level:2}
	]
});

Object.defineProperty(PersonalData,"getSkillDataOfTools",{
	value:function(){
		return PersonalData.skillsData_tools;
	}
})

/*
*项目经验
*注意desc需要与语言配置部分相同
*/
Object.defineProperty(PersonalData,"skillsData_project",{
	value:[
		{
			company:"company_1",
			projects:[{
				name:"project_1_title",
				time:"project_1_time",
				env:"project_1_env",
				framework:"project_1_framework",
				coder:"project_1_coder",
				desc:"project_1_desc",
				task:"project_1_task"
				
			},{
				name:"project_2_title",
				time:"project_2_time",
				env:"project_2_env",
				framework:"project_2_framework",
				coder:"project_2_coder",
				desc:"project_2_desc",
				task:"project_2_task"
				
			}]
		},{
			company:"company_2",
			projects:[{
				name:"project_3_title",
				time:"project_3_time",
				env:"project_3_env",
				framework:"project_3_framework",
				coder:"project_3_coder",
				desc:"project_3_desc",
				task:"project_3_task"
				
			},{
				name:"project_4_title",
				time:"project_4_time",
				env:"project_4_env",
				framework:"project_4_framework",
				coder:"project_4_coder",
				desc:"project_4_desc",
				task:"project_4_task"
				
			}]
		},{
			company:"company_3",
			projects:[{
				name:"project_5_title",
				time:"project_5_time",
				env:"project_5_env",
				framework:"project_5_framework",
				coder:"project_5_coder",
				desc:"project_5_desc",
				task:"project_5_task"
			}]
		}
	]
});

Object.defineProperty(PersonalData,"getSkillDataOfProject",{
	value:function(){
		return PersonalData.skillsData_project
	}
})


Object.defineProperty(PersonalData,"favorite_website",{
	value:[
		{site:"http://stackoverflow.com",desc:"stackoverflow_desc"},
		{site:"http://it-ebooks.info",desc:"itebooksinfo_desc"},
		//{site:"http://www.csdn.net",desc:"csdn_desc"},
		{site:"http://github.com",desc:"github_desc"},
		//{site:"http://www.oschina.net",desc:"oschina_desc"}
		{site:"http://www.codecademy.com/",desc:"codecademy_desc"}
	]
})

Object.defineProperty(PersonalData,"getFavoriteWebsite",{
	value:function(){
		return PersonalData.favorite_website;
	}
})

Object.defineProperty(PersonalData,"drawLanguagesChart",{
	value:function(data,seletor,setting){
		setting = setting ?	setting : {Xcoordinate:"time",Ycoordinate:"name"}
		var Xcoordinate =  setting.Xcoordinate; //X坐标的属性
		var Ycoordinate = setting.Ycoordinate;//Y坐标的属性

		var barHeight = data.length * 40;
		var yOrdinal = [];
		for(i=1;i<data.length+1;i++){
			yOrdinal.push(i);
		}
		var chart = d3.select(seletor).append("svg")
			.attr("class", "chart")
			.attr("width", "100%")
			.attr("height",barHeight+40)
			.append("g")
			.attr("transform", "translate(65,15)");//设置位移俩 可以在条形统计图上右键--审查元素。看看是实际效果
		var dataMax =  d3.max(data,function(d){return d[Xcoordinate]});
		var x = d3.scale.linear()
			.domain([0, dataMax])
			.range([0, 90]);

		var y = d3.scale.ordinal()
			.domain(yOrdinal)
			.rangeBands([0, barHeight]);

		chart.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("y",function(d,i){
				return y(i+1);
			})
			.attr("width", function(d){
				return x(d[Xcoordinate]) + "%"
			})
			.attr("height",y.rangeBand());



		chart.selectAll("text")
			.data(data)
			.enter().append("text")
			.attr("x",0)
			.attr("y", function(d,i) { return y(i+1) + y.rangeBand() / 2; })
			.attr("dx", -5) // padding-right
			.attr("dy", ".35em") // vertical-align: middle
			.attr("text-anchor", "end") // text-align: right
			.text(function(d){
				return d[Ycoordinate]
			});

		chart.selectAll("line")
			.data(x.ticks(10))
			.enter().append("line")
			.attr("x1", function(d){
				return x(d) + "%";
			})
			.attr("x2", function(d){
				return x(d) + "%";
			})
			.attr("y1", 0)
			.attr("y2", barHeight)
			.style("stroke", "#ccc");

		chart.selectAll(".rule")
			.data(x.ticks(10))
			.enter().append("text")
			.attr("class", "rule")
			.attr("x", function(d){
				return x(d) + "%";
			})
			.attr("y", barHeight)
			.attr("dy",10)
			.attr("text-anchor", "middle")
			.text(String);

		chart.append("line")
			.attr("y1", 0)
			.attr("y2", barHeight)
			.style("stroke", "#000");
		chart.append('text')
			.attr("x","91%")
			.attr("y",barHeight)
			.attr("dy",10)
			.text("month");
	}
})

Object.defineProperty(PersonalData,"drawFrameworkChart",{
	value:function(data,seletor,setting){
		setting = setting ?	setting :{Xcoordinate:"name",Ycoordinate:"level"}
		var level = ["了解","熟悉","熟练","精通"]
		var Xcoordinate =  setting.Xcoordinate; //X坐标的属性
		var Ycoordinate = setting.Ycoordinate;//Y坐标的属性
		var height = 400;
		var width = "100%";
		var chart = d3.select(seletor).append("svg")
			.attr("class", "chart")
			.attr("width", width)
			.attr("height", height+30)
			.append("g")
			.attr("transform", "translate(30,10)");//图形水平位移量
		
		var xOrdinal = [];
		for(i = 1;i < data.length+1; i++){
			xOrdinal.push(i)
		}

		var y = d3.scale.linear()
			.domain([0,4])
			.range([0, height]);

		var x = d3.scale.ordinal()
			.domain(xOrdinal)
			.rangeBands([0, 85],0.1);
		

		chart.selectAll("rect").data(data).enter().append("rect")
			.attr("x",function(d,i){
				return x(i+1)+"%"
			})//相当于function(d){return x(d);}
			.attr("y",function(d){
				//height-y(d[Ycoordinate])
				return height-y(d[Ycoordinate]); 
			})//svg的坐标以左上角为原点，同过高度运算转成原点在左下角的效果
			.attr("width",function(d){
				return x.rangeBand()+"%"
			}) //获取散列值每段的长度 为矩形的宽
			.attr("height",function(d){
				return y(d[Ycoordinate]); 
			}); // 通过函数1  function(d){return  (420/42)*d}  得到矩形的高
		
		//添加矩形上方的数字
		chart.selectAll("text")
			.data(data)
			.enter().append("text")
			.attr("x", function(d,i) { return x(i+1)+"%"; }) 
			.attr("y",function(d){return height})
			.attr("dx", function(d){
				if(d[Xcoordinate].length  > 10){
					return 0;
				}
				return 15;
			}) //  horizontal-align: middle 居中对齐
			.attr("dy", 12) // vertical-align: middle //垂直方向无偏移
			.attr("text-anchor", "left") // text-align: right
			.text(function(d){
				return d[Xcoordinate]
			})

		
		chart.selectAll("line") //加横线 线 有关svg的标签请查看w3chool
			.data(y.ticks(4))   //y.ticks 根据权重 把数据进行划分层次，增加可读性。可以自己改变ticks的值察看效果来理解
			.enter().append("line")
			.attr("x1", 0)
			.attr("x2", "100%")
			.attr("y1", function(d){return y(d)})
			.attr("y2", function(d){return y(d)})
			.style("stroke", "#ccc");

		
		chart.selectAll(".rule")
			.data(y.ticks(4))
			.enter().append("text")
			.attr("class", "rule")
			.attr("y",function(d){return height-y(d)})
			.attr("dy",5)
			.attr("dx",-15)
			.attr("text-anchor", "middle")
			.text(function(d){
				return level[d-1]
			});
		
		chart.append("line")
			.attr("x1", 0)
			.attr("x2", width)
			.attr("y1",height)
			.attr("y2",height)
			.style("stroke", "#000");//添加x轴方向的线

		chart.append("line") //添加Y轴方向的线
			.attr("x1", 0)
			.attr("x2",0)
			.attr("y1",0)
			.attr("y2",height)
			.style("stroke", "#000");
	}
})