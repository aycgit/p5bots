define(function (require) {
    var socket = io.connect('http://localhost:8000');
    var utils =  {

      boardInit: function(port, type) {
        // Board should always immediately fire
        socket.emit('board object', {
          board: type,
          port: port
        });
      },

      pinInit: function(num, direction){
        return function emitPin(){
          socket.emit('pin object', {
            pin: num,
            direction: direction
          });
        }
      },

      socket: socket,

      socketGen: function(kind, direction, pin) {
        return function action(arg) {
          var emission = function() {
            socket.emit('action', {
              action: kind + direction.charAt(0).toUpperCase() + direction.substring(1),
              pin: pin,
              arg: arg
            });
          };

          if (_board.ready) {
            emission();
          } else {
            eventQ.push(emission);
          }
        }
      }

  };

    return utils;
})