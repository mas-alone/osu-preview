function Catch(t){Beatmap.call(this,t),this.Colors.length?this.Colors.push(this.Colors.shift()):this.Colors=Catch.DEFAULT_COLORS,this.circleRadius=this.circleDiameter/2,this.smallRadius=this.circleRadius/2,this.tinyRadius=this.smallRadius/5;for(var e=1,i=-1,h=1,s=0;s<this.HitObjects.length;s++){var a=this.HitObjects[s];a instanceof BananaShower?h=1:(a.newCombo||h)&&(i=(i+(e=1)+a.comboSkip)%this.Colors.length,h=0),a.combo=e++,a.color=this.Colors[i],(a instanceof JuiceStream||a instanceof BananaShower)&&a.buildNested()}this.CATCHER_BASE_SIZE=106.75,this.ALLOWED_CATCH_RANGE=.8,this.HYPER_DASH_TRANSITION_DURATION=180,this.calculateScale=1-.7*(this.CircleSize-5)/5,this.catchWidth=this.CATCHER_BASE_SIZE*Math.abs(this.calculateScale)*this.ALLOWED_CATCH_RANGE,this.halfCatcherWidth=this.catchWidth/2,this.halfCatcherWidth/=this.ALLOWED_CATCH_RANGE,this.BASE_DASH_SPEED=1,this.BASE_WALK_SPEED=.5,this.RNG_SEED=1337;for(var c=new LegacyRandom(this.RNG_SEED),s=0;s<this.HitObjects.length;s++){var l=this.HitObjects[s];l instanceof BananaShower?l.nested.forEach(t=>{t.x+=c.NextDouble()*Beatmap.MAX_X,c.Next(),c.Next(),c.Next()}):l instanceof JuiceStream&&l.nested.forEach(t=>{"TinyDroplet"===t.type?t.x+=Math.clamp(c.Next(-20,20),-t.x,Beatmap.MAX_X-t.x):"Droplet"===t.type&&c.Next()})}this.palpableObjects=[],this.fullCatchObjects=[];for(s=0;s<this.HitObjects.length;s++){var r,o=this.HitObjects[s];o instanceof Fruit?(r=new PalpableCatchHitObject({type:"Fruit",time:o.time,x:o.position.x,color:o.color,radius:this.circleRadius},this),this.palpableObjects.push(r),this.fullCatchObjects.push(r)):o instanceof BananaShower?o.nested.forEach(t=>{this.fullCatchObjects.push(t)}):o instanceof JuiceStream&&o.nested.forEach(t=>{this.fullCatchObjects.push(t),"TinyDroplet"!=t.type&&this.palpableObjects.push(t)}),this.palpableObjects.sort((t,e)=>t.time-e.time),this.fullCatchObjects.sort((t,e)=>t.time-e.time);let e=0,i=this.halfCatcherWidth;for(let t=0;t<this.palpableObjects.length-1;t++){var p=this.palpableObjects[t],n=this.palpableObjects[t+1],f=(p.hyperDash=!1,n.x>p.x?1:-1),C=n.time-p.time-1e3/60/4,n=Math.abs(n.x-p.x)-(e==f?i:this.halfCatcherWidth),C=C*this.BASE_DASH_SPEED-n;i=C<0?(p.hyperDash=!0,this.halfCatcherWidth):Math.clamp(C,0,this.halfCatcherWidth),e=f}}}Catch.prototype=Object.create(Beatmap.prototype,{approachTime:{get:function(){return this.ApproachRate<5?1800-120*this.ApproachRate:1200-150*(this.ApproachRate-5)}},circleDiameter:{get:function(){return 108.848-8.9646*this.CircleSize}}}),(Catch.prototype.constructor=Catch).prototype.hitObjectTypes={},Catch.ID=2,(Beatmap.modes[Catch.ID]=Catch).DEFAULT_COLORS=["rgb(0,202,0)","rgb(18,124,255)","rgb(242,24,57)","rgb(255,292,0)"],Catch.prototype.update=function(t){t.translate((Beatmap.WIDTH-Beatmap.MAX_X)/2,(Beatmap.HEIGHT-Beatmap.MAX_Y)/2)},Catch.prototype.draw=function(t,e){for(void 0===this.tmp.first&&(this.tmp.first=0,this.tmp.last=-1);this.tmp.first<this.fullCatchObjects.length;){if(t<=(i=this.fullCatchObjects[this.tmp.first]).time)break;this.tmp.first++}for(;this.tmp.last+1<this.fullCatchObjects.length&&t>=this.fullCatchObjects[this.tmp.last+1].time-1.1*this.approachTime;)this.tmp.last++;for(var i,h=this.tmp.last;h>=this.tmp.first;h--)t>(i=this.fullCatchObjects[h]).time||i.draw(t,e)};