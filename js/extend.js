//author by maiff
//from js design
//2016.4.9
function extend(subClass,supClass){
	var F=function () {};
	F.prototype=supClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;

	subClass.supClass=supClass.prototype;//降低耦合
	if(supClass.prototype.constructor==Object.prototype.constructor){
		supClass.prototype.constructor=supClass;
	}
}