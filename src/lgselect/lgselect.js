import { AddrObj } from './addrObj';

const CURSOR_RANGE = 1000;
export default class lgSelect {
    constructor(opt) {
        this.filterStr = "";
        // actually here should defineProperty filteredOptions !! to watch the change.
        this.filteredOptions = [];
        this.dropOpen = false;
        this.cursor = 0;
        this.dropMenu = null;
        this.selectInput = null;
        this.selectBtn = null;
        this.selected = {};
        this.options = opt.options || [];

        console.log("ngInit...");
        this.selected.name = opt.title || "select option";        
        // filter 1000 elements to fill in dropMenu.        
        this.filterAO();
        this.bindDOM();
    }

    /** implement universe data-bind Directive.. */
    bindDOM() {
        let selectBtn = document.querySelector(".lg-select");
        let selectInput = document.querySelector("#selectInput");
        let selectContainer = document.querySelector("#container");

        let dropMenu = document.createElement("ul");
        dropMenu.className = "dropdown-menu";
        selectBtn.parentElement.appendChild(dropMenu);
        this.dropMenu = dropMenu;
        this.selectInput = selectInput;
        this.selectBtn = selectBtn;

        if (selectBtn && selectInput && selectContainer && dropMenu) {
            selectBtn.addEventListener("click", this.wrapHandler(this, this.toggleDropdown));
            selectInput.onblur = this.wrapHandler(this,this.searchAO);
            selectContainer.addEventListener("click", this.wrapHandler(this, this.hideDropdown));
            dropMenu.onclick = this.wrapHandler(this, this.selectAO);
            dropMenu.onscroll = this.wrapHandler(this, this.scrollListener);
        } else {
            console.error("bindDom error.");
        }
        this.updateDOM();
    }

    wrapHandler(ctx, func) {
        return func.bind(ctx);
    }

    /**
     * tranverse component DOM ele, and update the DOM value..
     */
    updateDOM() {
        // generate li depend on this.options... bind span innerText with *.name
        let itemsHtml = "";
        for(let i=0; i<this.filteredOptions.length;i++) {
            if (this.filteredOptions[i].name) {
                itemsHtml += "<li><span>" + this.filteredOptions[i].name + "</span></li>";
            }
        }
        this.dropMenu.innerHTML = itemsHtml;
        this.selectBtn.innerHTML = this.selected.name + "<span class=\"caret\"></span>"
    }

    getSelected () {
        return this.selected;
    };
    setOptions (options) {
        this.options = options;
        return this;
    };
    // fill dropMenu depend on the index range..
    filterAO () {
        try {
            if (this.cursor < 0 || this.cursor > this.options.length)
                return;
            // #issue to address: slice safe
            this.filteredOptions = this.options.slice(this.cursor, this.cursor + CURSOR_RANGE);
            console.log("filtering addrobjs to promote performance..");
        }
        catch (error) {
            console.error(error);
        }
    };
    // keyUp listener.
    searchAO (evt) {
        var _this = this;
        this.filterStr = this.selectInput.value;
        if (this.filterStr.length === 0) {
            this.cursor = 0;
            this.filterAO();
            this.updateDOM();
            return;
        }
        try {
            var tempAOs = [];
            for (var j = 0; j < this.options.length; j++) {
                var curAO = this.options[j];
                if (curAO.name.indexOf(this.filterStr) > -1) {
                    tempAOs.push(curAO);
                }
            }
            this.filteredOptions = tempAOs;
            this.updateDOM();
            setTimeout(() => {
                _this.openDropdown();
            }, 200);
            console.warn("search keyword is: " + this.filterStr, " search res num: " + tempAOs.length);
        }
        catch (error) {
            console.error("something happen when search AO");
        }
    };
    // selectAO by click AO list-item.
    selectAO (evt) {
        let target = evt.target ||evt.srcElement;
        if (target.tagName && target.tagName === "LI") {
            this.selected = {
                'name': target.innerText,
            };
            console.warn("selected AO: " + target.innerText);
            this.updateDOM();
            return;
        }
        else {
            console.warn("NOT selected AO.........");
        }
    };
    // to listen scroll on dropMenu, in order to filter new AO... throttle must be applied to this..
    scrollListener (evt) {
        var _this = this;
        if (this.filterStr.length == 0) {
            // cooling time 300ms for scrollListener.
            // this.throttle(this.loadMoreAO, 300);
            setTimeout(() => {
                _this.loadMoreAO();
                this.updateDOM();
            }, 300);
        }
    };
    // if function called as eventListener !! `this` means the Element which trigger evt ??
    loadMoreAO () {
        // console.warn("when handling wheel evt, `this` means " + this);
        if ((this.dropMenu.scrollHeight - this.dropMenu.scrollTop) < 211 && this.cursor < (this.options.length - CURSOR_RANGE)) {
            // scroll to next page.
            this.cursor += CURSOR_RANGE;
            this.filterAO();
            this.dropMenu.scrollTop = 1;
        }
        else if (this.dropMenu.scrollTop < 1 && this.cursor > (CURSOR_RANGE - 1)) {
            this.cursor -= CURSOR_RANGE;
            this.filterAO();
            this.dropMenu.scrollTop = this.dropMenu.scrollHeight * 0.95;
        }
        else {
            return;
        }
    };
    // all variable need stric type.
    toggleDropdown (evt) {
        var dropBtn = (evt.target || evt.srcElement);
        evt.stopPropagation();
        if (!this.dropOpen && dropBtn.parentElement) {
            // parent.. add Class .open
            this.dropOpen = true;
            setTimeout(() => {
                dropBtn.parentElement.className += " open";
                console.log("menu open...");
            }, 50);
        }
        else if (this.dropOpen) {
            // hide the dropMenu
            dropBtn.parentElement.className = "dropdown-container";
            this.dropOpen = false;
            console.log("menu hidden...`this` indicate: " + this);
        }
    };
    openDropdown () {
        if (this.dropMenu && this.dropMenu.parentElement) {
            var dropContainer = this.dropMenu.parentElement;
            dropContainer.className += " open";
            this.dropOpen = true;
        }
    };
    hideDropdown (evt) {
        // hide the dropMenu
        var dropdownContainer = document.querySelector(".dropdown-container");
        dropdownContainer.className = "dropdown-container";
        this.dropOpen = false;
    };
}
