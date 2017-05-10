// multicanvas.js
function MultiCanvas (options){    
    this.imagePref = options.images || "";
    this.imageType = options.imageType || "png";
    this.images = options.imageSuffix || [];
    this.canvs = [];
    // HtmlCanvasElement instances..
    this.layers = [];
    this.focusRange = options.focusRange || document.createElement("input");
    this.focusLabel = options.focusLabel || document.createElement("label");
    this._init();
}

MultiCanvas.prototype._init = function() {
    // get image Number then create canvas by this number..
    var canvContainer = document.querySelector("#canvContainer");
    for (var k in this.images) {
        var canv = document.createElement("canvas");
        this.canvs.push(canv);
        this.drawImg(this.imagePref + this.images[k] + '.' + this.imageType, canv);
        canvContainer.appendChild(canv);
        this.focusRange.max = k;
    }

    setInterval(function() {
        this.focusLabel.innerText = "Adjust Focus Range: " + this.focusRange.value;
    }, 100);
    this.listenFocus();
    console.log("multicanvas init done..");
}

function wrapListener(ctx, fn) {
    return function(arg) {
        fn.call(ctx, arg);
    }
}

MultiCanvas.prototype.listenFocus = function() {
    this.focusRange.addEventListener('change', wrapListener(this, function(arg) {
        console.log("focus changed...");
        if (this.focusRange.value < this.canvs.length) {
            this.focusLayer(parseInt(this.focusRange.value));
        }
    }));
}

MultiCanvas.prototype.focusLayer = function(layerId) {
    if (layerId !== undefined) {
        for (var i = 0; i < this.canvs.length; i++) {
            if (layerId === i) {
                this.canvs[i].style.filter = "blur(0)";
            } else {
                this.canvs[i].style.filter = "blur("+ 3 * Math.abs(layerId-i) +"px)";
            }
        }
    } else {
        for (var i = 0; i < this.canvs.length; i++) {
            this.canvs[i].style.filter = "blur(0)";
        }
    }
}

/* input imgs,  */
MultiCanvas.prototype.drawImg = function(imgPath, canvas) {
    var img = new Image();
    img.onload = function(evt) {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
    }
    img.src = imgPath;
}
