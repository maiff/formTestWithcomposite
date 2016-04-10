//import Interface.js
//import extend.js
//import cookie.js
var Composite=new Interface('Composite',['add','remove','getChild','getAllChild']);
var FormItem=new Interface('FormItem',['save','restore']);
var CompositeForm=function(id,method,action) {//implements Composite,FormItem
	this.formComponents=[];
	this.allRight=true;
	this.element=document.createElement('form');
	this.element.id=id;
	this.element.method=method||'POST';
	this.element.action=action||'#';
};
CompositeForm.prototype.add=function(child){
	Interface.ensureImplements(child,Composite,FormItem);
	this.formComponents.push(child);
	this.element.appendChild(child.getElement());
};
CompositeForm.prototype.remove=function(child){
	for(var i=0,len=this.formComponents.length;i<len;i++){
		if(this.formComponents[i]===child){
			this.formComponents.splice(i,1);//Remove one element form the array at positon i
			break;
		}
	}
};
CompositeForm.prototype.getChild=function(i){
	return this.formComponents[i];
};
CompositeForm.prototype.getAllChild=function(i){
	return this.formComponents;
};
CompositeForm.prototype.save=function(){
	for(var i=0,len=this.formComponents.length;i<len;i++){
		this.formComponents[i].save();
	}
};
CompositeForm.prototype.consolet=function(){
	
		console.log(this.formComponents)
	
};
CompositeForm.prototype.getElement=function(){
	return this.element;
};
CompositeForm.prototype.restore=function(){
	for(var i=0,len=this.formComponents.length;i<len;i++){
		this.formComponents[i].restore();
	}
}


var Field=function(id){//implements Composite,FormItem
	this.id=id;
	this.element;
	this.childEle;
};
Field.prototype.add=function(){};
Field.prototype.remove=function(){};
Field.prototype.getChild=function(){};
Field.prototype.getAllChild=function(){};
Field.prototype.save=function(){
	setCookie(this.id,this.getValue(),1800);
};
Field.prototype.getElement=function(){
	return this.element;
};
Field.prototype.getValue=function(){
	throw new Errow('Unsupported operation on this class Field.');
};
Field.prototype.restore=function(){
	this.childEle.value=getCookie(this.id);
};

//text 表单
var InputField=function(id,lable,className,confArray,type){//implements Composite,FormItem
	Field.call(this,id);
	
	this.input=document.createElement('input');
	this.input.id=id;
	this.input.type=type||'text';
	this.childEle=this.input;
//for comfiring
	this.isRight=confArray?false:true;
	var fn=confArray?confArray[0]:function(){};
	var self=this;
	this.input.addEventListener('blur',function(){
		self.makesure.call(self,fn);
	});
	this.input.addEventListener('focus',function(){
		self.p.innerHTML=confArray?confArray[1]:'';
	});


	this.lable=document.createElement('lable');
	var lableTextNode=document.createTextNode(lable);
	this.lable.appendChild(lableTextNode);

	this.p=document.createElement('p');
	


	this.element=document.createElement('div');
	this.element.className=className||'input-field';
	this.element.appendChild(this.lable);
	this.element.appendChild(this.input);
	this.element.appendChild(this.p);

}
extend(InputField,Field);
InputField.prototype.getValue=function(){
	return this.input.value;
};
InputField.prototype.makesure=function(fn){
	fn(this);
};

//extend class
var TextareaField=function(id,lable,className){//implements Composite,FoemItem
	Field.call(this,id);

	this.textarea=document .createElement('textarea');
	this.textarea.id=id;
	this.childEle=this.textarea;

	this.lable=document.createElement('lable');
	var lableTextNode=document.createTextNode(lable);
	this.lable.appendChild(lableTextNode);

	this.element=document.createElement('div');
	this.element.className=className||'textarea-field';
	this.element.appendChild(this.lable);
	this.element.appendChild(this.textarea);
};
extend(TextareaField,Field);
TextareaField.prototype.getValue=function(){
	return this.textarea.value;
};


var SelectField=function(id,lable,className){
	Field.call(this,id);

	this.select=document.createElement('select');
	this.select.id=id;

	this.lable=document.createElement('lable');
	var lableTextNode=document.createTextNode(lable);
	this.lable.appendChild(lableTextNode);

	this.element=document.createElement('div');
	this.element.className=className||'select-field';
	this.element.appendChild(this.lable);
	this.element.appendChild(this.select);
};
extend(SelectField,Field);
SelectField.prototype.getValue=function(){
	return this.select.options[this.select.selectedIndex].value;
};

