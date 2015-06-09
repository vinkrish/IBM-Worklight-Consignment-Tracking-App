function toggleoi()
{
var oi = document.getElementById('oi');
var oip = document.getElementById('oip');
if(oip.style.opacity == '0')
{
	oip.style.opacity = '1';
	document.getElementById('navigation').style.display='inline';
	document.getElementById('navigation').style.opacity='1';
}
else
{
	oip.style.opacity = '0';
	document.getElementById('navigation').style.display='none';
	document.getElementById('navigation').style.opacity='0';
}
}