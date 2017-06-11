function Custom(){

  this.getExercise = function(data, hasOption = true, isBan = true, isPaper = false, showAnswer = true){
    var panel = $('<div class="exercise">').attr('id', data.id);
    var title = data.content;
    if(data.grade != 0)
      title += '(' + data.grade + '分)';
    panel.append($('<pre>').text(title));
    panel.append('<span class="label label-primary tag">' + data.subject + '</span>');
    panel.append('<span class="label label-primary tag">' + data.type + '</span>');
    if(hasOption){
      if(data.type == '单选题'){
        panel.append(
          this.getOption({options:data.options, isBan:isBan, showAnswer : showAnswer})
        );
      }else if(data.type == '多选题'){
        panel.append(
          this.getOption({
            options:data.options,
            type   :'checkbox',
            isBan  :isBan,
            showAnswer : showAnswer
          })
        );
      }else if(data.type == '判断题'){
        panel.append(
          this.getOption({
            options:data.options,
            isJudge:true,
            isBan  :isBan,
            showAnswer : showAnswer
          })
        );
      }else if(data.type == '简答题'){
        panel.append(this.getContext(data.options));
      }
    }
    return panel;
  }

  this.getOption = function(dataNew){
    data = $.extend( {
      options : {},       //数据
      isBan   : true,     //是否禁止操作
      isJudge : false,    //是否是判断题
      index   : 0,        //选项递增类型
      type    : 'radio',   //input类型
      showAnswer : true
    }, dataNew);
    var panel = $("<div class='row'>");
    panel.addClass('radio');

    var isBan = data.isBan;
    var options = data.options;
    var content = data.content;
    var optionPanel;
    for(var i = 0, len = options.length; i < len; i++){
        var optionPane    = $('<div>');
        var colLabel      = $('<label class="content">');
        var colPanelLeft  = $('<div>').addClass('col-sm-1 col-md-1 col-xs-1');
        var colPanelRight = $('<div>').addClass('col-sm-11 col-md-11 col-xs-11');
        var input         = $('<input >').attr({
          type : data.type,
          name : 'corrects[]',
          id   : options[i].id,
        });

        if(data.showAnswer && options[i].correct){
          input.attr('checked', true);
        }
        if(isBan){
          input.attr('disabled', true);
        }
        colPanelLeft.append(data.index == 0 ? String.fromCharCode(i + 65) : '');
        colPanelRight.append(colLabel.append(input));
        var sym = data.isJudge ? (options[i].correct ? '√' : '×') : options[i].content;
        colLabel.html(colLabel.html() + sym);
        optionPane.append(colPanelLeft, colPanelRight);
        panel.append(optionPane);
    }

    return panel;
  };

  //生成一个简答题预览
  this.getContext = function(data){
    var panel = $("<div>");
    panel.append('<p>' + data[0].content + '</p>');

    return panel;
  };


  //获取查询字符串参数
  this.getQueryParams = function(_url){
      var url   = _url;
      var start = url.indexOf('?');
      var obj = {};

      if(start === -1)
        return obj;

      var preg  = /((\w+)=(\w+))/ig;
      var queryString = url.substring(start + 1);
      while(r = preg.exec(queryString)){
        obj[r[2]] = r[3];
      }
      return obj;
  };
}

//倒计时函数
function TimeCount(){
  this.count = 3600;
  this.machine = null;

  this.countDown = function(flag){
    var hour   = parseInt(this.count / 3600);
    var minute = parseInt((this.count - hour * 3600) / 60);
    var second = parseInt((this.count - hour * 3600 - minute * 60));
    $(flag).text("剩下时间 " + hour + ":" + minute + ":" + second);
    if(this.count-- <= 0)
      this.stop();
  };

  this.stop = function(){
    clearInterval(this.machine);
  };

  this.start = function(flag){
    var that = this;
    this.machine = setInterval(function(){
      return that.countDown(flag);
    }, 1000);
  }
}
