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

inject(function () {
  window.old_addEventListener = addEventListener;
  window.old_removeEventListener = removeEventListener;
});


inject(function () {
  window.click_listeners = {};
  // const old_addEventListener = addEventListener;
  console.log(window.old_addEventListener);

  function addPopup(text) {
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
          background-color: #030303;
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
          background-color: #030303;
          color: rgba(255, 255, 255, 1.00);
          /* font-size: 15px; */
          font: 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    
        .popup-root {
          background-color: #1A1A1B;
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
          
          background-color: #ff8717;
          border-color:  #ff8717;
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
          
          
          background-color: #ff4500;
          border-color: #ff4500;
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
          background-color: #d7dadc;
          border-color: #d7dadc;
          color: rgb(26, 26, 27);
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
          white-space: pre-wrap;
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
    
      </style>
      <div class="popup-container">
        <div class="popup-root">
          <div class="top">
          <svg class="bird" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="_1O4jTk-dZ-VIxsCuYB6OR8"><g><circle fill="#FF4500" cx="10" cy="10" r="10"></circle><path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>
            
          </div>
    
          <div class="bottom">
            <!-- <div class="timer"></div>
            <h1>Summary of what the user sent</h1>
            <h1>NAh bro</h1> -->
            <h1>Are you sure you want to send this?</h1>
            <p class="input-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dui eu augue pharetra
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

    newWindow.document.getElementsByClassName('input-text')[0].innerText = text;
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
    if (args[0] === 'click') {
      console.log(args[1].name);
      console.log(args[1]);
    }

    if (args.length >= 2 && args[0] === 'click' && args[1].name === 'bound Ln') {
      console.log('click!!!!!!!!!!!!!!!!!!!');
      console.log(this);
      console.log(args[1].name);
      console.log(args);
      const new_func = function (...func_args) {
        console.log('called!!!');
        console.log(this);
        const self_ = this;
        const target = func_args[0].target;
        // console.log(func_args);


        const container_el = document.querySelectorAll('.popup-container')[0];
        console.log(container_el);
        if (container_el && container_el.contains(target)) {
          console.log('got here');
          return;
        }

        const reply_els = document.getElementsByClassName('_22S4OsoDdOqiM-hPTeOURa _2Ke4JTtee3SBjPy2emSZ3G _3t7aUZU2b2KWwDQkfT2eHl _10BQ7pjWbeYP63SAPNS8Ts _3uJP0daPEH2plzVEYyTdaH ');
        for (let reply_el of reply_els) {
          if (reply_el && reply_el.contains(target)) {
            window.send_tweet = function () {
              args[1].apply(self_, func_args);
            };
            addPopup(reply_el.parentElement.parentElement.parentElement.getElementsByClassName('notranslate public-DraftEditor-content')[0].children[0].children[0].innerText);
            return;
          }
        }

        const el = document.getElementsByClassName('_18Bo5Wuo3tMV-RDB8-kh8Z _3t7aUZU2b2KWwDQkfT2eHl _10BQ7pjWbeYP63SAPNS8Ts HNozj_dKjQZ59ZsfEegz8 ')[0];
        // console.log(el);
        // console.log(el.contains(target));
        if (el && el.contains(target)) {
          console.log('hello1234567');
          window.send_tweet = function () {
            args[1].apply(self_, func_args);
          };

          addPopup(document.getElementsByClassName('notranslate public-DraftEditor-content')[0].children[0].children[0].innerText);
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