function Beatmap(t){this.tmp={},this.StackLeniency=.7,this.Title="",this.TitleUnicode=void 0,this.Artist="",this.ArtistUnicode=void 0,this.Creator="",this.Version=void 0,this.CircleSize=5,this.OverallDifficulty=5,this.ApproachRate=void 0,this.SliderMultiplier=1.4,this.TimingPoints=[],this.Colors=[],this.HitObjects=[];for(var i,e,s=t.replace(/\r\n?/g,"\n").split("\n").reverse();void 0!==(e=s.pop());)if(!/^\/\//.test(e))if(/^\[/.test(e))i=e.slice(1,e.indexOf("]"));else switch(i){case"General":case"Metadata":case"Difficulty":var o=(r=e.split(":")).shift(),a=r.join(":");o in this&&(this[o]=parseFloat(a)==a?+a:a);break;case"TimingPoints":try{this.TimingPoints.push(new TimingPoint(e))}catch(t){}break;case"Colours":var r=e.split(":");/^Combo\d+/.test(r[0])&&this.Colors.push("rgb("+r[1]+")");break;case"HitObjects":try{this.HitObjects.push(HitObject.parse(e,this))}catch(t){}}}Object.defineProperties(Beatmap.prototype,{Version:{get:function(){return void 0===this._Version||/^$/.test(this._Version)?"Normal":this._Version},set:function(t){this._Version=t}},ApproachRate:{get:function(){return void 0===this._ApproachRate?this.OverallDifficulty:this._ApproachRate},set:function(t){this._ApproachRate=t}},hitObjectTypeMask:{get:function(){return void 0===this._hitObjectTypeMask&&(this._hitObjectTypeMask=Object.keys(this.hitObjectTypes).reduce(function(t,i){return t|i})),this._hitObjectTypeMask}}}),Beatmap.prototype.hitObjectTypes=void 0,Beatmap.prototype.update=void 0,Beatmap.prototype.draw=void 0,Beatmap.prototype.processBG=void 0,Beatmap.WIDTH=640,Beatmap.HEIGHT=480,Beatmap.MAX_X=512,Beatmap.MAX_Y=384,Beatmap.modes={},Beatmap.parse=function(t){if(!/^osu/.test(t))throw"target is not a beatmap file";var i=+(t.match(/[\r\n]Mode.*?:(.*?)[\r\n]/)||[])[1]||0;if(i in Beatmap.modes)return new Beatmap.modes[i](t);throw"we do not support this beatmap mode"},Beatmap.prototype.timingPointIndexAt=function(t){for(var i=0,e=this.TimingPoints.length-1;i<=e;){var s=(i+e)/2|0;if(t>=this.TimingPoints[s].time){if(1+s==this.TimingPoints.length||t<this.TimingPoints[1+s].time)return s;i=1+s}else e=s-1}return 0},Beatmap.prototype.timingPointAt=function(t){return this.TimingPoints[this.timingPointIndexAt(t)]},Beatmap.prototype.refresh=function(){this.tmp={}},Beatmap.prototype.toString=function(){return[(JSON.parse(localStorage.osu_tool||'{"unicode":false}').unicode?[this.ArtistUnicode||this.Artist,this.TitleUnicode||this.Title]:[this.Artist,this.Title]).join(" - ")," (",this.Creator,")"," [",this.Version||"Normal","]"].join("")};