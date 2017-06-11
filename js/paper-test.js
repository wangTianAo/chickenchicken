
$(function(){

  //检查是否所有题都做了
  function checkOptions(){
    var exec = $(".exercise");
    for(var i = 0; i < exec.length; ++i){
      if($(exec[i]).find('input:checked').length == 0)
        return false;
    }
    return true;
  }
  //按钮提交事件
  function submitEvent(time){
    if(time.count <= 0){
      alert("Time out");
      return false;
    }
    if(!checkOptions()){
      alert("请填写完所有的选项");
      return false;
    }
    var exec = $(".exercise");

    /*
    |生成json
    |{"pid" : ?, "options" : [{"id" : ?, "answers" : []}]};
    */
    var obj = {'pid' : params.id};
    obj.questions = [];
    for(var i = 0; i < exec.length; ++i){
      var options = $(exec[i]).find('input:checked');
      obj.questions[i] = {id : exec[i].id};
      obj.questions[i].answers = [];
      for(var j = 0; j < options.length; j++){
        obj.questions[i].answers[j] = options[j].id;
      }
    }

    $.post('http://localhost/paper/public/papers/result',{
      options : obj
    }).done(function(data){
      var rs = data.data;
      var grades = 0;
      rs.forEach(function(value, index, array){
        grades += value.grade;
        if(value.correct){
          $("#" + value.id).css('border' , '1px solid green');
        }else{
          $("#" + value.id).css('border' , '1px solid red');
        }
      });
      $("#grades").text('考试得分: ' + grades);
      $("#submit").remove();
      $('input').attr('disabled', 'disabled');
      time.stop();
    });
  }


  var custom = new Custom();
  var params = custom.getQueryParams(window.location.href);
  $.get('http://localhost/paper/public/papers/' + params.id)
   .done(function(data){
     var ps = data.data;
     if(data.code == 200){


       //生成界面
       $("#main").append($('<h1 class="center">').text(ps.title));
       $("#main").append($('<p  class="center">').text("创建时间:" + ps.create_date));
       $('#main').append($('<p  class="center" style="color:blue;" id="timecount">'));
       $('#main').append($('<h3 style="color:red">').attr('id', 'grades'));
       var qs = ps.questions.questions;
       var sum = 0;
       qs.forEach(function(value, index, array){
         if(value.type == '简答题'){
           window.location.href = 'error.html?error=1';
         }
         sum += value.grade;
         $('#main').append("<p><b>第" + (index + 1) + "题:</b></p>");
         $('#main').append(custom.getExercise(value, true, false, true, false));
       });
       $('#grades').before($('<h3 class="center">').text("卷面总分:" + sum));

       var time = new TimeCount();
       time.start('#timecount');

       var bt = $('<button id="submit" class="btn btn-primary btn-block">')
              .text('提交').click(function(){submitEvent(time);});

       $('#main').append(bt);
     }else{
       window.location.href="error.html?error=0";
     }
   }).fail(function(){
       window.location.href="error.html?error=0";
   });

});
