var bgblob;function Preview(t){this.container=t,this.screen=document.createElement("canvas"),this.screen.width=Beatmap.WIDTH,this.screen.height=Beatmap.HEIGHT,this.ctx=this.screen.getContext("2d"),this.container.appendChild(this.screen);var a=this;this.background=new Image,this.background.setAttribute("crossOrigin","anonymous"),this.background.addEventListener("load",function(){var t=document.createElement("canvas"),t=(t.id="bgcanvas",t.width=a.screen.width,t.height=a.screen.height,t.getContext("2d")),e=this.height*(a.screen.width/a.screen.height);t.drawImage(this,(this.width-e)/2,0,e,this.height,0,0,a.screen.width,a.screen.height),t.fillStyle="rgba(0, 0, 0, .4)",t.fillRect(0,0,a.screen.width,a.screen.height),void 0!==a.beatmap.processBG&&a.beatmap.processBG(t),a.container.style.backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("+a.background.src+")"}),this.background.addEventListener("error",function(){a.container.style.backgroundImage="none"})}Preview.prototype.load=function(t,e,a,i){void 0!==this.xhr&&this.xhr.abort();var r=this;try{r.beatmap=Beatmap.parse(e),t&&(r.background.src=t),r.ctx.restore(),r.ctx.save(),r.beatmap.update(r.ctx),r.at(0),"function"==typeof a&&a.call(r)}catch(t){"function"==typeof i&&i.call(r,t)}},Preview.prototype.at=function(t){this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,Beatmap.WIDTH,Beatmap.HEIGHT),this.ctx.restore(),this.beatmap.draw(t,this.ctx)};