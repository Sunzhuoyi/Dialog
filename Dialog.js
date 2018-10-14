let Dialog = (function () {
    let elem, dialog, cancelBtn, confirmBtn;

    // get the node what is needed
    let getElement = function () {
        elem = document.querySelector(".dialog-wrapper");
        dialog = elem.querySelector(".dialog");
        cancelBtn = elem.querySelector(".cancel-btn");
        confirmBtn = elem.querySelector(".confirm-btn");
    };

    // show the dialog
    let show = function (options = {}) {
        // set default options or get options
        let {title = "", content = "nice to meet you, I'm a dialog", btns = ["Yes"], skin = '', confirm = null, cancel = null} = options;

        // set skin
        let skinClass = skin ? ` ${skin}` : '';

        // footer buttons
        let btnTemp = "";
        btns.forEach((item, index) => {
            if (index == 2) return;
            let btnClass = "";
            switch (index) {
                case 0:
                    btnClass = "confirm-btn";
                    break;
                case 1:
                    btnClass = "cancel-btn";
                    break;
                default:
                    break;
            };
            let temp = `<div class="btn ${btnClass}">${item}</div>`;
            btnTemp += temp;
        });

        // dialog node
        let html = `
          <div class="dialog-wrapper fadeIn">
            <div class="dialog${skinClass}">
              <div class="title">${title}</div> <div class="content">${content}</div>
              <div class="buttons">${btnTemp}</div>
            </div>
          </div> `;
        
        // insert into html
        document.body.innerHTML += html;

        // show the config element
        getElement();

        // bind event to confirm && cancel
        bindEvent(confirm, cancel)
        
    };
    
    // hide dialog
    let hide = function (index) {
        elem.remove();
    };

    //bind event
    let bindEvent = function (confirm, cancel) {

        //do confirm
        confirmBtn && confirmBtn.addEventListener("click", e => {
            hide();
            confirm && confirm();
        });

        // do cancel
        cancelBtn && cancelBtn.addEventListener("click", e => {
            hide();
            cancel && cancel();
        });
    };

    return {
        show,
        hide
    }

})();