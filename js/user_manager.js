var pageSize; //每页显示的记录条数
var curPage = 1; //当前页
var typeData;
var subjectData;
var ifCreatePaper = false;

$(document).ready(function() {
	// $.ajax({
 //        url:"https://api.seeonce.cn/chicken/public",
 //        method:"get",
 //    }).done(function(data){
 //        if(data.code==200){
	// 		alert("操作成功");
	//         }
	//            if(data.code==400){
	//            alert("操作失败");
	//         }
	//         }).fail(function(){

	//         });	
	$.get('https://api.seeonce.cn/chicken/public/types', {}, function(data){
		typeData = data.data;
		var len = typeData.length;
		// var options = $(".Subject").find("option");
		// for(var i = 0 ; i<len;i++){
		// 	options[i].value = typeData[i].id;
		// 	options[i].innerHTML=typeData[i].name;
		// }
	})

	$.get('https://api.seeonce.cn/chicken/public/subjects', {}, function(data){
		subjectData = data.data;
		var len = subjectData.length;
		for(var i = 0 ; i<len;i++){
			$("#radioSubject").append("<option value='"+subjectData[i].id+"'>"+subjectData[i].name+"</option>");
		}

		for(var i = 0 ; i<len;i++){
			$("#checkBoxSubject").append("<option value='"+subjectData[i].id+"'>"+subjectData[i].name+"</option>");
		}
		for(var i = 0 ; i<len;i++){
			$("#trueFalseSubject").append("<option value='"+subjectData[i].id+"'>"+subjectData[i].name+"</option>");
		}
		for(var i = 0 ; i<len;i++){
			$("#essaySubject").append("<option value='"+subjectData[i].id+"'>"+subjectData[i].name+"</option>");
		}
		for(var i = 0 ; i<len;i++){
			$("#createNewPaperSubject").append("<option value='"+subjectData[i].id+"'>"+subjectData[i].name+"</option>");
		}
	})
	

    $("#personalMessage").click(function() {
    	ifCreatePaper = false;
        showPart("personalMessage");
    });

    $("#radioQuestion").click(function() {
    	ifCreatePaper = false;
        showPart("radioQuestion");
    });

	$("#checkboxQuestion").click(function() {
		ifCreatePaper = false;
        showPart("checkboxQuestion");
    });

	$("#trueFalseQuestion").click(function() {
		ifCreatePaper = false;
        showPart("trueFalseQuestion");
    });

	$("#essayQuestion").click(function() {
		ifCreatePaper = false;
        showPart("essayQuestion");
    });

    $("#myQuestion").click(function() {
    	ifCreatePaper = false;
      	showData();
    });

    $("#lastPage").click(function(){
    	lastPage();
    });

    $("#nextPage").click(function(){
    	nextPage();
    });

    $("#searchPaper").click(function(){
    	ifCreatePaper = false;
    	showPaper();
    });

    $("#createPaper").click(function(){
    	ifCreatePaper = true;
    	createPaper();
    });

    $("#createNewPaper").click(function(){
    	ifCreatePaper = true;
    	editorPaper();
    });

    $("#editorPaper").click(function(){
    	ifCreatePaper = true;
    	editorPaper();
    });

    $("#deleteQuestion").click(function(){
    	ifCreatePaper = false;
    	deleteQuestion();
    });

    $("#deletePaper").click(function(){
    	ifCreatePaper = false;
    	deletePaper();
    });

    $("#addRadio").click(function(){
    	hidePart("checkboxQuestion");
    	hidePart("trueFalseQuestion");
    	hidePart("essayQuestion");
    	addPart("radioQuestion");
    });

    $("#addCheckBox").click(function(){
    	hidePart("radioQuestion");
    	hidePart("trueFalseQuestion");
    	hidePart("essayQuestion");
    	addPart("checkboxQuestion");
    });

    $("#addTf").click(function(){
    	hidePart("radioQuestion");
    	hidePart("checkboxQuestion");
    	hidePart("essayQuestion");
    	addPart("trueFalseQuestion");
    });

    $("#addEssay").click(function(){
    	hidePart("radioQuestion");
    	hidePart("checkboxQuestion");
    	hidePart("trueFalseQuestion");
    	addPart("essayQuestion");
    });

    $("#radioSubmit").click(function(){
    	var title = $("#radioTitle").val();
    	var answer = document.getElementsByName("radioAnswers");
    	var rightAnswer = $("#radioRightAnswer").val();
    	var radioSubject = $("#radioSubject").val();

    	var rightAnswers = [false,false,false,false];
    	if(rightAnswer=="A")
    		rightAnswers[0] = true;
      	if(rightAnswer=="B")
    		rightAnswers[1] = true;
    	if(rightAnswer=="C")
    		rightAnswers[2] = true;
    	if(rightAnswer=="D")
    		rightAnswers[3] = true;  	

    	if(!ifCreatePaper){
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/questions",
            method:"post",
            data:{
				type:"4",
				subject:radioSubject,
				content:title,
				contents:[answer[0].value,answer[1].value,answer[2].value,answer[3].value],
				corrects:[rightAnswers[0],rightAnswers[1],rightAnswers[2],rightAnswers[3]]
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#radioTitle").val("");
			var answer = document.getElementsByName("radioAnswers");
			for(var i = 0 ; i<answer.length;i++){
				answer[i].value = "";
			}
			$("#radioRightAnswer").val("A");
			$("#editorPaperQuestionGrade").val("");
			hidePart("radioQuestion");
	    }
	    if(data.code==400){
	       alert("操作失败");
	       }
	   }).fail(function(){

	   });			
    	}
    	else{
    	var paperId = $("#editorPaperId").val();
    	var grade = $("#editorPaperQuestionGrade").val();
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/papers/question",
            method:"post",
            data:{
				id:paperId,
				type:"4",
				subject:radioSubject,
				content:title,
				contents:[answer[0].value,answer[1].value,answer[2].value,answer[3].value],
				corrects:[rightAnswers[0],rightAnswers[1],rightAnswers[2],rightAnswers[3]],
				grade:grade
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#radioTitle").val("");
			var answer = document.getElementsByName("radioAnswers");
			for(var i = 0 ; i<answer.length;i++){
				answer[i].value = "";
			}
			$("#radioRightAnswer").val("A");
			$("#editorPaperQuestionGrade").val("");
			hidePart("radioQuestion");
	        }
	           if(data.code==400){
	           alert("操作失败");
	        }
	        }).fail(function(){

	        });	
			}
   		 });

     $("#checkBoxSubmit").click(function(){
    	var title = $("#checkBoxTitle").val();
    	var answer = document.getElementsByName("checkBoxAnswers");
    	var rightAnswers = document.getElementsByName("checkBoxRightAnswers");
    	var checkBoxSubject = $("#checkBoxSubject").val();

    	var rightAnswersTemp = [false,false,false,false];
    	if(rightAnswers[0].value=="1")	
    		rightAnswersTemp[0]=true;
    	if(rightAnswers[1].value=="1")	
    		rightAnswersTemp[1]=true;
    	if(rightAnswers[2].value=="1")	
    		rightAnswersTemp[2]=true;
    	if(rightAnswers[3].value=="1")	
    		rightAnswersTemp[3]=true;

    	if(!ifCreatePaper){
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/questions",
            method:"post",
            data:{
				type:"5",
				subject:checkBoxSubject,
				content:title,
				contents:[answer[0].value,answer[1].value,answer[2].value,answer[3].value],
				corrects:[rightAnswersTemp[0],rightAnswersTemp[1],rightAnswersTemp[2],rightAnswersTemp[3]]
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#checkBoxTitle").val("");
			var answer = document.getElementsByName("checkBoxAnswers");
			for(var i = 0 ; i<answer.length;i++){
				answer[i].value = "";
			}
			var checkBoxRightAnswers = document.getElementsByName("checkBoxRightAnswers");
			for(var i = 0 ; i<answer.length;i++){
				checkBoxRightAnswers[i].checked = false;
			}
			$("#editorPaperQuestionGrade").val("");
			hidePart("checkboxQuestion");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });	
    }
		else{
		var paperId = $("#editorPaperId").val();
		var grade = $("#editorPaperQuestionGrade").val();
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/papers/question",
            method:"post",
            data:{
				id:paperId,
				type:"5",
				subject:checkBoxSubject,
				content:title,
				contents:[answer[0].value,answer[1].value,answer[2].value,answer[3].value],
				corrects:[rightAnswersTemp[0],rightAnswersTemp[1],rightAnswersTemp[2],rightAnswersTemp[3]],
				grade:grade
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#checkBoxTitle").val("");
			var answer = document.getElementsByName("checkBoxAnswers");
			for(var i = 0 ; i<answer.length;i++){
				answer[i].value = "";
			}
			var checkBoxRightAnswers = document.getElementsByName("checkBoxRightAnswers");
			for(var i = 0 ; i<answer.length;i++){
				checkBoxRightAnswers[i].checked = false;
			}
			$("#editorPaperQuestionGrade").val("");
			hidePart("checkboxQuestion");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });	
		}
    });


    $("#tfSubmit").click(function(){
    	var title = $("#tfTitle").val();
    	var answer = document.getElementsByName("tfChoice");
    	var trueFalseSubject = $("#trueFalseSubject").val();
    	var rightAnswers = [false,false];
    	if(answer[0].value=="1"){
    		rightAnswers[0] = true;
    	}
    	if(answer[1].value=="1"){
    		rightAnswers[1] = true;
    	}

    	if(!ifCreatePaper){
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/questions",
            method:"post",
            data:{
				type:"7",
				subject:trueFalseSubject,
				content:title,
				contents:[false,false],
				corrects:[rightAnswers[0],rightAnswers[1]]
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#tfTitle").val("");
			var answer = document.getElementsByName("tfChoice");
			answer[0].checked = true;
			answer[1].checked = false;
			$("#editorPaperQuestionGrade").val("");
			hidePart("trueFalseQuestion");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });	
    	}
		else{
		var paperId = $("#editorPaperId").val();
    	var grade = $("#editorPaperQuestionGrade").val();

		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/papers/question",
            method:"post",
            data:{
				id:paperId,
			type:"7",
			subject:trueFalseSubject,
			content:title,
			contents:[false,false],
			corrects:[rightAnswers[0],rightAnswers[1]],
			grade:grade
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#tfTitle").val("");
			var answer = document.getElementsByName("tfChoice");
			answer[0].checked = true;
			answer[1].checked = false;
			$("#editorPaperQuestionGrade").val("");
			hidePart("trueFalseQuestion");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });			
		}

		$("#tfTitle").val("");
		var answer = document.getElementsByName("tfChoice");
		answer[0].checked = true;
		answer[1].checked = false;
		$("#editorPaperQuestionGrade").val("");
		hidePart("trueFalseQuestion");
    });

    $("#essaySubmit").click(function(){
    	var title = $("#essayTitle").val();
    	var essaySubject = $("#essaySubject").val();
    	var rightAnswer = $("#essayAnswer").val();

    	if(!ifCreatePaper){
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/questions",
            method:"post",
            data:{
				type:"6",
			subject:essaySubject,
			content:title,
			contents:rightAnswer,
			corrects:rightAnswer
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#essayTitle").val("");
			$("#essayAnswer").val("");
			$("#editorPaperQuestionGrade").val("");
			hidePart("essayQuestion");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });		
		}else{
		var paperId = $("#editorPaperId").val();
    	var grade = $("#editorPaperQuestionGrade").val();
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/papers/question",
            method:"post",
            data:{
				id:paperId,
				type:"6",
				subject:essaySubject,
				content:title,
				contents:rightAnswer,
				corrects:rightAnswer,
				grade:grade
            }
        }
        ).done(function(data){
        if(data.code==200){
			alert("操作成功");
			$("#essayTitle").val("");
			$("#essayAnswer").val("");
			$("#editorPaperQuestionGrade").val("");
			hidePart("essayQuestion");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });		

		}
		
    });

    $("#createNewPaper").click(function(){
    	var title = $("#createNewPaperTitile").val(); 	
    	var createNewPaperSubject = $("#createNewPaperSubject").val();
		$.ajax({
            url:"https://api.seeonce.cn/chicken/public/papers",
            method:"post",
            data:{
            	title:title,
				subject:createNewPaperSubject
            }
        }
        ).done(function(data){
        if(data.code==200){
	        $("#createNewPaperTitile").val("");
			hidePart("createMyPaper");
        }
           if(data.code==400){
           alert("操作失败");
        }
        }).fail(function(){

        });		
    });

    $("#selectAll").click(function(){
    	var deleteArray = document.getElementsByName("selectQuestion");
    for (var i = 0; i < deleteArray.length; i++) {
    	console.log($("#selectAll").is(':checked'));
        deleteArray[i].checked = $("#selectAll").is(':checked');
    }
    });

    hideAll();
    showPart("personalMessage");
});

function hideAll() {
    $(".hideQuestion").hide();
}

function showPart(partId) {
    hideAll();
    $("." + partId).show();
}

function addPart(partId){
	$("." + partId).show();
}

function hidePart(partId){
	$("." + partId).hide();
}

function nextPage() {
    curPage++;
    showData();
}

function lastPage() {
    curPage--;
    showData();
}

function showData(){
	showPart("myQuestion");
    $.get('https://api.seeonce.cn/chicken/public/questions?page='+curPage, {}, function(data){
    pageSize = data.data.pages.perPage;
    curPage = data.data.pages.curPage;
    var lastPage = data.data.pages.lastPage;
    var qs  = data.data.questions;
    var len = qs.length;
	if (curPage == 1) {
        $("#lastPage").attr("disabled",true);
    } else {
		$("#lastPage").attr("disabled",false);
        beginIndex = (pageSize * (curPage - 1));
    }

    if (curPage < lastPage) {
        $("#nextPage").attr("disabled",false);
        if (curPage != 1)
            $("#lastPage").attr("disabled",false);
    }
    if (curPage == lastPage) {
        $("#nextPage").attr("disabled",true);
    }
	$("#tableBody").empty();
        for(var i = 0; i < len; i++){
	      $("#tableBody").append(
		      		"<tr>" +
		            "<td><input type='checkbox' name='selectQuestion' value='"+qs[i].id+"'></td>" +
		            "<td>" + qs[i].id + "</td>" +
		            "<td>" + qs[i].username + "</td>" +
		            "<td>" + qs[i].subject + "</td>" +
		            "<td>" + qs[i].type + "</td>" +
		            "<td>" + qs[i].content + "</td>" +
		            "<td>" + loadOperator(qs[i].id) + "</td>" +
		            "</tr>");
          }
          $("#nowPageAndTotalPages").html(" 当前页" + (curPage) +" 共有" + (lastPage) + "页");
		})
}

// 获取查询或修改命令
function loadOperator(id) {
    var operatorHtml = "<span onclick=checkQuestionInfo(" + id + ")>查看</span>";
    return operatorHtml;
}

function checkQuestionInfo(id){
	window.open('single-question.html?id=' + id);   
}

var paperPageSize; //每页显示的记录条数
var paperCurPage = 1; //当前页

function showPaper(){
	showPart("myPaper");
	$.get('https://api.seeonce.cn/chicken/public/papers?page='+paperCurPage, {}, function(data){
    paperPageSize = data.data.pages.perPage;
    curPage = data.data.pages.curPage;
    var lastPage = data.data.pages.lastPage;
    var paper  = data.data.papers;
    var len = paper.length;
	$("#PapertableBody").empty();
    for(var i = 0; i < len; i++){
	    $("#PapertableBody").append(
		    "<tr>" +
		    "<td><input type='checkbox' name='selectPaper' value='"+paper[i].id+"'></td>" +
		    "<td>" + paper[i].id + "</td>" +
		    "<td>" + paper[i].username + "</td>" +
		    "<td>" + paper[i].title + "</td>" +
		    "<td>" + paper[i].create_date + "</td>" +
		    "<td>" + loadPaperOperator(paper[i].id) + "</td>" +
		    "</tr>");
        }
        $("#PapernowPageAndTotalPages").html(" 当前页" + (curPage) +" 共有" + (lastPage) + "页");
	})
}

// 获取查询或修改命令
function loadPaperOperator(id) {
    var operatorHtml = "<span onclick=checkPaperInfo(" + id + ")>查看</span>";
    return operatorHtml;
}

function checkPaperInfo(id){
	window.open('single-paper.html?id=' + id);   
}

function createPaper(){
	showPart("createMyPaper");
}

function editorPaper(){
	hideAll();
	showPart("EditorPaper");
}

// 删除问题
function deleteQuestion() {
    var deleteArray = document.getElementsByName("selectQuestion");
    var flag = false;
    for (var i = deleteArray.length - 1; i >= 0; i--) {
        if (deleteArray[i].checked == true) {
            flag = true;
        }
    }

    if (flag) {
        var weatherDelete = confirm("确定要删除数据?");
        if (weatherDelete) {
            for (var i = deleteArray.length - 1; i >= 0; i--) {
                if (deleteArray[i].checked == true) {
                    var qid = deleteArray[i].value;
                    $.ajax({
                    	url:'https://api.seeonce.cn/chicken/public/questions/'+qid,
                    	method:"delete"
                    }
                    ).done(function(data){
                    	if(data.code==200){
                    		hidePart("myQuestion");
                    		showData();
                    	}
                    	if(data.code==400){
                    		alert("操作失败");
                    	}
                    }).fail(function(){

                    });
                }
            }
        }
    } else {
        alert("至少选择一项");
    }

}

function deletePaper() {
    var deleteArray = document.getElementsByName("selectPaper");
    var flag = false;
    for (var i = deleteArray.length - 1; i >= 0; i--) {
        if (deleteArray[i].checked == true) {
            flag = true;
        }
    }

    if (flag) {
        var weatherDelete = confirm("确定要删除数据?");
        if (weatherDelete) {
            for (var i = deleteArray.length - 1; i >= 0; i--) {
                if (deleteArray[i].checked == true) {
                    var pid = deleteArray[i].value;
                    $.ajax({
                    	url:'https://api.seeonce.cn/chicken/public/papers/'+pid,
                    	method:"delete"
                    }
                    ).done(function(data){
                    	if(data.code==200){
                    		hidePart("myPaper");
                    		showPaper();
                    	}
                    	if(data.code==400){
                    		alert("操作失败");
                    	}
                    }).fail(function(){

                    });
                }
            }
        }
    } else {
        alert("至少选择一项");
    }

}