function PalpableCatchHitObject(data, beatmap)
{
    this.beatmap = beatmap;
    this.type = data.type;
    this.time = data.time;
    this.x = data.x;
    this.color = data.color;
    this.radius = data.radius;
    this.hyperDash = false;
}
PalpableCatchHitObject.prototype.draw = function(time, ctx)
{
    var dt = this.time - time;
    if (dt >= 0) {
        if (this.type === "Banana") this.drawBanana({x: this.x, y: (1 - dt / this.beatmap.approachTime) * Beatmap.HEIGHT}, ctx);
        else {
            if (this.hyperDash) this.drawDashCircle({x: this.x, y: (1 - dt / this.beatmap.approachTime) * Beatmap.HEIGHT}, ctx);
            this.drawCircle({x: this.x, y: (1 - dt / this.beatmap.approachTime) * Beatmap.HEIGHT}, ctx);
        }
    }
};
PalpableCatchHitObject.prototype.drawCircle = function(position, ctx)
{
    ctx.save();
    ctx.beginPath();
    ctx.arc(position.x, position.y, this.radius, -Math.PI, Math.PI);
    ctx.shadowBlur = 0;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
};
PalpableCatchHitObject.prototype.drawBanana = function(position, ctx)
{
    ctx.save();
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.arc(position.x, position.y, this.radius * 0.9, -Math.PI, Math.PI);
    ctx.lineWidth = this.radius * 0.2;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.restore();
};
PalpableCatchHitObject.prototype.drawDashCircle = function(position, ctx)
{
    ctx.save();
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.arc(position.x, position.y, this.radius * 1.3, -Math.PI, Math.PI);
    ctx.lineWidth = this.radius * 0.2;
    ctx.strokeStyle = 'rgb(255,0,0)';
    ctx.stroke();
    ctx.restore();
};