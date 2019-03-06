
$(document).ready(function () {
  //根据url，设置高亮
  if (window.location.pathname === '/') {
    $(".nav-collapse .nav li:first-child").addClass("active");
  }
  else if (window.location.pathname === '/login') {
    $(".nav-collapse .nav li:nth-child(2)").addClass("active");
  }
  else if (window.location.pathname === '/reg') {
    $(".nav-collapse .nav li:nth-child(3)").addClass("active");
  }

  //清空输入框
  $("#clearBlog").click(function () {
    $("#textarea").val("");
  })
  var lastSubmit = null;
  var timeer = null;
  var successSubmit = null;
  //防止连续点击
  function ErrorAlert() {
    if (new Date() - lastSubmit < 3000) {
      clearTimeout(timeer);
    }
    lastSubmit = new Date();
    timeer = setTimeout(function () {
      $("#submitError").addClass("displayNONE");
    }, 3000);
  }

  //提交输入框
  $("#postBlog").click(function () {
    //防止重复发表，因此需要间隔10秒
    if (successSubmit && new Date() - successSubmit < 10000) {
      //这里是警告提示，防止连续发送消息
      $("#submitError").text("你发的太快了，喝喝茶吧！距离下次可以发送消息的时间还有：" + (new Date() - successSubmit).toFixed(0) + " 秒。");
      $("#submitError").removeClass("displayNONE");
      //防止连续点击
      ErrorAlert()
      return;
    }

    var text = $("#textarea").val();
    if (text.length === 0) {    //禁止发送空内容
      $("#submitError").text("请填写输入内容");
      $("#submitError").removeClass("displayNONE");
      //防止连续点击
      ErrorAlert()
      return;
    }
    var length = 0;
    //获取输入长度，英文字母为1，中文汉字为2
    for (var i = 0; i < text.length; i++) {
      if (text[i].match(/[^\x00-\xff]/ig) != null)
        length += 2;
      else
        length += 1;
    }
    if (length > 255) {
      $("#submitError").text("字符长度过长，限制字符长度为255个字节，你的文本长度为" + length + "个字节");
      $("#submitError").removeClass("displayNONE");
      ErrorAlert()
      return;
    }

    //先清除输入框再提交
    $("#textarea").val("");
    successSubmit = new Date();
    $.post('/post', {text: text}, function (item) {
      if (item.code == 500) {
        successSubmit = 0;
        $("#submitError").text(item.data);
        $("#submitError").removeClass("displayNONE");
        setTimeout(function () {
          $("#submitError").addClass("displayNONE");
        }, 3000);

      } else if (item.code == 200) {
        $("#submitSuccess").text(item.data);
        $("#submitSuccess").removeClass("displayNONE");
        setTimeout(function () {
          $("#submitSuccess").addClass("displayNONE");
        }, 3000);
      }
    })
  })

})
