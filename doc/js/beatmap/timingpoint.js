function TimingPoint(t){var t=t.split(",");if(t.length<2)throw"invalid data";this.time=0|t[0],this.beatLength=+t[1],this.meter=0|t[2]||4,0<=this.beatLength?TimingPoint.parent=this:(this.parent=TimingPoint.parent,t=-100/this.beatLength,this.beatLength=this.parent.beatLength/t,this.meter=this.parent.meter)}Object.defineProperties(TimingPoint.prototype,{bpm:{get:function(){return 6e4/this.beatLength}}});