// var members={}
$(document).ready(function(){
    console.log("hello")
    var socket = io.connect('http://'+document.domain+':'+location.port+'/chat');
    socket.on('connect',function(){
        socket.emit('joinned',{});
    });
    socket.on('status',function(data){
        $('#chat').val($('#chat').val()+'<'+data.msg+'>\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    })
    socket.on('message',function(data){
        $('#chat').val($('#chat').val()+'<from '+data.name+' -> '+data.msg+'>\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    })
    socket.on('left',function(data){
        $('#chat').val($('#chat').val()+data.name+' left the room>\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    })
    
});
function f(){
    var socket = io.connect('http://'+document.domain+':'+location.port+'/chat');
    var data = $('#text').val();
    if(data=="" || data==null){
        alert("Empty message");
        return;
    }
    socket.emit('text',{'msg':data});
    $('#text').val("");
}
function leave_room(){
    var socket = io.connect('http://'+document.domain+':'+location.port+'/chat');

    socket.emit('left',{},function(){
        socket.disconnect();
        window.location.href = 'http://'+document.domain+':'+location.port;
    });
}
/*var msg = io.connect('http://127.0.0.1:5000/messages');
function f(){
    console.log($('#myMessage').val());
    var data = $('#myMessage').val();
    msg.emit('fun',data);
} */
