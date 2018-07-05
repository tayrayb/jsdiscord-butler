# jsdiscord-butler
Discord Bot written in Javascript

Giphy.trending({
          limit: 4
      },function(err, res ) {

          if(err){
              console.err()
          }

          res.data.forEach(ele => {
                message.channel.send(ele.url)
          });