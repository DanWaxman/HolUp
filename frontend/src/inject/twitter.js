// console.log('called');
// console.log($);
// (function () {
//   console.log('called 123');
//   const addEventListener_ = addEventListener;
//   function addEventListener(...arg) {
//     console.log('hello world 4321');
//     var _this = this;
//     addEventListener_.apply(_this, ...arg)
//   }
//   Window.prototype.addEventListener = addEventListener;
//   HTMLDocument.prototype.addEventListener = addEventListener;
//   Element.prototype.addEventListener = addEventListener;
//   Element.prototype.abcdef = 123;
//   console.log(Element.prototype.addEventListener);
// })();

function inject(injection_script) {
  injection_script = '(' + injection_script.toString().split('\n').filter(l => !l.trim().substring(0, 2).includes('//')).join('\n') + ')();';
  location.href = "javascript: " + injection_script;
}

// inject(function() {

// })

inject(function () {
  window.old_addEventListener = addEventListener;
  window.old_removeEventListener = removeEventListener;
});


inject(function () {
  window.click_listeners = {};
  // const old_addEventListener = addEventListener;
  console.log(window.old_addEventListener);

  window.addEventListener("message", async function (event) {
    // We only accept messages from ourselves
    if (event.source != window)
      return;

    if (event.data && event.data.type === 'tartan') {
      console.log('client:');
      console.log(event.data);
      let { result, text } = event.data;
      if (result.hate_detected) {
        addPopup(text, result);
      } else {
        window.send_tweet();
      }

    }
  });
  function evalText(text) {
    var data = { type: "FROM_PAGE", text };
    window.postMessage(data, "*");
  }

  async function addPopup(text, result) {

    // let r = await axios.put('http://34.74.255.76:5000/hate_detection', {text});
    // console.log(r);

    const w = 600;
    const h = 650;
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 + dualScreenLeft;
    const top = (height - h) / 2 + dualScreenTop;
    console.log(width);
    console.log(height);
    console.log(left);
    console.log(top);
    console.log("width=" + ((w) | 0) + ", height=" + ((h) | 0) + ", top=" + ((top) | 0) + ", left=" + (left | 0));
    const newWindow = window.open('', 'checker', "width=" + ((w) | 0) + ",height=" + ((h) | 0) + ",top=" + ((top) | 0) + ",left=" + (left | 0));
    newWindow.document.body.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    
    <body>
      <style>
        body {
          background-color: rgba(21, 32, 43, 1.00);
          color: rgba(255, 255, 255, 1.00);
        }
    
        .popup-container {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(115, 125, 134, 0.4);
          color: rgba(255, 255, 255, 1.00);
          /* font-size: 15px; */
          font: 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    
        .popup-root {
          background-color: rgba(21, 32, 43, 1.00);
          border-radius: 16px;
          max-width: 95vw;
          /* min-width: 600px; */
          width: 100%;
          max-height: 95vh;
          min-height: 400px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: hidden;
        }
    
        .bird {
          height: 2rem;
          fill: rgb(255, 255, 255);
        }
    
        .top {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 53px;
        }
    
    
        .bottom {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          height: 100%;
          margin-left: 32px;
          margin-right: 32px;
          margin-bottom: 32px;
        }
    
        .disabled {
          animation: ease-in;
          opacity: 0.65;
          cursor: not-allowed;
        }
    
        .button {
          animation: timer 10s;
          animation-timing-function: linear;
          cursor: pointer;
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.00);
          border-color: rgba(0, 0, 0, 0.00);
          color: rgb(255, 255, 255);
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
          position: relative;
          z-index: 0;
          overflow: hidden;
        }
    
        .button::before {
          animation: timer 10s;
          animation-timing-function: linear;
          content: '';
          cursor: pointer;
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          background-color: hsl(203, 89.1%, 36.3%);
          border-color:  hsl(203, 89.1%, 36.3%);
          color: rgb(255, 255, 255);
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
          z-index: -2;
    
        }
    
        .button::after {
          animation: color_timer 10s;
          animation-timing-function: linear;
          cursor: pointer;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          /* position: absolute; */
          
          background-color: rgba(29, 161, 242, 1.00);
          border-color: rgba(29, 161, 242, 1.00);
          transition: all .3s;
          cursor: pointer;
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
    
          z-index: -1;
        }
    
        .button span {
          position: relative;
          transition: 0.5s;
        }
    
        .button span:after {
          animation: timer 10s;
          cursor: pointer;
          content: '>>';
          position: absolute;
          opacity: 0;
          top: 0;
          right: -20px;
          transition: 0.5s;
        }
    
        .button.enabled:hover span {
          padding-right: 25px;
        }
    
        .button.enabled:hover span:after {
          opacity: 1;
          right: 0;
        }
    
        .button_2 {
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          background-color: rgba(0, 0, 0, 0);
          border-color: rgba(29, 161, 242, 1.00);
          color: rgba(29, 161, 242, 1.00);
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
        }
    
        .button_2 span {
          cursor: pointer;
          position: relative;
          transition: 0.5s;
        }
    
        .button_2 span:after {
          content: '<<';
          position: absolute;
          opacity: 0;
          top: 0;
          left: -20px;
          transition: 0.5s;
        }
    
        .button_2:hover span {
          padding-left: 25px;
        }
    
        .button_2:hover span:after {
          opacity: 1;
          left: 0;
        }
    
        .input-text {
          color: rgba(255, 255, 255, 1.00);
          /* font-size: 15px; */
          font: 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin-top: 30px;
          margin-bottom: 30px;
        }
    
        @keyframes timer {
          from {
            cursor: not-allowed;
          }
    
          95% {
            cursor: not-allowed;
          }
    
          to {
            cursor: pointer;
          }
        }
    
        @keyframes color_timer {
          from {
            width: 0;
            cursor: not-allowed;
          }
          to {
            width: 100%;
            cursor: not-allowed;
          }
        }

        /* Tooltip container */
.tooltip {
  /* position: relative; */
  display: inline;
  border-bottom: 1px solid white; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 100vw;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  bottom: 0px;
  left: 0px;
  right: 0px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
    
      </style>
      <div class="popup-container">
        <div class="popup-root">
          <div class="top">
            <svg class="bird" viewBox=" 0 0 24 24" aria-label="Twitter"
              class="r-jwli3a r-4qtqp9 r-yyyyoo r-16y2uox r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
              <g>
                <path
                  d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                </path>
              </g>
            </svg>
          </div>
    
          <div class="bottom">
            <!-- <div class="timer"></div>
            <h1>Summary of what the user sent</h1>
            <h1>NAh bro</h1> -->
            <h1>Are you sure you want to send this?</h1>
            <p class="input-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dui eu augue pharetra
            <space class="tooltip">Hover
              <span class="tooltiptext">Tooltip text</span>
            </space>
              condimentum eget sed diam. Sed augue diam, ullamcorper non purus vel, consequat venenatis sapien.
              
            </p>
            <button class="button"><span>Send </span></button>
            <button class="button_2"><span>Back </span></button>
          </div>
        </div>

      </div>
    </body>
    
    </html>`;
    // const newWindow = window.open('https://google.com', 'checker', "width=100,height=100");
    console.log(newWindow);
    if (window.focus) newWindow.focus();

    newWindow.document.body.onload = function () {
      console.log('hello');
      setTimeout(() => {
        console.log('hello');
        newWindow.document.getElementsByClassName('button')[0].classList.add('enabled');
        newWindow.enabled = true;
      }, 10 * 1000);
    };

    output = text;
    for (let each of Object.keys(result.keywords)) {
      let idx = 0;
      while (output.toLowerCase().indexOf(each.toLowerCase(), idx) >= 0) {
        let loc = output.toLowerCase().indexOf(each.toLowerCase(), idx);
        tmp = output.substring(0, loc) + `
        <span class="tooltip">
              ${output.substring(loc, loc.length)}
              ${result.keywords[each].definition.trim().length > 0 ? '<span class="tooltiptext">'+result.keywords[each].definition.trim()+'</span>' : ''}
        </span>`;
        idx = tmp.length;
        tmp += output.substring(loc + each.length);
        output = tmp;
      }
    }
    newWindow.document.getElementsByClassName('input-text')[0].innerHTML = output;
    console.log(newWindow.document.getElementsByClassName('button'));
    newWindow.document.getElementsByClassName('button')[0].onclick = function (e) {
      if (newWindow.enabled) {
        console.log(window);
        // console.log(window.opener);
        // console.log(window.opener.send_tweet);
        window.send_tweet();
        newWindow.close();
      }

    };

    newWindow.document.getElementsByClassName('button_2')[0].onclick = function () {
      console.log(window);

      newWindow.close();
    };


  }
  function addEventListener(...args) {
    // console.log("hello 123");

    let this_ = this;

    // console.log(args[0]);
    // console.log(this);
    if (args.length >= 2 && args[0] === 'click' && args[1].name === 'bound Xt') {
      console.log('click!!!!!!!!!!!!!!!!!!!');
      console.log(this);
      console.log(args[1].name);
      console.log(args);
      const new_func = async function (...func_args) {
        console.log('called!!!');
        console.log(this);
        const self_ = this;
        const target = func_args[0].target;
        // console.log(func_args);


        const reply_el = document.getElementsByClassName('css-18t94o4 css-1dbjc4n r-1q3imqu r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-15ysp7h r-gafmid r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr')[0];
        if (reply_el && reply_el.contains(target)) {
          window.send_tweet = function () {
            args[1].apply(self_, func_args);
          };
          await evalText(document.getElementsByClassName('public-DraftStyleDefault-block public-DraftStyleDefault-ltr')[0].children[0].children[0].innerText);
          return;
        }

        const el = document.getElementsByClassName('css-18t94o4 css-1dbjc4n r-1q3imqu r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-19u6a5r r-ero68b r-1gg2371 r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr')[0];
        // console.log(el);
        // console.log(el.contains(target));
        if (el && el.contains(target)) {
          console.log('hello1234567');
          window.send_tweet = function () {
            args[1].apply(self_, func_args);
          };
          // alert('this button is clicked');
          // showPopup();
          // window.send_tweet = false;
          // window.send_tweet_interval = setInterval(() => {
          //   if (document.querySelectorAll('.popup-container').length === 0) {
          //     if (window.send_tweet) args[1].bind(self_, ...func_args)();
          //     clearInterval(window.send_tweet_interval);
          //   }
          // }, 10);

          // alert('hi');
          evalText(document.getElementsByClassName('public-DraftStyleDefault-block public-DraftStyleDefault-ltr')[0].children[0].children[0].innerText);
          return;
        }
        args[1].apply(self_, func_args);
      };
      window.click_listeners[args[1]] = new_func;
      old_addEventListener.apply(this_, [args[0], new_func, args[2]]);
    } else {
      old_addEventListener.apply(this_, args);
    }


    // if (args && args.length > 0 && args[0] === 'click') {
    //   console.log(_this);
    // }

  };
  Window.prototype.addEventListener = addEventListener;
  HTMLDocument.prototype.addEventListener = addEventListener;
  Element.prototype.addEventListener = addEventListener;


  // function removeEventListener(...args) {
  //   // console.log("hello 123");

  //   let this_ = this;

  //   // console.log(args[0]);
  //   // console.log(this);
  //   if (args[0] === 'click') {
  //     console.log('click event removed');
  //     if (window.click_listeners[args[1]]) {
  //       old_removeEventListener.apply(this_, [args[0], window.click_listeners[args[1]], args[2]]);
  //       delete window.click_listeners[args[1]]
  //     }

  //   } else {
  //     old_removeEventListener.apply(this_, args);
  //   }
  // };
  // Window.prototype.removeEventListener = removeEventListener;
  // HTMLDocument.prototype.removeEventListener = removeEventListener;
  // Element.prototype.removeEventListener = removeEventListener;


});

window.addEventListener("message", async function (event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received message: " + event.data.text);
    console.log(axios);
    let r = await axios.put('https://alanc.tk/hate_detection', { text: event.data.text });
    console.log(r);
    window.postMessage({
      type: 'tartan',
      result: r.data,
      text: event.data.text
    }, "*");
  }
});