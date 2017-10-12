/**
 * Created by Administrator on 2017/10/8.
 */
$(function(){
    if(!window.MozWebSocket && !window.WebSocket){
        alert('你的浏览器不支持websocket')
    }

    socket = new WebSocket('ws://192.168.255.129:8000/websocket');
    socket.onmessage = function(event){
        $('.chat-box-window').html($('.chat-box-window').html()+'<br/>'+event.data);
         $('.chat-box-window').animate({scrollTop:$('.chat-box-window')[0].scrollHeight},500);
         //$('.chat-box-window').scrollTop($('.chat-box-window')[0].scrollHeight);
    };
    socket.onopen = function(event){
        $('.chat-box-window').html('你已进入聊天室。。。')
    };
    socket.onclose = function(event){
        $('.chat-box-window').html('聊天室已关闭。。。')
    };
    $('.btn-success').click(function(){
        if(socket.readyState == WebSocket.OPEN){
            if($('#name').val() ==''){
                alert('请输入昵称！！！')
            }else{
                socket.send($('#name').val()+':'+$('#msg').val());
                $('#msg').val('')};
    }})
    ;
    //$('#msg').on('keydown',function(e){
    //    if(e.keyCode==13){
    //        if(socket.readyState == WebSocket.OPEN){
    //            socket.send($('#name').val()+':'+$(this).val());
    //            $(this).val('');
    //
    //        }
    //    }
    //})
})
